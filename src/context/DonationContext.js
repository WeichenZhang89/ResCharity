import React, { createContext, useContext, useState } from 'react';

const DonationContext = createContext();

export function DonationProvider({ children }) {
  const [totalDonations, setTotalDonations] = useState(0);

  console.log('DonationContext - Current Total:', totalDonations); // Debug context value

  const updateTotalDonations = (newTotal) => {
    console.log('Updating total donations to:', newTotal); // Debug updates
    setTotalDonations(newTotal);
  };

  return (
    <DonationContext.Provider value={{ 
      totalDonations, 
      setTotalDonations: updateTotalDonations 
    }}>
      {children}
    </DonationContext.Provider>
  );
}

export function useDonations() {
  const context = useContext(DonationContext);
  if (!context) {
    console.error('useDonations must be used within a DonationProvider'); // Debug context usage
  }
  return context;
} 