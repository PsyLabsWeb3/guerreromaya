// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MzcalToken is ERC1155, Ownable, ReentrancyGuard {
    // Constants simbolizing token IDs
    uint256 public constant MZCAL = 1;
    uint256 public constant PRESALE_TOKEN = 2;
    
    // Initial supply of tokens to mint to the contract
    uint256 public constant MZCAL_INITIAL_SUPPLY = 1000000;
    uint256 public constant PRESALE_INITIAL_SUPPLY = 100000;

    // Sales configuration
    // uint256 public presaleEndTime = 1738387200; // February 1st, 2025
    uint256 public mzcalTokenPrice = 0.001 ether;
    uint256 public presaleTokenPrice = 0.00056 ether;
    bool public mzcalTokenLaunched = false;

    // Whitelist of wallets allowed to access presale
    mapping(address => bool) public admins;
    mapping(address => bool) public presaleWhitelist;

    // Events
    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);
    event PresalePurchase(address indexed buyer, uint256 amount, uint256 cost);
    event MZCALConvert(address indexed buyer, uint256 amount);
    event MZCALPurchase(address indexed buyer, uint256 amount, uint256 cost);

    modifier onlyAdmin() {
        require(admins[msg.sender], "Only an admin can execute this");
        _;
    }

    constructor(string memory uri) ERC1155(uri) Ownable(msg.sender) {
        admins[msg.sender] = true;
        _mint(address(this), MZCAL, MZCAL_INITIAL_SUPPLY, "");
        _mint(address(this), PRESALE_TOKEN, PRESALE_INITIAL_SUPPLY, "");
    }

    function addAdmin(address _admin) external onlyAdmin {
        require(!admins[_admin], "Address is already an admin");
        admins[_admin] = true;
        emit AdminAdded(_admin);
    }

    function removeAdmin(address _admin) external onlyAdmin {
        require(admins[_admin], "Address is not an admin");
        admins[_admin] = false;
        emit AdminRemoved(_admin);
    }

    function isAdmin(address _account) external view returns (bool) {
        return admins[_account];
    }

    function mint(address to, uint256 id, uint256 amount) external onlyAdmin {
        _mint(to, id, amount, "");
    }

    function burn(address from, uint256 id, uint256 amount) external {
        require(from == msg.sender, "You can only burn your own tokens");
        _burn(from, id, amount);
    }

    function burnFromContract(uint256 id, uint256 amount) external onlyAdmin {
        _burn(address(this), id, amount);
    }

    // Launch the MZCAL token
    function launchMZCALToken() external onlyAdmin {
        mzcalTokenLaunched = true;
    }

    // Set the MZCAL token price (in wei)
    function setMzcalTokenPrice(uint256 newPriceInWei) external onlyAdmin {
        mzcalTokenPrice = newPriceInWei;
    }

    // Set the Presale token price (in wei)
    function setPresaleTokenPrice(uint256 newPriceInWei) external onlyAdmin {
        presaleTokenPrice = newPriceInWei;
    }

    // Add a wallet to the presale whitelist
    function addToPresaleWhitelist(address account) external onlyAdmin {
        presaleWhitelist[account] = true;
    }

    // Add multiple wallets to the presale whitelist
    function bulkAddToPresaleWhitelist(address[] calldata accounts) external onlyAdmin {
        require(accounts.length <= 100, "Too many addresses in one call");
        for (uint256 i = 0; i < accounts.length; i++) {
            presaleWhitelist[accounts[i]] = true;
        }
    }

    // Remove a wallet from the presale whitelist
    function removeFromPresaleWhitelist(address account) external onlyAdmin {
        presaleWhitelist[account] = false;
    }

    // Remove multiple wallets from the presale whitelist
    function bulkRemoveFromPresaleWhitelist(address[] calldata accounts) external onlyAdmin {
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

        uint256 cost = SafeMath.mul(amount, presaleTokenPrice);
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
   function buyMZCAL(uint256 amount) external payable nonReentrant {
        require(mzcalTokenLaunched, "MZCAL token not launched yet");

        uint256 cost = mzcalTokenPrice * amount;
        require(msg.value >= cost, "Insufficient ETH sent");

        uint256 contractBalance = balanceOf(address(this), MZCAL);
        require(contractBalance >= amount, "Not enough MZCAL available");

        _safeTransferFrom(address(this), msg.sender, MZCAL, amount, "");

        // Refund any excess ETH
        if (msg.value > cost) {
            (bool success, ) = payable(msg.sender).call{value: msg.value - cost}("");
            require(success, "Refund failed");
        }

        emit MZCALPurchase(msg.sender, amount, cost);
    }

    // Spend MZCAL to buy assets from seasonal contracts
    function spendMZCAL(address from, uint256 amount) external {
        require(balanceOf(from, MZCAL) >= amount, "Insufficient MZCAL balance");
        safeTransferFrom(from, address(this), MZCAL, amount, "");
    }

    // Withdraw ETH balance to the owner's address
    function withdraw(address payable a70, address payable a30) external onlyAdmin nonReentrant {
        uint256 bal = address(this).balance;
        require(bal > 0, "No funds to withdraw");

        uint256 s70 = (bal * 70) / 100;
        (bool success1, ) = a70.call{value: s70}("");
        require(success1, "Transfer to a70 failed");

        (bool success2, ) = a30.call{value: bal - s70}("");
        require(success2, "Transfer to a30 failed");
    }

    // Handle ETH Donations
    receive() external payable {}
}