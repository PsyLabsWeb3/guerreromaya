// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MzcalToken is ERC1155, Ownable {
    // Constants simbolizing token IDs
    uint256 public constant MZCAL = 1;
    
    // Initial supply of tokens to mint to the owner
    uint256 public constant INITIAL_SUPPLY = 1000;

    // Sales configuration
    uint256 public presaleEndTime = 1738387200; // February 1st, 2025
    uint256 public mzcalTokenPrice = 0.01 ether;

    // Whitelist of wallets allowed to access presale
    mapping(address => bool) public presaleWhitelist;

    // Events
    event PresalePurchase(address indexed buyer, uint256 amount, uint256 cost);

    constructor(string memory uri) ERC1155(uri) Ownable(msg.sender) {
        _mint(msg.sender, MZCAL, INITIAL_SUPPLY, "");
    }

    function mint(address to, uint256 id, uint256 amount, bytes memory data) public onlyOwner {
        _mint(to, id, amount, data);
    }

    function burn(address from, uint256 id, uint256 amount) public {
        require(from == msg.sender, "You can only burn your own tokens");
        _burn(from, id, amount);
    }

    // Add a wallet to the presale whitelist
    function addToPresaleWhitelist(address account) external onlyOwner {
        presaleWhitelist[account] = true;
    }

    // Remove a wallet from the presale whitelist
    function removeFromPresaleWhitelist(address account) external onlyOwner {
        presaleWhitelist[account] = false;
    }

    // Buy tokens during the MZCAL presale
    function presaleBuy(uint256 amount) external payable {
        require(presaleWhitelist[msg.sender], "You are not whitelisted");
        require(block.timestamp < presaleEndTime, "Presale has ended");

        uint256 cost = amount * mzcalTokenPrice;
        require(msg.value == cost, "Incorrect ETH sent");

        _mint(msg.sender, MZCAL, amount, "");

        emit PresalePurchase(msg.sender, amount, cost);
    }
}