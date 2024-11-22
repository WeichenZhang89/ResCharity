import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import organizer from "@/images/resources/causes-details-organizar-img-1.jpg";
import { useTransactionData } from "@/hooks/useTransactionData";

const CausesDetailsRight = () => {
  const [transactions, setTransactions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { fetchTransactions } = useTransactionData();

  const truncateString = (str, start = 6, end = 4) => {
    if (!str) return '';
    if (str.length <= start + end) return str;
    return `${str.slice(0, start)}...${str.slice(-end)}`;
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    const loadTransactions = async () => {
      const data = await fetchTransactions();
      const sortedData = data.sort((a, b) => {
        const amountA = parseInt(a.transaction.value.outputs[0].amount);
        const amountB = parseInt(b.transaction.value.outputs[0].amount);
        return amountB - amountA;
      });
      setTransactions(sortedData);
    };
    
    loadTransactions();
  }, []);

  const displayedTransactions = showAll ? transactions : transactions.slice(0, 5);

  return (
    <div className="causes-details__right">
      <div className="causes-details__transactions">
        <h3>Transactions</h3>
        {displayedTransactions.map((tx, index) => {
          const sender = tx.transaction.value.inputs[0].owners_before[0];
          const amount = parseInt(tx.transaction.value.outputs[0].amount);
          return (
            <div key={index} className="transaction-item">
              <p><strong>Sender:</strong> {truncateString(sender, 6, 4)}</p>
              <p><strong>Transaction ID:</strong> {truncateString(tx.transaction.value.id, 8, 6)}</p>
              <p><strong>Amount:</strong> {formatAmount(amount)}</p>
              <hr />
            </div>
          );
        })}
        {transactions.length > 5 && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="toggle-button"
          >
            {showAll ? 'Show Less' : 'View All'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CausesDetailsRight;
