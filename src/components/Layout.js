import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      backgroundColor: "#0f172a",
    },
    sidebarMobileOverlay: {
      position: "absolute",
      zIndex: 1000,
      height: "100vh",
      backgroundColor: "#111827",
      top: 0,
      left: 0,
      width: "220px",
      display: isSidebarOpen ? "block" : "none",
    },
    main: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      color: "#fff",
      width: "100%",
    },
    content: {
      flexGrow: 1,
      padding: "1.5rem",
      overflowY: "auto",
    },
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div style={styles.container}>
      {isMobile ? (
        <div style={styles.sidebarMobileOverlay}>
          <Sidebar closeSidebar={toggleSidebar} />
        </div>
      ) : (
        <Sidebar />
      )}

      <div style={styles.main}>
        <Header toggleSidebar={toggleSidebar} />
        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
