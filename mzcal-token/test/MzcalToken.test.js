const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MzcalToken", function () {
    let MzcalToken, token, owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        MzcalToken = await ethers.getContractFactory("MzcalToken");
        token = await MzcalToken.deploy("http://localhost:8080/items/{id}.json");
        await token.deployTransaction?.wait();
    });

    it("Should deploy and mint initial supply to the owner", async function () {
        const balance = await token.balanceOf(owner.address, 1);
        expect(balance).to.equal(1000);
    });

    it("Should allow the owner to mint new tokens", async function () {
        await token.mint(addr1.address, 1, 500, "0x");
        const balance = await token.balanceOf(addr1.address, 1);
        expect(balance).to.equal(500);
    });

    it("Should not allow non-owner to mint tokens", async function () {
        await expect(
            token.connect(addr1).mint(addr2.address, 1, 500, "0x")
        ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    });

    it("Should allow users to burn their own tokens", async function () {
        await token.mint(addr1.address, 1, 300, "0x");
        await token.connect(addr1).burn(addr1.address, 1, 100);
        const balance = await token.balanceOf(addr1.address, 1);
        expect(balance).to.equal(200);
    });

    it("Should not allow users to burn tokens they do not own", async function () {
        await expect(
            token.connect(addr1).burn(owner.address, 1, 100)
        ).to.be.revertedWith("You can only burn your own tokens");
    });
});