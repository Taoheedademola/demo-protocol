import React, { useState, useEffect } from "react";
import axios from "axios";

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
};

const Markets = () => {
  const [tokenData, setTokenData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: "bitcoin,ethereum,binancecoin,xrp,cardano,dogecoin,solana,litecoin,polygon,chainlink,uniswap,shiba-inu,stellar,tron,algorand,vechain,monero,cosmos,tezos,neo,ftx-token,ftm,axie-infinity,ethereum-classic,zcash,thorchain,imx,pancakeswap,elrond,bittorrent,terra,lisk,avax,eos,terra-luna,waves,theta-network,compound,near,bat,convex-finance,decet,gala,maker,yearn-finance,arweave,balancer,crypto-com-chain,curve-dao-token,1inch,synthetix,fantom", // List of 50 tokens
        },
      })
      .then((response) => {
        const data = response.data.map((token) => ({
          symbol: token.symbol.toUpperCase(),
          name: token.name,
          apy: `${(Math.random() * (20 - 1) + 1).toFixed(2)}%`,
          apr: `${(Math.random() * (10 - 0.5) + 0.5).toFixed(2)}%`,
          supplied: `${(Math.random() * (200 - 50) + 50).toFixed(2)}M`,
          borrowed: `${(Math.random() * (50 - 5) + 5).toFixed(2)}M`,
          collateral: Math.random() > 0.5,
          icon: token.image,
        }));
        setTokenData(data);
      })
      .catch((error) => {
        console.error("Error fetching token data: ", error);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Markets</h2>
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
              <button style={styles.button}>Supply</button>
              <button style={styles.button}>Borrow</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Markets;
