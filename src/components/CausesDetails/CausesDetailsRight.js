import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useDonations } from "@/context/DonationContext";
import organizer from "@/images/resources/causes-details-organizar-img-1.jpg";

const CausesDetailsRight = () => {
  const [transactions, setTransactions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { setTotalDonations } = useDonations();

  const truncateString = (str, start = 6, end = 4) => {
    if (!str) return '';
    if (str.length <= start + end) return str;
    return `${str.slice(0, start)}...${str.slice(-end)}`;
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      console.log('API Response:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched Transactions:', data);

      const sortedData = data.sort((a, b) => {
        const amountA = parseInt(a.transaction.value.outputs[0].amount);
        const amountB = parseInt(b.transaction.value.outputs[0].amount);
        return amountB - amountA;
      });
      console.log('Sorted Transactions:', sortedData);

      // Calculate total donations
      const total = sortedData.reduce((sum, tx) => {
        const amount = parseInt(tx.transaction.value.outputs[0].amount);
        console.log('Current amount:', amount, 'Running sum:', sum);
        return sum + amount;
      }, 0);

      console.log('Total Donations:', total);
      
      setTransactions(sortedData);
      setTotalDonations(total);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    console.log('Fetching transactions...');
    fetchTransactions();
  }, []);

  const displayedTransactions = showAll ? transactions : transactions.slice(0, 5);

  return (
    <div className="causes-details__right">
      <div className="causes-details__transactions">
        <h3>Transactions</h3>
        {displayedTransactions.map((tx, index) => {
          const sender = tx.transaction.value.inputs[0].owners_before[0];
          return (
            <div key={index} className="transaction-item">
              <p><strong>Sender:</strong> {truncateString(sender, 6, 4)}</p>
              <p><strong>Transaction ID:</strong> {truncateString(tx.transaction.value.id, 8, 6)}</p>
              <p><strong>Amount:</strong> {tx.transaction.value.outputs[0].amount}</p>
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
