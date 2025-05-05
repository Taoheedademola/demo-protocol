import React, { createContext, useState } from "react";

export const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
  const [balance, setBalance] = useState(1000); // USDC or demo token
  const [supplied, setSupplied] = useState(0);
  const [borrowed, setBorrowed] = useState(0);
  const [staked, setStaked] = useState(0);

  const supply = (amount) => {
    setBalance((prev) => prev - amount);
    setSupplied((prev) => prev + amount);
  };

  const borrow = (amount) => {
    setBorrowed((prev) => prev + amount);
  };

  const stake = (amount) => {
    setBalance((prev) => prev - amount);
    setStaked((prev) => prev + amount);
  };

  const unstake = (amount) => {
    setStaked((prev) => prev - amount);
    setBalance((prev) => prev + amount);
  };

  return (
    <DemoContext.Provider
      value={{
        balance,
        supplied,
        borrowed,
        staked,
        supply,
        borrow,
        stake,
        unstake,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};
