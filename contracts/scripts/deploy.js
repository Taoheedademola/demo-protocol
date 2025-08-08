require("dotenv").config();
const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy DEMO token (assumes no constructor args)
  const DEMO = await ethers.getContractFactory("DEMO");
  const demo = await DEMO.deploy();
  await demo.deployed();
  console.log("DEMO deployed to:", demo.address);

  // Deploy LendingVault (no constructor args)
  const LendingVault = await ethers.getContractFactory("LendingVault");
  const vault = await LendingVault.deploy();
  await vault.deployed();
  console.log("LendingVault deployed to:", vault.address);

  // Deploy LoanManager with vault address only
  const LoanManager = await ethers.getContractFactory("LoanManager");
  const manager = await LoanManager.deploy(vault.address);
  await manager.deployed();
  console.log("LoanManager deployed to:", manager.address);

  // Set LoanManager in the LendingVault (admin-only)
  const tx = await vault.setLoanManager(manager.address);
  await tx.wait();
  console.log("LoanManager address set in LendingVault");

  // Deploy RewardsToken with cap argument
  const Rewards = await ethers.getContractFactory("RewardsToken");
  const cap = ethers.utils.parseEther("1000000"); // 1 million tokens cap
  const rewards = await Rewards.deploy(cap);
  await rewards.deployed();
  console.log("RewardsToken deployed to:", rewards.address);

  // Save deployed addresses to file
  const addresses = {
    DEMO_CONTRACT: demo.address,
    VAULT_CONTRACT: vault.address,
    LOAN_MANAGER_CONTRACT: manager.address,
    REWARDS_CONTRACT: rewards.address,
  };

  fs.writeFileSync(
    "deployedAddresses.json",
    JSON.stringify(addresses, null, 2)
  );

  console.log("✅ Deployed addresses saved to deployedAddresses.json");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
