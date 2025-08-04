import { ethers } from "ethers";
import abi from "./abi.json"; // ABI of your main lending protocol contract

const CONTRACT_ADDRESS = "0xYourDeployedContractAddress";

export const getContract = () => {
  const { ethereum } = window;
  if (!ethereum) throw new Error("MetaMask not detected");

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
};
