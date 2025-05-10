// import React, { createContext, useState } from "react";

// export const DemoContext = createContext();

// export const DemoProvider = ({ children }) => {
//   const [balance, setBalance] = useState(1000);
//   const [supplied, setSupplied] = useState(0);
//   const [borrowed, setBorrowed] = useState(0);
//   const [staked, setStaked] = useState(0);

//   const supply = (amount) => {
//     const amt = parseFloat(amount);
//     if (amt > 0 && amt <= balance) {
//       setBalance((prev) => prev - amt);
//       setSupplied((prev) => prev + amt);
//     }
//   };

//   const withdraw = (amount) => {
//     const amt = parseFloat(amount);
//     if (amt > 0 && amt <= supplied) {
//       setSupplied((prev) => prev - amt);
//       setBalance((prev) => prev + amt);
//     }
//   };

//   const stake = (amount) => {
//     const amt = parseFloat(amount);
//     if (amt > 0 && amt <= balance) {
//       setBalance((prev) => prev - amt);
//       setStaked((prev) => prev + amt);
//     }
//   };

//   const unstake = (amount) => {
//     const amt = parseFloat(amount);
//     if (amt > 0 && amt <= staked) {
//       setStaked((prev) => prev - amt);
//       setBalance((prev) => prev + amt);
//     }
//   };

//   return (
//     <DemoContext.Provider
//       value={{
//         balance,
//         supplied,
//         borrowed,
//         staked,
//         supply,
//         withdraw,
//         stake,
//         unstake,
//       }}
//     >
//       {children}
//     </DemoContext.Provider>
//   );
// };

import React, { createContext, useState } from "react";

export const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
  const [balance, setBalance] = useState(1000);
  const [suppliedTokens, setSuppliedTokens] = useState([]);
  const [borrowedTokens, setBorrowedTokens] = useState([]);

  const supply = (symbol, amount) => {
    setSuppliedTokens((prev) => {
      const existing = prev.find((token) => token.symbol === symbol);
      if (existing) {
        return prev.map((token) =>
          token.symbol === symbol
            ? { ...token, amount: token.amount + amount }
            : token
        );
      } else {
        return [...prev, { symbol, amount }];
      }
    });
    setBalance((prev) => prev - amount);
  };

  const borrow = (symbol, amount) => {
    setBorrowedTokens((prev) => {
      const existing = prev.find((token) => token.symbol === symbol);
      if (existing) {
        return prev.map((token) =>
          token.symbol === symbol
            ? { ...token, amount: token.amount + amount }
            : token
        );
      } else {
        return [...prev, { symbol, amount }];
      }
    });
    setBalance((prev) => prev + amount);
  };

  const withdraw = (symbol, amount) => {
    setSuppliedTokens((prev) =>
      prev
        .map((token) =>
          token.symbol === symbol
            ? { ...token, amount: token.amount - amount }
            : token
        )
        .filter((token) => token.amount > 0)
    );
    setBalance((prev) => prev + amount);
  };

  const repay = (symbol, amount) => {
    setBorrowedTokens((prev) =>
      prev
        .map((token) =>
          token.symbol === symbol
            ? { ...token, amount: token.amount - amount }
            : token
        )
        .filter((token) => token.amount > 0)
    );
    setBalance((prev) => prev - amount);
  };

  return (
    <DemoContext.Provider
      value={{
        balance,
        suppliedTokens,
        borrowedTokens,
        supply,
        borrow,
        withdraw,
        repay,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};
