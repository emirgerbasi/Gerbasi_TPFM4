import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";


const deployTokenB: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("TokenB", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const TokenB = await hre.ethers.getContract<Contract>("TokenB", deployer);
  console.log("✅ TokenB deployed");
};

export default deployTokenB;

deployTokenB.tags = ["TokenB"];