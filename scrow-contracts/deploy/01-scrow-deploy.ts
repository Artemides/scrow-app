import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployScrow = async (hre: HardhatRuntimeEnvironment) => {
    const {
        deployments: { deploy, log },
        getNamedAccounts,
    } = hre;
    const GOOD_SERVICE_DEPOSIT = ethers.parseEther("0.1");
    const { deployer, beneficiary, arbiter } = await getNamedAccounts();
    const args: any[] = [beneficiary, arbiter];
    log("Deploying Scow contract");
    try {
        await deploy("Scrow", {
            from: deployer,
            log: true,
            args,
            value: GOOD_SERVICE_DEPOSIT.toString(),
        });
        log("Scrow Contract deployed");
    } catch (error) {
        console.error(error);
    }
};

export default deployScrow;
deployScrow.tags = ["deploy", "scrow"];
