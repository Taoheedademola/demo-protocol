// backend/services/contractService.js
import { ethers } from "ethers";
import dotenv from "dotenv";
import DEMO_ABI from "../../contracts/artifacts/contracts/DEMO.sol/DEMO.json" with { type: "json" };
import VAULT_ABI from "../../contracts/artifacts/contracts/LendingVault.sol/LendingVault.json" with { type: "json" };
import LOAN_ABI from "../../contracts/artifacts/contracts/LoanManager.sol/LoanManager.json" with { type: "json" };
import REWARD_ABI from "../../contracts/artifacts/contracts/Reward.sol/Reward.json" with { type: "json" };

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// CONTRACT ADDRESSES FROM .env
const DEMO_ADDRESS = process.env.DEMO_CONTRACT;
const VAULT_ADDRESS = process.env.VAULT_CONTRACT;
const LOAN_MANAGER_ADDRESS = process.env.LOAN_MANAGER_CONTRACT;
const REWARDS_ADDRESS = process.env.REWARDS_CONTRACT;

// CONTRACT INSTANCES
const demoToken = new ethers.Contract(DEMO_ADDRESS, DEMO_ABI.abi, wallet);
const lendingVault = new ethers.Contract(VAULT_ADDRESS, VAULT_ABI.abi, wallet);
const loanManager = new ethers.Contract(
  LOAN_MANAGER_ADDRESS,
  LOAN_ABI.abi,
  wallet
);
const rewardSystem = new ethers.Contract(
  REWARDS_ADDRESS,
  REWARD_ABI.abi,
  wallet
);

// Export all for use in routes/controllers
export { demoToken, lendingVault, loanManager, rewardSystem, wallet, provider };
