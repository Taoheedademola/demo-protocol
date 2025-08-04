"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  deposit,
  withdraw,
  claimRewards as claimRewardAPI,
  getRewards,
} from "@/services/api";
import axios from "axios";

const DemoContext = createContext();
export const useDemo = () => useContext(DemoContext);

export const DemoProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const [tokenData, setTokenData] = useState([]);
  const [rewards, setRewards] = useState("0");
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
    await ethProvider.send("eth_requestAccounts", []);
    const signer = ethProvider.getSigner();
    const address = await signer.getAddress();

    setProvider(ethProvider);
    setSigner(signer);
    setUserAddress(address);
  };

  const disconnectWallet = () => {
    setUserAddress(null);
    setProvider(null);
    setSigner(null);
  };

  const loadPortfolio = async () => {
    if (!userAddress) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/portfolio/${userAddress}`
      );

      const { supplied = [], borrowed = [] } = data;
      const combined = [...supplied, ...borrowed];
      const unique = {};

      combined.forEach((item) => {
        const key = item.symbol;
        if (!unique[key]) {
          unique[key] = {
            symbol: item.symbol,
            supplied: 0,
            borrowed: 0,
            apy: item.apy || "3.5%",
            apr: item.apr || "2.0%",
          };
        }
        if (item.supplied) unique[key].supplied += parseFloat(item.amount);
        if (item.borrowed) unique[key].borrowed += parseFloat(item.amount);
      });

      setTokenData(Object.values(unique));
      const rewardsRes = await getRewards(userAddress);
      setRewards(rewardsRes.data?.rewards || "0");
    } catch (error) {
      console.error("Portfolio load failed", error);
    } finally {
      setLoading(false);
    }
  };

  const supply = async (symbol, amount) => {
    if (!userAddress) return alert("Connect wallet first.");
    await deposit({ userAddress, tokenSymbol: symbol, amount });
    await loadPortfolio();
  };

  const withdrawToken = async (symbol, amount) => {
    if (!userAddress) return alert("Connect wallet first.");
    await withdraw({ userAddress, tokenSymbol: symbol, amount });
    await loadPortfolio();
  };

  const borrow = async (symbol, amount) => {
    if (!userAddress) return alert("Connect wallet first.");
    const token = tokenData.find((t) => t.symbol === symbol);
    const supplied = token?.supplied || 0;
    const borrowed = token?.borrowed || 0;
    const maxBorrow = (supplied * 100) / 150;

    if (parseFloat(amount) + borrowed > maxBorrow) {
      throw new Error("Borrow exceeds allowed collateral ratio (150%)");
    }

    await axios.post("http://localhost:5000/api/loan/borrow", {
      userAddress,
      tokenSymbol: symbol,
      amount,
    });
    await loadPortfolio();
  };

  const repay = async (symbol, amount) => {
    if (!userAddress) return alert("Connect wallet first.");
    await axios.post("http://localhost:5000/api/loan/repay", {
      userAddress,
      tokenSymbol: symbol,
      amount,
    });
    await loadPortfolio();
  };

  const claimRewards = async () => {
    if (!userAddress) return alert("Connect wallet first.");
    await claimRewardAPI({ userAddress });
    await loadPortfolio();
  };

  useEffect(() => {
    if (userAddress) {
      loadPortfolio();
    }
  }, [userAddress]);

  return (
    <DemoContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        userAddress,
        provider,
        signer,
        tokenData,
        rewards,
        loading,
        supply,
        withdraw: withdrawToken,
        borrow,
        repay,
        claimRewards,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};
