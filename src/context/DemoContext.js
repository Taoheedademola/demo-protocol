"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { BrowserProvider } from "ethers";
import {
  deposit,
  withdraw,
  claimRewards as claimRewardAPI,
  getRewards,
} from "../services/api";
import axios from "axios";

export const DemoContext = createContext();
export const useDemo = () => useContext(DemoContext);

export const DemoProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [tokenData, setTokenData] = useState([]);
  const [rewards, setRewards] = useState("0");
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask");
      const ethProvider = new BrowserProvider(window.ethereum);
      await ethProvider.send("eth_requestAccounts", []);
      const signer = await ethProvider.getSigner();
      const address = await signer.getAddress();
      setProvider(ethProvider);
      setSigner(signer);
      setUserAddress(address);
    } catch (err) {
      console.error("Wallet connection error:", err);
      alert("Failed to connect wallet.");
    }
  };

  const disconnectWallet = () => {
    setUserAddress(null);
    setProvider(null);
    setSigner(null);
    setTokenData([]);
    setRewards("0");
  };

  const loadPortfolio = useCallback(async () => {
    if (!userAddress) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/portfolio/${userAddress}`
      );

      const supplied = Array.isArray(data.supplied) ? data.supplied : [];
      const borrowed = Array.isArray(data.borrowed) ? data.borrowed : [];

      const combined = [...supplied, ...borrowed];
      const map = {};

      combined.forEach((item) => {
        const key = item.symbol;
        if (!map[key]) {
          map[key] = {
            symbol: item.symbol,
            supplied: 0,
            borrowed: 0,
            apy: item.apy || "3.5%",
            apr: item.apr || "2.0%",
          };
        }

        const amount = parseFloat(item.amount || 0);
        if (item.supplied) map[key].supplied += amount;
        if (item.borrowed) map[key].borrowed += amount;
      });

      setTokenData(Object.values(map));
      const rewardsRes = await getRewards(userAddress);
      setRewards(rewardsRes.data?.rewards || "0");
    } catch (err) {
      console.error("Failed to load portfolio:", err);
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  const supply = async (symbol, amount) => {
    if (!userAddress) return alert("Connect wallet first.");
    try {
      await deposit({ amount }); // backend signs tx
      await loadPortfolio();
    } catch (err) {
      console.error("Supply failed:", err);
      alert("Supply transaction failed.");
    }
  };

  const withdrawToken = async (symbol, amount) => {
    if (!userAddress) return alert("Connect wallet first.");
    try {
      await withdraw({ amount });
      await loadPortfolio();
    } catch (err) {
      console.error("Withdraw failed:", err);
      alert("Withdraw transaction failed.");
    }
  };

  const borrow = async (symbol, amount) => {
    if (!userAddress) return alert("Connect wallet first.");
    try {
      const token = tokenData.find((t) => t.symbol === symbol);
      const supplied = token?.supplied || 0;
      const borrowed = token?.borrowed || 0;
      const maxBorrow = (supplied * 100) / 150;
      if (parseFloat(amount) + borrowed > maxBorrow) {
        alert("Borrow exceeds allowed collateral ratio (150%)");
        return;
      }
      await axios.post("http://localhost:5000/api/loan/borrow", {
        userAddress,
        tokenSymbol: symbol,
        amount,
      });
      await loadPortfolio();
    } catch (err) {
      console.error("Borrow failed:", err);
      alert("Borrow transaction failed.");
    }
  };

  const repay = async (symbol, amount) => {
    if (!userAddress) return alert("Connect wallet first.");
    try {
      await axios.post("http://localhost:5000/api/loan/repay", {
        userAddress,
        tokenSymbol: symbol,
        amount,
      });
      await loadPortfolio();
    } catch (err) {
      console.error("Repay failed:", err);
      alert("Repay transaction failed.");
    }
  };

  const claimRewards = async () => {
    if (!userAddress) return alert("Connect wallet first.");
    try {
      await claimRewardAPI({ userAddress });
      await loadPortfolio();
    } catch (err) {
      console.error("Claim failed:", err);
      alert("Claim transaction failed.");
    }
  };

  const getSuppliedAmount = () =>
    tokenData.reduce((total, token) => total + (token.supplied || 0), 0);

  const getBorrowedAmount = () =>
    tokenData.reduce((total, token) => total + (token.borrowed || 0), 0);

  useEffect(() => {
    if (userAddress) loadPortfolio();
  }, [userAddress, loadPortfolio]);

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
        getSuppliedAmount,
        getBorrowedAmount,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};
