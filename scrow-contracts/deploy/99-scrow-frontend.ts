const ADDRESS_PATH = "../scrow-client/constants/addresses.json";
const ABI_PATH = "../scrow-client/constants/abi.json";
import fs from "fs";
import { ethers, network } from "hardhat";
import { Scrow } from "../typechain-types";

type ContractAddresses = {
    [key: string]: string[];
};

const resources = async () => {
    const scrow: Scrow = await ethers.getContract("Scrow");
    exportAbi(scrow);
    exportAddresses(scrow);
};

const exportAbi = (scrow: Scrow) => {
    fs.writeFileSync(ABI_PATH, scrow.interface.formatJson());
};

const exportAddresses = async (scrow: Scrow) => {
    const exists = fs.existsSync(ADDRESS_PATH);
    let contractAddresses: ContractAddresses = {};
    if (exists) {
        contractAddresses = JSON.parse(fs.readFileSync(ADDRESS_PATH, "utf-8"));
    }

    const chainId = network.config.chainId?.toString() ?? "";
    if (!chainId) return;

    const addresses = new Set(contractAddresses[chainId]);
    const scrowAddress = await scrow.getAddress();
    addresses.add(scrowAddress);
    contractAddresses[chainId] = [...addresses];

    fs.writeFileSync(ADDRESS_PATH, JSON.stringify(contractAddresses));
};

export default resources;

resources.tags = ["all", "frontent"];
