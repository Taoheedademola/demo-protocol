import { ethers } from "ethers";
import abi from "./abi.json"; // ABI of your main lending protocol contract

const CONTRACT_ADDRESS = " 0x71fdC7622EbBaF7E93513eaAFF4b05DA703379a5";

export const getContract = () => {
  const { ethereum } = window;
  if (!ethereum) throw new Error("MetaMask not detected");

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
};
