import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import Earn from "./pages/Earn";
import Portfolio from "./pages/Portfolio";
import Stake from "./pages/Stake";
import NftListingPage from "./pages/NFT";
import { DemoProvider } from "./context/DemoContext";

const App = () => {
  return (
    <DemoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/earn" element={<Earn />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/stake" element={<Stake />} />
            <Route path="/NFT" element={<NftListingPage />} />
          </Route>
        </Routes>
      </Router>
    </DemoProvider>
  );
};

export default App;
