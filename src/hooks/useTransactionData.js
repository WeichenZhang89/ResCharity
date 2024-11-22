import { useDonations } from "@/context/DonationContext";
import { useEffect, useState } from "react";

export function useTransactionData() {
  const { setTotalDonations } = useDonations();
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      console.log('Starting transaction fetch...'); // Debug point 1
      const response = await fetch('/api/transactions');
      console.log('API Response status:', response.status); // Debug point 2
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response data:', data); // Debug point 3
      
      if (!Array.isArray(data)) {
        console.error('Data is not an array:', data);
        return [];
      }

      // Calculate total donations
      const total = data.reduce((sum, tx) => {
        try {
          const amount = parseInt(tx.transaction.value.outputs[0].amount);
          console.log('Processing transaction:', { amount, txId: tx.transaction.value.id }); // Debug point 4
          return sum + amount;
        } catch (err) {
          console.error('Error processing transaction:', tx, err);
          return sum;
        }
      }, 0);

      console.log('Final total calculated:', total); // Debug point 5
      setTotalDonations(total);
      setIsLoading(false);
      return data;
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