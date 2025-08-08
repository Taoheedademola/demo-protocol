// backend/utils/getContract.js

import { ethers } from "ethers";
import dotenv from "dotenv";

import LendingVault from "../abis/LendingVault.json" with { type: "json" };
import ILendingVault from "../abis/ILendingVault.json" with { type: "json" };
import LoanManager from "../abis/LoanManager.json" with { type: "json" };
import ILoanManager from "../abis/ILoanManager.json" with { type: "json" };
import RewardsToken from "../abis/RewardsToken.json" with { type: "json" };
import DEMO from "../abis/DEMO.json" with { type: "json" };
dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contracts = {
  LendingVault: {
    address: process.env.VAULT_CONTRACT,
    abi: LendingVault.abi,
  },
  ILendingVault: {
    address: process.env.VAULT_CONTRACT,
    abi: ILendingVault.abi,
  },
  LoanManager: {
    address: process.env.LOAN_MANAGER_CONTRACT,
    abi: LoanManager.abi,
  },
  ILoanManager: {
    address: process.env.LOAN_MANAGER_CONTRACT,
    abi: ILoanManager.abi,
  },
  Reward: {
    address: process.env.REWARDS_CONTRACT,
    abi: RewardsToken.abi,
  },
  DEMO: {
    address: process.env.DEMO_CONTRACT,
    abi: DEMO.abi,
  },
};

export const getContract = (name) => {
  if (!contracts[name]) {
    throw new Error(`Contract ${name} not found in getContract.js`);
  }
  const { address, abi } = contracts[name];
  return new ethers.Contract(address, abi, wallet);
};
