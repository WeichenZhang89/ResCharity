import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import organizer from "@/images/resources/causes-details-organizar-img-1.jpg";
import { useTransactionData } from "@/hooks/useTransactionData";

const CausesDetailsRight = ({ cause }) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 8;
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
      console.log("Loading transactions for cause:", cause?.targetPublicKey);
      const data = await fetchTransactions(cause?.targetPublicKey);
      console.log("Fetched transactions:", data);
      
      if (data && data.length > 0) {
        const sortedData = data.sort((a, b) => {
          const amountA = parseInt(a.transaction.value.outputs[0].amount);
          const amountB = parseInt(b.transaction.value.outputs[0].amount);
          return amountB - amountA;
        });
        setTransactions(sortedData);
      }
    };
    
    if (cause?.targetPublicKey) {
      loadTransactions();
    }
  }, [cause?.targetPublicKey]);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="causes-details__right">
      <div className="causes-details__transactions">
        <h3>Transactions</h3>
        {currentTransactions.map((tx, index) => {
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
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <span className="page-info">
              {currentPage} / {totalPages}
            </span>
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CausesDetailsRight;
