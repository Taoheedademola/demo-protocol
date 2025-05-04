import React from "react";
import WalletConnect from "../wallet/WalletConnect";

const styles = {
  header: {
    backgroundColor: "#1f1f2e",
    padding: "1rem 2rem",
    borderBottom: "1px solid #333",
    color: "#fff",
    fontSize: "1.25rem",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

const Header = () => {
  return (
    <header style={styles.header}>
      <div>Demo Protocol Dashboard</div>
      <WalletConnect />
    </header>
  );
};

export default Header;
