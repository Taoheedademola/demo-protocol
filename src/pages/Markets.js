

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DemoContext } from "../context/DemoContext";

const styles = {
  container: {
    padding: "2rem",
    color: "#fff",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  table: {
    width: "100%",
    backgroundColor: "#1f1f2e",
    borderRadius: "10px",
    padding: "1rem",
    overflowX: "auto",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #444",
    fontSize: "0.85rem",
    color: "#aaa",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 0",
    borderBottom: "1px solid #333",
  },
  asset: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  icon: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#666",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
  },
  actionBtns: {
    display: "flex",
    gap: "0.5rem",
  },
  button: {
    backgroundColor: "#4f46e5",
    border: "none",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.85rem",
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
};

const Markets = () => {
  const [tokenData, setTokenData] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [modalAction, setModalAction] = useState("");
  const [amount, setAmount] = useState("");

  const { supply, withdraw, balance, supplied } = useContext(DemoContext);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: "bitcoin,ethereum,binancecoin,xrp,cardano,dogecoin,solana,litecoin,polygon,chainlink,uniswap,shiba-inu,stellar,tron,algorand,vechain,monero,cosmos,tezos,neo,ftx-token,ftm,axie-infinity,ethereum-classic,zcash,thorchain,imx,pancakeswap,elrond,bittorrent,terra,lisk,avax,eos,terra-luna,waves,theta-network,compound,near,bat,convex-finance,decet,gala,maker,yearn-finance,arweave,balancer,crypto-com-chain,curve-dao-token,1inch,synthetix,fantom",
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
      .catch((error) => {
        console.error("Error fetching token data: ", error);
      });
  }, []);

  const handleAction = (token, action) => {
    setSelectedToken(token);
    setModalAction(action);
    setAmount("");
  };

  const closeModal = () => {
    setSelectedToken(null);
    setModalAction("");
    setAmount("");
  };

  const handleSubmit = () => {
    if (modalAction === "Supply") {
      supply(amount);
    } else if (modalAction === "Withdraw") {
      withdraw(amount);
    }
    closeModal();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Markets</h2>
      <p>
        Balance: ${balance.toFixed(2)} | Supplied: ${supplied.toFixed(2)}
      </p>
      <div style={styles.table}>
        <div style={styles.tableHeader}>
          <span>Asset</span>
          <span>APY / APR</span>
          <span>Supplied</span>
          <span>Borrowed</span>
          <span>Collateral</span>
          <span>Actions</span>
        </div>

        {tokenData.map((token, index) => (
          <div style={styles.row} key={index}>
            <div style={styles.asset}>
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
                style={styles.button}
                onClick={() => handleAction(token, "Withdraw")}
              >
                Withdraw
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedToken && (
        <>
          <div style={styles.overlay} onClick={closeModal}></div>
          <div style={styles.modal}>
            <h3>
              {modalAction} {selectedToken.symbol}
            </h3>
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
