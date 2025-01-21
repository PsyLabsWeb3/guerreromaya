// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MzcalToken.sol";

contract SeasonalContract is ERC1155, Ownable {
    MzcalToken public mzcalToken;

    mapping(uint256 => uint256) public tokenPrices; // Prices for each asset
    mapping(uint256 => bool) public validTokenIds; // Track existing assets

    constructor(string memory uri, address payable _mzcalToken) ERC1155(uri) Ownable(msg.sender) {
        mzcalToken = MzcalToken(_mzcalToken);
    }

    function mint(address to, uint256 id, uint256 amount) external onlyOwner {
        _mint(to, id, amount, "");
    }

    function buyAsset(uint256 id, uint256 amount) external {
        // Check if token ID is valid
        require(validTokenIds[id], "Invalid token ID");

        // Check total price and ensure price is set
        uint256 totalPrice = tokenPrices[id] * amount;
        require(totalPrice > 0, "Token price not set");

        // Deduct MZCAL from the player's account (token contract)
        mzcalToken.spendMZCAL(msg.sender, totalPrice);

        // Mint the asset to the player
        _mint(msg.sender, id, amount, "");
    }

    // Set the price of a specific asset
    function setTokenPrice(uint256 tokenId, uint256 price) external onlyOwner {
        tokenPrices[tokenId] = price;
        validTokenIds[tokenId] = true;
    }

    // Set the validity of a specific asset
    function setTokenValidity(uint256 tokenId, bool isValid) external onlyOwner {
        validTokenIds[tokenId] = isValid;
    }

    // Withdraw ETH balance to the owner's address
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        payable(owner()).transfer(balance);
    }

    // Handle ETH Donations
    receive() external payable {}
}