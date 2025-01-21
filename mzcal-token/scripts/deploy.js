async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const MzcalToken = await ethers.getContractFactory("MzcalToken");
    const token = await MzcalToken.deploy("http://localhost:8080/tokens/{id}.json");
    await token.waitForDeployment();

    const SeasonalContract = await ethers.getContractFactory("SeasonalContract");
    const season1Contract = await SeasonalContract.deploy("http://localhost:8080/season1/{id}.json", token.getAddress());
    await season1Contract.waitForDeployment();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });