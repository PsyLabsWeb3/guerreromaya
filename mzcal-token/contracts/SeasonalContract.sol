// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MzcalToken.sol";

contract SeasonalContract is ERC1155, Ownable {
    MzcalToken public mzcalToken;

    mapping(uint256 => uint256) public tokenPrices; // Prices for each asset
    mapping(uint256 => bool) public validTokenIds; // Track existing assets
    mapping(address => BasketItem[]) public userTradeBaskets; // Mapping of users to their baskets
    mapping(uint256 => Trade) public trades; // Mapping of global trade offers
    uint256 public tradeCounter;

    // Item for the trade basket
    struct BasketItem {
        address contractAddress;
        uint256 tokenId;
        uint256 amount;
    }

    // Struct to represent a trade
    struct Trade {
        address user1;
        address user2;
        BasketItem[] user1Offer;
        BasketItem[] user2Offer;
        bool user1Approved;
        bool user2Approved;
        bool traded;
        bool cancelled;
    }

    // Events
    event AssetPurchase(address indexed buyer, uint256 tokenId, uint256 amount, uint256 cost);
    event TradeExecuted(address indexed user1, address indexed user2, uint256 tradeId);

    modifier onlyAdmin() {
        require(mzcalToken.isAdmin(msg.sender), "Only an admin can execute this");
        _;
    }

    constructor(string memory uri,address payable _mzcalToken) ERC1155(uri) Ownable(msg.sender) {
        mzcalToken = MzcalToken(_mzcalToken);
    }

    function mint(address to, uint256 id, uint256 amount) external onlyAdmin {
        _mint(to, id, amount, "");
    }

    function burn(address from, uint256 id, uint256 amount) external {
        require(from == msg.sender, "You can only burn your own tokens");
        _burn(from, id, amount);
    }

    function buyAsset(uint256 id, uint256 amount) external {
        // Check if token ID is valid
        require(validTokenIds[id], "Invalid token ID");

        // Check total price and ensure price is set
        uint256 totalPrice = tokenPrices[id] * amount;
        require(totalPrice > 0, "Token price not set");

        // Check contract has enough tokens of the asset
        uint256 contractBalance = balanceOf(address(this), id);
        require(contractBalance >= amount, "Not enough assets available");

        // Deduct MZCAL from the player's account (token contract)
        mzcalToken.spendMZCAL(msg.sender, totalPrice);

        // Transfer the asset to the player
        _safeTransferFrom(address(this), msg.sender, id, amount, "");

        emit AssetPurchase(msg.sender, id, amount, totalPrice);
    }

    // Set the price of a specific asset
    function setTokenPrice(uint256 tokenId, uint256 price) external onlyAdmin {
        tokenPrices[tokenId] = price;
        validTokenIds[tokenId] = true;
    }

    // Set the validity of a specific asset
    function setTokenValidity(uint256 tokenId, bool isValid) external onlyAdmin {
        validTokenIds[tokenId] = isValid;
    }

    // Withdraw ETH balance to the owner's address
    function withdraw(address payable address70, address payable address30) external onlyAdmin {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        uint256 share70 = (balance * 70) / 100;
        uint256 share30 = balance - share70; // Remaining balance to avoid rounding errors

        address70.transfer(share70);
        address30.transfer(share30);
    }

    // Trade functions

    function createTradeBasket(BasketItem[] calldata items) external {
        delete userTradeBaskets[msg.sender];

        for (uint256 i = 0; i < items.length; i++) {
            // Check if contract address is valid
            require(items[i].contractAddress == address(mzcalToken) || items[i].contractAddress == address(this), "Invalid contract address");

            if (items[i].contractAddress == address(mzcalToken)) {
                // Check if token ID is valid
                require(items[i].tokenId == mzcalToken.MZCAL(), "Invalid token ID");

                // Check user has enough tokens
                uint256 balance = mzcalToken.balanceOf(msg.sender,items[i].tokenId);
                require(balance >= items[i].amount,"Not enough assets available");
            } else {
                // Check if token ID is valid
                require(validTokenIds[items[i].tokenId], "Invalid token ID");

                // Check user has enough tokens of the asset
                uint256 balance = balanceOf(msg.sender, items[i].tokenId);
                require(balance >= items[i].amount, "Not enough assets available");
            }

            userTradeBaskets[msg.sender].push(items[i]);
        }
    }

    function clearTradeBasket() external {
        delete userTradeBaskets[msg.sender];
    }

    function proposeTrade(address _user2, BasketItem[] memory _user1Offer, BasketItem[] memory _user2Offer) external returns (uint256) {
        uint256 tradeId = tradeCounter++;

        trades[tradeId] = Trade({
            user1: msg.sender,
            user2: _user2,
            user1Offer: new BasketItem[](_user1Offer.length),
            user2Offer: new BasketItem[](_user2Offer.length),
            user1Approved: true,
            user2Approved: false,
            traded: false,
            cancelled: false
        });

        for (uint256 i = 0; i < _user1Offer.length; i++) {
            trades[tradeId].user1Offer[i] = _user1Offer[i];
        }
        
        for (uint256 j = 0; j < _user2Offer.length; j++) {
            trades[tradeId].user2Offer[j] = _user2Offer[j];
        }

        delete userTradeBaskets[msg.sender];
        return tradeId;
    }

    function changeTradeApproval(uint256 tradeId, bool approval) external {
        Trade storage trade = trades[tradeId];
        require(msg.sender == trade.user1 || msg.sender == trade.user2, "User not part of the trade");
        require(!trade.traded, "Trade already executed");
        require(!trade.cancelled, "Trade has been cancelled");

        if (msg.sender == trade.user1) {
            trade.user1Approved = approval;
        } else {
            trade.user2Approved = approval;
        }

        if(trade.user1Approved && trade.user2Approved) {
            this.executeTrade(tradeId);
        }
    }

    function cancelTrade(uint256 tradeId) external {
        Trade storage trade = trades[tradeId];
        require(msg.sender == trade.user1 || msg.sender == trade.user2, "User not part of the trade");
        require(!trade.traded, "Trade already executed");

        trade.cancelled = true;
    }

    function executeTrade(uint256 tradeId) external {
        Trade storage trade = trades[tradeId];
        BasketItem[] storage user1Offer = trade.user1Offer;
        BasketItem[] storage user2Offer = trade.user2Offer;

        // Validate the trade settings
        require(trade.user1Approved && trade.user2Approved, "Trade not approved by both users");
        require(!trade.traded, "Trade already executed");
        require(!trade.cancelled, "Trade has been cancelled");

        // ToDo: Approve contract just for this function
        require(IERC1155(trade.user1Offer[0].contractAddress).isApprovedForAll(trade.user1, address(this)), "User 1 must approve contract");
        require(IERC1155(trade.user2Offer[0].contractAddress).isApprovedForAll(trade.user2, address(this)), "User 2 must approve contract");

        // Verify both user's offers
        for (uint256 i = 0; i < user1Offer.length; i++) {
            require(user1Offer[i].contractAddress == address(mzcalToken) || user1Offer[i].contractAddress == address(this), "Invalid contract address");

            if (user1Offer[i].contractAddress == address(mzcalToken)) {
                // Check if token ID is valid
                require(user1Offer[i].tokenId == mzcalToken.MZCAL(), "Invalid token ID");

                // Check user has enough tokens
                uint256 balance = mzcalToken.balanceOf(trade.user1, user1Offer[i].tokenId);
                require(balance >= user1Offer[i].amount, "Not enough assets available");
            } else {
                // Check if token ID is valid
                require(validTokenIds[user1Offer[i].tokenId], "Invalid token ID");

                // Check user has enough tokens of the asset
                uint256 balance = balanceOf(trade.user1, user1Offer[i].tokenId);
                require(balance >= user1Offer[i].amount, "Not enough assets available");
            }
        }

        for (uint256 j = 0; j < user2Offer.length; j++) {
            require(
                user2Offer[j].contractAddress == address(mzcalToken) ||
                    user2Offer[j].contractAddress == address(this),
                "Invalid contract address"
            );

            if (user2Offer[j].contractAddress == address(mzcalToken)) {
                // Check if token ID is valid
                require(user2Offer[j].tokenId == mzcalToken.MZCAL(), "Invalid token ID");

                // Check user has enough tokens
                uint256 balance = mzcalToken.balanceOf(trade.user1, user2Offer[j].tokenId);
                require(balance >= user2Offer[j].amount, "Not enough assets available");
            } else {
                // Check if token ID is valid
                require(validTokenIds[user2Offer[j].tokenId], "Invalid token ID");

                // Check user has enough tokens of the asset
                uint256 balance = balanceOf(trade.user2, user2Offer[j].tokenId);
                require(balance >= user2Offer[j].amount, "Not enough assets available");
            }
        }

        // Execute the trade
        for (uint256 i = 0; i < user1Offer.length; i++) {
            if ( user1Offer[i].contractAddress == address(mzcalToken)) {
                mzcalToken.safeTransferFrom(trade.user1, trade.user2, user1Offer[i].tokenId, user1Offer[i].amount, "");
            } else {
                safeTransferFrom(trade.user1, trade.user2, user1Offer[i].tokenId, user1Offer[i].amount, "");
            }
        }

        for (uint256 j = 0; j < user1Offer.length; j++) {
            if ( user2Offer[j].contractAddress == address(mzcalToken)) {
                mzcalToken.safeTransferFrom(trade.user2, trade.user1, user2Offer[j].tokenId, user2Offer[j].amount, "");
            } else {
                safeTransferFrom(trade.user2, trade.user1, user2Offer[j].tokenId, user2Offer[j].amount, "");
            }
        }

        // Revoke user's approvals after completing the trade
        IERC1155(trade.user1Offer[0].contractAddress).setApprovalForAll(address(this), false);
        IERC1155(trade.user2Offer[0].contractAddress).setApprovalForAll(address(this), false);

        // Mark the trade as traded
        trade.traded = true;
        emit TradeExecuted(trade.user1, trade.user2, tradeId);
    }

    // Contract functions

    function onERC1155Received(
        address /* operator */,
        address /* from */,
        uint256 /* id */,
        uint256 /* value */,
        bytes calldata /* data */
    ) external pure returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address /* operator */,
        address /* from */,
        uint256[] calldata /* ids */,
        uint256[] calldata /* values */,
        bytes calldata /* data */
    ) external pure returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    // Handle ETH Donations
    receive() external payable {}
}
