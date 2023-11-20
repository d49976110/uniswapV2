const hre = require("hardhat");

async function main() {
    const [admin] = await ethers.getSigners();
    console.log("admin.address", admin.address);

    // deploy factory
    const Factory = await ethers.getContractFactory("UniswapV2Factory");
    const factory = await Factory.deploy(admin.address);
    await factory.deployed();
    console.log("factory address", factory.address);

    //deploy WETH contract
    const WETH = await ethers.getContractFactory("WETH");
    const weth = await WETH.deploy();
    await weth.deployed();
    console.log("weth address", weth.address);

    // deploy router
    const Router = await ethers.getContractFactory("UniswapV2Router01");
    const router = await Router.deploy(factory.address, weth.address);
    await router.deployed();
    console.log("router address", router.address);

    // deploy tokenA & TokenB
    const Token = await ethers.getContractFactory("CustomToken");
    const tokenA = await Token.deploy("CTA");
    await tokenA.deployed();
    console.log("tokenA address", tokenA.address);
    const tokenB = await Token.deploy("CTB");
    await tokenB.deployed();
    console.log("tokenB address", tokenB.address);

    // create pair
    let receipt = await factory.createPair(tokenA.address, tokenB.address);
    await receipt.wait();

    const pairAddress = await factory.getPair(tokenA.address, tokenB.address);
    console.log("pairAddress", pairAddress);
    const pair = await ethers.getContractAt("UniswapV2Pair", pairAddress);
    console.log("before LP balance", await pair.balanceOf(admin.address));

    // add liquidity
    receipt = await tokenA.approve(router.address, ethers.utils.parseEther("1000"));
    await receipt.wait();

    receipt = await tokenB.approve(router.address, ethers.utils.parseEther("1000"));
    await receipt.wait();

    receipt = await router.addLiquidity(
        tokenA.address,
        tokenB.address,
        ethers.utils.parseEther("1000"),
        ethers.utils.parseEther("1000"),
        ethers.utils.parseEther("1000"),
        ethers.utils.parseEther("1000"),
        admin.address,
        10000000000
    );
    await receipt.wait();
    console.log("before LP balance", await pair.balanceOf(admin.address));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
