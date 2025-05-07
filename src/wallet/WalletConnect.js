import React, { useEffect, useState } from "react";

const WalletConnect = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");

  // Connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setError("");
      } catch (err) {
        setError("User denied wallet connection.");
      }
    } else {
      setError("MetaMask not detected. Please install it.");
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
  };

  // Check if wallet is already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    };
    checkConnection();
  }, []);

  return (
    <div style={{ textAlign: "right", padding: "1rem" }}>
      {account ? (
        <div>
          <span style={{ color: "#58a6ff", fontWeight: "bold" }}>
            Connected: {account.substring(0, 6)}...{account.slice(-4)}
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
            Disconnect Wallet
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
      {error && (
        <p style={{ color: "red", fontSize: "0.9rem", marginTop: "0.5rem" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default WalletConnect;
