require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const DEMO = await ethers.getContractFactory("DEMO");
  const demo = await DEMO.deploy();
  await demo.deployed();
  console.log("DEMO deployed to:", demo.address);

  const LendingVault = await ethers.getContractFactory("LendingVault");
  const vault = await LendingVault.deploy(demo.address);
  await vault.deployed();
  console.log("LendingVault deployed to:", vault.address);

  const LoanManager = await ethers.getContractFactory("LoanManager");
  const manager = await LoanManager.deploy(demo.address, vault.address);
  await manager.deployed();
  console.log("LoanManager deployed to:", manager.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
