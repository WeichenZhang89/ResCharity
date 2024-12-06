import { useDonations } from "@/context/DonationContext";
import { useEffect, useState } from "react";

export function useTransactionData() {
  const { setTotalDonations } = useDonations();
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async (targetPublicKey = null) => {
    try {
      console.log('Starting transaction fetch...');
      const url = targetPublicKey 
        ? `/api/transactions?targetPublicKey=${targetPublicKey}`
        : '/api/transactions';
        
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        console.error('Data is not an array:', data);
        return [];
      }

      const filteredData = targetPublicKey
        ? data.filter(tx => tx.transaction.value.outputs[0].public_keys[0] === targetPublicKey)
        : data;

      const total = filteredData.reduce((sum, tx) => {
        try {
          const amount = parseInt(tx.transaction.value.outputs[0].amount);
          return sum + amount;
        } catch (err) {
          console.error('Error processing transaction:', tx, err);
          return sum;
        }
      }, 0);

      setTotalDonations(total);
      setIsLoading(false);
      return filteredData;
    } catch (err) {
      console.error('Fetch error:', err);
      setIsLoading(false);
      return [];
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return { fetchTransactions, isLoading };
} 