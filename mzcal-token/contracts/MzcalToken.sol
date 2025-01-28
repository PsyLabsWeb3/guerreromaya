// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MzcalToken is ERC1155, Ownable {
    // Constants simbolizing token IDs
    uint256 public constant MZCAL = 1;
    uint256 public constant PRESALE_TOKEN = 2;
    
    // Initial supply of tokens to mint to the contract
    uint256 public constant MZCAL_INITIAL_SUPPLY = 1000;
    uint256 public constant PRESALE_INITIAL_SUPPLY = 1000;

    // Sales configuration
    // uint256 public presaleEndTime = 1738387200; // February 1st, 2025
    uint256 public mzcalTokenPrice = 0.001 ether;
    uint256 public presaleTokenPrice = 0.001 ether;
    bool public mzcalTokenLaunched = false;

    // Whitelist of wallets allowed to access presale
    mapping(address => bool) public presaleWhitelist;

    // Events
    event PresalePurchase(address indexed buyer, uint256 amount, uint256 cost);
    event MZCALConvert(address indexed buyer, uint256 amount);
    event MZCALPurchase(address indexed buyer, uint256 amount, uint256 cost);

    constructor(string memory uri) ERC1155(uri) Ownable(msg.sender) {
        _mint(address(this), MZCAL, MZCAL_INITIAL_SUPPLY, "");
        _mint(address(this), PRESALE_TOKEN, PRESALE_INITIAL_SUPPLY, "");
    }

    function mint(address to, uint256 id, uint256 amount, bytes memory data) public onlyOwner {
        if(data.length == 0) {
            _mint(to, id, amount, "");
        } else {
            _mint(to, id, amount, data);
        }
    }

    function burn(address from, uint256 id, uint256 amount) public {
        require(from == msg.sender, "You can only burn your own tokens");
        _burn(from, id, amount);
    }

    // Launch the MZCAL token
    function launchMZCALToken() external onlyOwner {
        mzcalTokenLaunched = true;
    }

    // Set the MZCAL token price (in wei)
    function setMzcalTokenPrice(uint256 newPriceInWei) external onlyOwner {
        mzcalTokenPrice = newPriceInWei;
    }

    // Set the Presale token price (in wei)
    function setPresaleTokenPrice(uint256 newPriceInWei) external onlyOwner {
        presaleTokenPrice = newPriceInWei;
    }

    // Add a wallet to the presale whitelist
    function addToPresaleWhitelist(address account) external onlyOwner {
        presaleWhitelist[account] = true;
    }

    // Add multiple wallets to the presale whitelist
    function bulkAddToPresaleWhitelist(address[] calldata accounts) external onlyOwner {
        for (uint256 i = 0; i < accounts.length; i++) {
            presaleWhitelist[accounts[i]] = true;
        }
    }

    // Remove a wallet from the presale whitelist
    function removeFromPresaleWhitelist(address account) external onlyOwner {
        presaleWhitelist[account] = false;
    }

    // Remove multiple wallets from the presale whitelist
    function bulkRemoveFromPresaleWhitelist(address[] calldata accounts) external onlyOwner {
        for (uint256 i = 0; i < accounts.length; i++) {
            presaleWhitelist[accounts[i]] = false;
        }
    }

    // Check if an address is whitelisted
    function isWhitelisted(address account) external view returns (bool) {
        return presaleWhitelist[account];
    }

    // Buy presale tokens during the MZCAL presale
    function buyPresale(uint256 amount) external payable {
        require(presaleWhitelist[msg.sender], "Address is not whitelisted");
        //require(block.timestamp < presaleEndTime, "Presale has ended");

        uint256 cost = amount * presaleTokenPrice;
        require(msg.value == cost, "Incorrect ETH sent");

        uint256 contractBalance = balanceOf(address(this), PRESALE_TOKEN);
        require(contractBalance >= amount, "Not enough PRESALE_TOKEN available");

        _safeTransferFrom(address(this), msg.sender, PRESALE_TOKEN, amount, "");

        emit PresalePurchase(msg.sender, amount, cost);
    }

    // Claim MZCAL tokens using PRESALE_TOKEN
    function claimMZCALTokens() external {
        require(mzcalTokenLaunched, "MZCAL token not launched yet");

        uint256 presaleBalance = balanceOf(msg.sender, PRESALE_TOKEN);
        require(presaleBalance > 0, "No PRESALE_TOKEN to convert");

        // Burn PRESALE_TOKEN and mint MZCAL_TOKEN
        _burn(msg.sender, PRESALE_TOKEN, presaleBalance);
        _mint(msg.sender, MZCAL, presaleBalance, "");

        emit MZCALConvert(msg.sender, presaleBalance);
    }

    // Buy MZCAL tokens after launch
    function buyMZCAL(uint256 amount) external payable {
        require(mzcalTokenLaunched, "MZCAL token not launched yet");

        uint256 cost = mzcalTokenPrice * amount;
        require(msg.value >= cost, "Insufficient ETH sent");

        uint256 contractBalance = balanceOf(address(this), MZCAL);
        require(contractBalance >= amount, "Not enough MZCAL available");

        _safeTransferFrom(address(this), msg.sender, MZCAL, amount, "");

        // Refund any excess ETH
        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }

        emit MZCALPurchase(msg.sender, amount, cost);
    }

    // Spend MZCAL to buy assets from seasonal contracts
    function spendMZCAL(address from, uint256 amount) external {
        require(balanceOf(from, MZCAL) >= amount, "Insufficient MZCAL balance");
        safeTransferFrom(from, address(this), MZCAL, amount, "");
    }

    // Withdraw ETH balance to the owner's address
    function withdraw(address payable address70, address payable address30) external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        uint256 share70 = (balance * 70) / 100;
        uint256 share30 = balance - share70; // Remaining balance to avoid rounding errors

        address70.transfer(share70);
        address30.transfer(share30);
    }

    // Handle ETH Donations
    receive() external payable {}
}