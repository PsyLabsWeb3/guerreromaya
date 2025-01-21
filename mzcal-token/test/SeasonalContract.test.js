const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SeasonalContract", function () {
    let MzcalToken, SeasonalContract, token, contract, owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        MzcalToken = await ethers.getContractFactory("MzcalToken");
        token = await MzcalToken.deploy("http://localhost:8080/tokens/{id}.json");
        await token.waitForDeployment();

        SeasonalContract = await ethers.getContractFactory("SeasonalContract");
        contract = await SeasonalContract.deploy("http://localhost:8080/season1/{id}.json", token.getAddress());
        await contract.waitForDeployment();

        contract.setTokenPrice(1, 1);
    });

    it("Should allow users to buy seasonal tokens with MZCAL", async function () {
        const assetToBuy = 1;
        const amountToBuy = 5;
        
        await token.mint(addr1.address, 1, 500, "0x");
        await contract.connect(addr1).buyAsset(assetToBuy, amountToBuy);
        
        expect(await contract.balanceOf(addr1.address, assetToBuy)).to.equal(amountToBuy);
    });

    it("Should not allow users to mint if they don't have enough MZCAL", async function () {
        const assetToBuy = 1;
        const amountToBuy = 5;

        await expect(
            contract.connect(addr2).buyAsset(assetToBuy, amountToBuy)
        ).to.be.revertedWith("Insufficient MZCAL balance");
    });
});