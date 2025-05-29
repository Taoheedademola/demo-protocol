import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaChartLine,
  FaCoins,
  FaHandHoldingUsd,
  FaTimes,
} from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { GiPaintBrush } from "react-icons/gi";

const Sidebar = ({ closeSidebar }) => {
  const isMobile = window.innerWidth <= 768;

  const styles = {
    container: {
      width: "220px",
      height: "100vh",
      backgroundColor: "#111827",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
      boxSizing: "border-box",
      position: isMobile ? "absolute" : "static",
      zIndex: isMobile ? 1000 : "auto",
    },
    link: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: "#9CA3AF",
      padding: "0.75rem 1rem",
      textDecoration: "none",
      borderRadius: "8px",
      marginBottom: "10px",
      fontSize: "1rem",
    },
    activeLink: {
      backgroundColor: "#1F2937",
      color: "#fff",
    },
    titleWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1.5rem",
    },
    title: {
      fontSize: "1.3rem",
      fontWeight: "bold",
    },
    closeBtn: {
      fontSize: "1.5rem",
      cursor: "pointer",
      display: isMobile ? "block" : "none",
    },
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Markets", path: "/markets", icon: <FaChartLine /> },
    { name: "Earn", path: "/earn", icon: <FaCoins /> },
    { name: "Portfolio", path: "/portfolio", icon: <MdAccountBalanceWallet /> },
    { name: "Stake", path: "/stake", icon: <FaHandHoldingUsd /> },
    { name: "mintNFT", path: "/NFT", icon: <GiPaintBrush /> },
  ];

  return (
    <aside style={styles.container}>
      <div style={styles.titleWrapper}>
        <div style={styles.title}>Demo Protocol</div>
        {isMobile && <FaTimes style={styles.closeBtn} onClick={closeSidebar} />}
      </div>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.activeLink } : styles.link
          }
          onClick={isMobile ? closeSidebar : undefined}
        >
          {item.icon}
          {item.name}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
