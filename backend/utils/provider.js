// backend/utils/provider.js
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

export const web3Provider = new ethers.JsonRpcProvider(
  process.env.SEPOLIA_RPC_URL
);
