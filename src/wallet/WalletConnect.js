// components/WalletConnect.js
"use client";

import React from "react";
import { useDemo } from "@/context/DemoContext";

const WalletConnect = () => {
  const { userAddress, connectWallet, disconnectWallet } = useDemo();

  return (
    <div style={{ textAlign: "right", padding: "1rem" }}>
      {userAddress ? (
        <div>
          <span style={{ color: "#58a6ff", fontWeight: "bold" }}>
            Connected: {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
          </span>
          <button
            onClick={disconnectWallet}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#f00",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginLeft: "1rem",
            }}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#238636",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
