import { useState, useCallback } from 'react';
import { fetchTransactions, formatTransaction } from '@/api/resilientDb';

export const useTransactions = (initialFilters = {}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTransactions = useCallback(async (filters = initialFilters) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTransactions(filters);
      const formattedTransactions = data.map(formatTransaction);
      setTransactions(formattedTransactions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    transactions,
    loading,
    error,
    getTransactions,
    refresh: () => getTransactions(initialFilters),
  };
}; 