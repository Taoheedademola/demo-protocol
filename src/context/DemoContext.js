import React, { createContext, useState } from "react";

export const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
  const [balance, setBalance] = useState(1000);
  const [supplied, setSupplied] = useState(0);
  const [borrowed, setBorrowed] = useState(0);
  const [staked, setStaked] = useState(0);

  const supply = (amount) => {
    const amt = parseFloat(amount);
    if (amt > 0 && amt <= balance) {
      setBalance((prev) => prev - amt);
      setSupplied((prev) => prev + amt);
    }
  };

  const withdraw = (amount) => {
    const amt = parseFloat(amount);
    if (amt > 0 && amt <= supplied) {
      setSupplied((prev) => prev - amt);
      setBalance((prev) => prev + amt);
    }
  };

  const stake = (amount) => {
    const amt = parseFloat(amount);
    if (amt > 0 && amt <= balance) {
      setBalance((prev) => prev - amt);
      setStaked((prev) => prev + amt);
    }
  };

  const unstake = (amount) => {
    const amt = parseFloat(amount);
    if (amt > 0 && amt <= staked) {
      setStaked((prev) => prev - amt);
      setBalance((prev) => prev + amt);
    }
  };

  return (
    <DemoContext.Provider
      value={{
        balance,
        supplied,
        borrowed,
        staked,
        supply,
        withdraw,
        stake,
        unstake,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};
