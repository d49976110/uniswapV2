# Uniswap V2 Project

## Question

The return address form createPool(tokenA,tokenB) and getPair(tokenA,tokenB) is different from pairFor(tokenA,tokenB)

## UniswapV2Library

### pairFor(tokenA,tokenB)

The origin initCodeHash from the uniswap v2 repo is `96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f`

But the return pair address will be different from the createPool() & getPair() return address

Need to change the initCodeHash to `e699c2c70a1e9ca16c58b40782745b5d609738b755845b6ee18a18d21352f753`

```shell
npm install
npx hardhat test
```
