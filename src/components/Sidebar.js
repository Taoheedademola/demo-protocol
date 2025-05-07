import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
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
    },
    link: {
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
    title: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
    },
  };

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Markets", path: "/markets" },
    { name: "Earn", path: "/earn" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Stake", path: "/stake" },
    { name: "mintNFT", path: "/NFT" },
  ];

  return (
    <aside style={styles.container}>
      <div style={styles.title}>Demo Protocol</div>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.activeLink } : styles.link
          }
        >
          {item.name}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
