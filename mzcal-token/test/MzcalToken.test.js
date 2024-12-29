const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MzcalToken", function () {
    it("Should deploy and mint initial supply to the owner", async function () {
        const [owner] = await ethers.getSigners();
        const MzcalToken = await ethers.getContractFactory("MzcalToken");

        const token = await MzcalToken.deploy("http://localhost:8080/items/{id}.json");

        await token.deployTransaction?.wait();

        const balance = await token.balanceOf(owner.address, 1);
        expect(balance).to.equal(1000);
    });
});