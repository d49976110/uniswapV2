const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseUnits } = require("ethers/lib/utils");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

let factory, pair, router, tokenA, tokenB;

async function deployContracts() {
    [owner, addr1, ...addrs] = await ethers.getSigners();
    const WETHAddress = addr1.address;
    const TokenA = await ethers.getContractFactory("CustomToken");
    tokenA = await TokenA.deploy();

    const TokenB = await ethers.getContractFactory("CustomToken");
    tokenB = await TokenB.deploy();

    const Factory = await ethers.getContractFactory("UniswapV2Factory");
    factory = await Factory.deploy(owner.address);

    const Router = await ethers.getContractFactory("UniswapV2Router01");
    router = await Router.deploy(factory.address, WETHAddress);
}

describe("Uniswap V2", function () {
    before(async function () {
        await loadFixture(deployContracts);
    });

    it("Add Liquidity", async function () {
        await factory.createPair(tokenA.address, tokenB.address);

        let initCodeHash = await factory.initCodeHash();
        console.log("initCodeHash", initCodeHash);

        let pairAddress = await factory.getPair(tokenA.address, tokenB.address);
        console.log("pairAddress", pairAddress);

        // LP token should be zero
        const pair = await ethers.getContractAt("UniswapV2Pair", pairAddress);
        expect(await pair.balanceOf(owner.address)).to.equal(0);

        // router add liquidity
        await tokenA.approve(router.address, parseUnits("1000", 18));
        await tokenB.approve(router.address, parseUnits("1000", 18));
        await router.addLiquidity(tokenA.address, tokenB.address, parseUnits("1000", 18), parseUnits("1000", 18), parseUnits("1000", 18), parseUnits("1000", 18), owner.address, 10000000000);

        // LP token should greater than zero
        expect(await pair.balanceOf(owner.address)).to.gt(0);
    });
});
