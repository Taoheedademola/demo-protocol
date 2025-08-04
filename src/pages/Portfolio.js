"use client";

import React, { useEffect, useState } from "react";
import { useDemo } from "@/context/DemoContext";

const cellStyle = {
  padding: "12px 20px",
  borderBottom: "1px solid #eee",
};

const actionStyle = {
  padding: "6px 12px",
  border: "none",
  borderRadius: "4px",
  fontSize: "14px",
  fontWeight: "bold",
  color: "#fff",
};

function TableSection({ title, rows, headers }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>{title}</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            {headers.map((header) => (
              <th key={header} style={{ ...cellStyle, textAlign: "left" }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, i) => (
                <td key={i} style={cellStyle}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Portfolio() {
  const { userAddress, tokenData, withdraw, repay } = useDemo();
  const [borrowedTotal, setBorrowedTotal] = useState(0);

  const suppliedTokens = tokenData.filter((t) => t.supplied > 0);
  const borrowedTokens = tokenData.filter((t) => t.borrowed > 0);

  useEffect(() => {
    const total = borrowedTokens.reduce((sum, t) => sum + (t.borrowed || 0), 0);
    setBorrowedTotal(total);
  }, [borrowedTokens]);

  const suppliedRows = suppliedTokens.map((token) => {
    const supplied = token.supplied || 0;
    const canWithdraw = supplied > 0 && borrowedTotal <= (supplied - 1) / 1.5;

    return [
      token.symbol,
      `${supplied.toFixed(2)} $ (${(supplied * 1).toFixed(2)})`,
      token.apy || "—",
      <button
        key={token.symbol}
        style={{
          ...actionStyle,
          backgroundColor: canWithdraw ? "#4caf50" : "#888",
          cursor: canWithdraw ? "pointer" : "not-allowed",
        }}
        onClick={() => canWithdraw && withdraw(token.symbol, 1)}
        disabled={!canWithdraw}
      >
        Withdraw
      </button>,
    ];
  });

  const borrowedRows = borrowedTokens.map((token) => {
    const borrowed = token.borrowed || 0;

    return [
      token.symbol,
      `${borrowed.toFixed(2)} $ (${(borrowed * 1).toFixed(2)})`,
      token.apy || "—",
      <button
        key={token.symbol}
        style={{
          ...actionStyle,
          backgroundColor: "#f44336",
        }}
        onClick={() => repay(token.symbol, 1)}
      >
        Repay
      </button>,
    ];
  });

  return (
    <div style={{ padding: "30px", maxWidth: "1000px", margin: "auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "30px" }}>
        Your Portfolio: {userAddress || "Please connect wallet"}
      </h1>

      <TableSection
        title="Supplied Assets"
        headers={["Asset", "Supplied", "APY", "Action"]}
        rows={suppliedRows}
      />

      <TableSection
        title="Borrowed Assets"
        headers={["Asset", "Borrowed", "APY", "Action"]}
        rows={borrowedRows}
      />
    </div>
  );
}
