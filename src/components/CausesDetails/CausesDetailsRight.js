import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import organizer from "@/images/resources/causes-details-organizar-img-1.jpg";
import { useDonations } from "@/context/DonationContext";

const CausesDetailsRight = () => {
  const [transactions, setTransactions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { setTotalDonations } = useDonations();

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

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Number of transactions found:', data.length);

      const sortedData = data.sort((a, b) => {
        const amountA = parseInt(a.transaction.value.outputs[0].amount);
        const amountB = parseInt(b.transaction.value.outputs[0].amount);
        return amountB - amountA;
      });

      // Calculate total donations
      const total = sortedData.reduce((sum, tx) => {
        const amount = parseInt(tx.transaction.value.outputs[0].amount);
        return sum + amount;
      }, 0);

      console.log('Total donations calculated:', total);
      setTransactions(sortedData);
      setTotalDonations(total); // Update the context with total
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
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
