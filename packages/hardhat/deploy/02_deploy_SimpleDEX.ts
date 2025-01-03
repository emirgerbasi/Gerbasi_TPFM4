import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deploySimpleDEX: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const tokenA = await deploy("TokenA", { from: deployer, log: true });
  const tokenB = await deploy("TokenB", { from: deployer, log: true });

  await deploy("SimpleDEX", {
    from: deployer,
    args: [tokenA.address, tokenB.address],
    log: true,
    autoMine: true,
  });
  const SimpleDEX = await hre.ethers.getContract<Contract>("SimpleDEX", deployer);
  console.log("✅ SimpleDEX deployed");
};

export default deploySimpleDEX;

deploySimpleDEX.tags = ["SimpleDEX"];