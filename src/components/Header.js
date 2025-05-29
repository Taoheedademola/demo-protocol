import React from "react";
import WalletConnect from "../wallet/WalletConnect";
import { FaBars } from "react-icons/fa";

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
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  hamburger: {
    fontSize: "1.5rem",
    cursor: "pointer",
    display: "none",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
};

// Responsive toggle for hamburger
const isMobile = window.innerWidth <= 768;

const Header = ({ toggleSidebar }) => {
  return (
    <header style={styles.header}>
      <div style={styles.leftSection}>
        {isMobile && (
          <FaBars
            style={{ ...styles.hamburger, display: "block" }}
            onClick={toggleSidebar}
          />
        )}
        <div style={styles.title}>Demo Protocol Dashboard</div>
      </div>
      <WalletConnect />
    </header>
  );
};

export default Header;
