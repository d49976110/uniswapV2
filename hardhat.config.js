require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
    solidity: {
        compilers: [
            { version: "0.8.4" },
            { version: "0.6.6" },
            {
                version: "0.5.16",
            },
        ],
    },
    networks: {
        // localhost1: {
        //   url: 'http://localhost:8545',
        // },
        hardhat: {
            forking: {
                url: "https://polygon-mumbai.g.alchemy.com/v2/lN3zU-poh6JPKz1B5OqC510AE9jZI4H8",
            },
        },
        goerli: {
            url: `https://eth-goerli.g.alchemy.com/v2/sejzqBFwGQ53mU3-C2JuhOo4QaYeFi2X`,
            accounts: [PRIVATE_KEY],
        },
        polygon: {
            url: `https://polygon-mainnet.infura.io/v3/9de5021a0e804743811cba1903e0b451`,
            accounts: [PRIVATE_KEY],
        },
        mumbai: {
            url: `https://polygon-mumbai.infura.io/v3/7e8e8327b33c4286a90fa147f2bfb5a8`,
            accounts: [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY2],
        },
        mooneen: {
            url: `http://8.209.245.160:8081/`,
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: {
            mainnet: process.env.ETHEREUM_API_KEY,
            goerli: process.env.ETHEREUM_API_KEY,

            polygon: process.env.POLYGON_API_KEY,
            polygonMumbai: process.env.POLYGON_API_KEY,
        },
    },
};
