import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import Earn from "./pages/Earn";
import Portfolio from "./pages/Portfolio";
import Stake from "./pages/Stake";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/stake" element={<Stake />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
