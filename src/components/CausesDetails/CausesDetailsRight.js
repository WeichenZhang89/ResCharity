import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import organizer from "@/images/resources/causes-details-organizar-img-1.jpg";

const CausesDetailsRight = () => {
  const [transactions, setTransactions] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const truncateString = (str, start = 6, end = 4) => {
    if (!str) return '';
    if (str.length <= start + end) return str;
    return `${str.slice(0, start)}...${str.slice(-end)}`;
  };

  const fetchTransactions = async () => {
    try {
      console.log('Fetching transactions at:', new Date().toISOString());
      const response = await fetch('/api/transactions');
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received transactions:', data.length);
        console.log('Raw transaction data:', JSON.stringify(data[0], null, 2));
      console.log('Transaction structure:', {
        id: data[0]?.transaction?.value?.id,
        cmd: data[0]?.transaction?.cmd,
        inputs: data[0]?.transaction?.value?.inputs,
        outputs: data[0]?.transaction?.value?.outputs,
        timestamp: data[0]?.transaction?.value?.asset?.data?.timestamp
      });

      const sortedData = data.sort((a, b) => {
        const amountA = parseInt(a.transaction.value.outputs[0].amount);
        const amountB = parseInt(b.transaction.value.outputs[0].amount);
        return amountB - amountA;
      });
      setTransactions(sortedData);
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
