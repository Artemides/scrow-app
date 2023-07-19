import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "dotenv/config";
import "hardhat-deploy";

const config: HardhatUserConfig = {
    solidity: "0.8.18",
    networks: {
        hardhat: { chainId: 31337 },
    },

    namedAccounts: {
        deployer: {
            default: 0,
            37337: 0,
        },
        arbiter: {
            default: 1,
            37337: 1,
        },
        beneficiary: {
            default: 2,
            37337: 2,
        },
    },
    paths: {
        artifacts: "../scrow-client/artifacts",
    },
};

export default config;
