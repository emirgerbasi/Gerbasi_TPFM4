import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";


const deployTokenA: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("TokenA", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const TokenA = await hre.ethers.getContract<Contract>("TokenA", deployer);
  console.log("✅ TokenA deployed");
};

export default deployTokenA;

deployTokenA.tags = ["TokenA"];