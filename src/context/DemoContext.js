import React, { createContext, useState } from "react";

export const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
  const [balance, setBalance] = useState(1000);
  const [staked, setStaked] = useState(0);
  const [suppliedTokens, setSuppliedTokens] = useState([]);
  const [borrowedTokens, setBorrowedTokens] = useState([]);

  const stake = (amount) => {
    setBalance((prev) => prev - amount);
    setStaked((prev) => prev + amount);
  };

  const unstake = (amount) => {
    setStaked((prev) => prev - amount);
    setBalance((prev) => prev + amount);
  };

  const supply = (symbol, amount) => {
    setBalance((prev) => prev - amount);
    setSuppliedTokens((prev) => [...prev, { symbol, amount }]);
  };

  const borrow = (symbol) => {
    setBalance((prev) => prev + 100);
    setBorrowedTokens((prev) => [...prev, { symbol, amount: 100 }]);
  };

  const repay = (symbol) => {
    setBalance((prev) => prev - 50);
    setBorrowedTokens((prev) =>
      prev.map((token) =>
        token.symbol === symbol
          ? { ...token, amount: token.amount - 50 }
          : token
      )
    );
  };

  return (
    <DemoContext.Provider
      value={{
        balance,
        staked,
        stake,
        unstake,
        supply,
        borrow,
        repay,
        suppliedTokens,
        borrowedTokens,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};
