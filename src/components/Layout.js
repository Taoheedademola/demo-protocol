import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      backgroundColor: "#0f172a",
    },
    main: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      color: "#fff",
    },
    content: {
      flexGrow: 1,
      padding: "1.5rem",
      overflowY: "auto",
    },
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.main}>
        <Header />
        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
