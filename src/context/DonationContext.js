import React, { createContext, useContext, useState } from "react";

const DonationContext = createContext();

export function DonationProvider({ children }) {
  const [totalDonations, setTotalDonations] = useState(0);
  const GOAL_AMOUNT = 300000; // 目标金额

  const remainingAmount = Math.max(0, GOAL_AMOUNT - totalDonations);

  return (
    <DonationContext.Provider
      value={{
        totalDonations,
        setTotalDonations,
        goalAmount: GOAL_AMOUNT,
        remainingAmount,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
}

export function useDonations() {
  return useContext(DonationContext);
}
