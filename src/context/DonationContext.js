import React, { createContext, useContext, useState, useCallback } from 'react';

const DonationContext = createContext();

export function DonationProvider({ children }) {
  const [totalDonations, setTotalDonations] = useState(0);

  const updateTotalDonations = useCallback((newTotal) => {
    console.log('DonationContext: Updating total to', newTotal); // Debug log
    setTotalDonations(newTotal);
  }, []);

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
    throw new Error('useDonations must be used within a DonationProvider');
  }
  return context;
} 