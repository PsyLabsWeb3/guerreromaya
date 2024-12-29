async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);
    const MzcalToken = await ethers.getContractFactory("MzcalToken");

    const token = await MzcalToken.deploy("http://localhost:8080/items/{id}.json");

    await token.deployTransaction?.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });