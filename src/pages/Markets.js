"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDemo } from "../context/DemoContext";

const styles = {
  container: { padding: "2rem", color: "#fff" },
  title: { fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" },
  table: {
    width: "100%",
    backgroundColor: "#1f1f2e",
    borderRadius: "10px",
    padding: "1rem",
    overflowX: "hidden",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 2fr",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #444",
    fontSize: "0.85rem",
    color: "#aaa",
    alignItems: "center",
    gap: "0.5rem",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 2fr",
    alignItems: "center",
    padding: "0.75rem 0",
    borderBottom: "1px solid #333",
    gap: "0.5rem",
    fontSize: "0.85rem",
    wordBreak: "break-word",
  },
  asset: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  icon: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#666",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  label: { fontWeight: "bold" },
  actionBtns: { display: "flex", gap: "0.5rem", flexWrap: "wrap" },
  button: {
    backgroundColor: "#4f46e5",
    border: "none",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.85rem",
    whiteSpace: "nowrap",
  },
  disabledBtn: {
    backgroundColor: "#444",
    color: "#aaa",
    cursor: "not-allowed",
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1f1f2e",
    padding: "2rem",
    borderRadius: "10px",
    zIndex: 1000,
    color: "#fff",
    minWidth: "320px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 999,
  },
  closeBtn: {
    marginTop: "1rem",
    backgroundColor: "#e11d48",
    border: "none",
    padding: "0.5rem 1rem",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    marginTop: "0.75rem",
    marginBottom: "1rem",
    borderRadius: "6px",
    border: "1px solid #555",
    backgroundColor: "#2a2a3d",
    color: "#fff",
    fontSize: "1rem",
  },
  submitBtn: {
    backgroundColor: "#16a34a",
    border: "none",
    padding: "0.5rem 1rem",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "0.5rem",
  },
  ratioBarContainer: {
    marginTop: "1rem",
    backgroundColor: "#333",
    borderRadius: "10px",
    overflow: "hidden",
  },
  ratioBar: (ratio) => ({
    width: `${Math.min(ratio * 100, 100)}%`,
    height: "10px",
    backgroundColor:
      ratio < 0.75 ? "#4caf50" : ratio < 1 ? "#facc15" : "#e11d48",
    transition: "width 0.3s",
  }),
  ratioText: {
    fontSize: "0.9rem",
    marginTop: "0.3rem",
    textAlign: "center",
    color: "#ccc",
  },
};

const Markets = () => {
  const [tokenData, setTokenData] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [modalAction, setModalAction] = useState("");
  const [amount, setAmount] = useState("");
  const [warning, setWarning] = useState("");
  const [borrowRatio, setBorrowRatio] = useState(0);

  const {
    tokenData: portfolio,
    supply,
    borrow,
    userAddress,
    getSuppliedAmount,
    getBorrowedAmount,
  } = useDemo();

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 50,
          page: 1,
          sparkline: false,
        },
      })
      .then((response) => {
        const data = response.data.map((token) => ({
          symbol: token.symbol.toUpperCase(),
          name: token.name,
          apy: `${(Math.random() * 10 + 1).toFixed(2)}%`,
          apr: `${(Math.random() * 5 + 0.5).toFixed(2)}%`,
          supplied: `${(Math.random() * 100 + 10).toFixed(2)}M`,
          borrowed: `${(Math.random() * 50 + 5).toFixed(2)}M`,
          collateral: Math.random() > 0.5,
          icon: token.image,
        }));
        setTokenData(data);
      })
      .catch((error) => console.error("Error fetching token data:", error));
  }, []);

  useEffect(() => {
    const updateRatio = async () => {
      if (!userAddress) return;
      const supplied = await getSuppliedAmount(userAddress);
      const borrowed = await getBorrowedAmount(userAddress);
      if (supplied > 0) {
        setBorrowRatio(borrowed / (supplied * 1.5));
      } else {
        setBorrowRatio(0);
      }
    };
    updateRatio();
  }, [userAddress]);

  const handleAction = (token, action) => {
    setSelectedToken(token);
    setModalAction(action);
    setAmount("");
    setWarning("");

    if (action === "Borrow" && !token.collateral) {
      setWarning(
        "⚠️ This asset is not supported as collateral. Borrowing is discouraged."
      );
    }
  };

  const closeModal = () => {
    setSelectedToken(null);
    setModalAction("");
    setAmount("");
    setWarning("");
  };

  const handleSubmit = async () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return alert("Enter a valid amount.");

    if (!userAddress) return alert("Connect your wallet first.");

    try {
      if (modalAction === "Supply") {
        await supply(selectedToken.symbol, amt);
      } else if (modalAction === "Borrow") {
        const supplied = await getSuppliedAmount(userAddress);
        const borrowed = await getBorrowedAmount(userAddress);
        const maxBorrow = supplied * 1.5;

        if (borrowed + amt > maxBorrow) {
          return alert(
            `Borrowing limit exceeded.\nYou can only borrow up to 150% of your supplied value.\nCurrent Supplied: ${supplied}, Borrowed: ${borrowed}`
          );
        }

        if (!selectedToken.collateral) {
          const confirmUnsecured = window.confirm(
            "This token lacks collateral support. Proceed anyway?"
          );
          if (!confirmUnsecured) return;
        }

        await borrow(selectedToken.symbol, amt);
      }
      closeModal();
    } catch (err) {
      console.error("Error submitting:", err);
      alert("Transaction failed.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Markets</h2>

      <div style={styles.ratioBarContainer}>
        <div style={styles.ratioBar(borrowRatio)}></div>
        <div style={styles.ratioText}>
          Borrow Ratio: {(borrowRatio * 100).toFixed(2)}%
        </div>
      </div>

      <div style={styles.table}>
        <div style={styles.tableHeader}>
          <span>Asset</span>
          <span>APY</span>
          <span>Sup</span>
          <span>Borr</span>
          <span>Collat</span>
          <span>Actions</span>
        </div>

        {tokenData.map((token, index) => {
          const isBorrowDisabled = !token.collateral;

          return (
            <div style={styles.row} key={index}>
              <div style={styles.asset} title={token.name}>
                <div style={styles.icon}>
                  <img
                    src={token.icon}
                    alt={token.name}
                    style={{ width: "20px", height: "20px" }}
                  />
                </div>
                <span style={styles.label}>{token.symbol}</span>
              </div>
              <span>
                {token.apy} / {token.apr}
              </span>
              <span>{token.supplied}</span>
              <span>{token.borrowed}</span>
              <span>{token.collateral ? "✅" : "❌"}</span>
              <div style={styles.actionBtns}>
                <button
                  style={styles.button}
                  onClick={() => handleAction(token, "Supply")}
                >
                  Supply
                </button>
                <button
                  style={{
                    ...styles.button,
                    ...(isBorrowDisabled && styles.disabledBtn),
                  }}
                  onClick={() =>
                    !isBorrowDisabled && handleAction(token, "Borrow")
                  }
                  disabled={isBorrowDisabled}
                  title={
                    isBorrowDisabled
                      ? "This asset can't be used as collateral."
                      : ""
                  }
                >
                  Borrow
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedToken && (
        <>
          <div style={styles.overlay} onClick={closeModal}></div>
          <div style={styles.modal}>
            <h3>
              {modalAction} {selectedToken.symbol}
            </h3>
            {warning && (
              <p
                style={{
                  color: "#facc15",
                  fontSize: "0.85rem",
                  marginBottom: "1rem",
                }}
              >
                {warning}
              </p>
            )}
            <input
              type="number"
              placeholder={`Enter amount to ${modalAction.toLowerCase()}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
            />
            <div>
              <button style={styles.submitBtn} onClick={handleSubmit}>
                Confirm
              </button>
              <button style={styles.closeBtn} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Markets;
