import React, { useEffect, useMemo, useState } from "react";
import { Image } from "react-bootstrap";
import { useTransactions } from "@/hooks/useTransactions";
import organizer from "@/images/resources/causes-details-organizar-img-1.jpg";

const truncateId = (id) => {
  if (!id) return 'Unknown';
  return `${id.slice(0, 6)}...${id.slice(-4)}`;
};

const CausesDetailsRight = ({ causeId }) => {
  const { transactions, loading, error, getTransactions } = useTransactions();
  const [showAll, setShowAll] = useState(false);

  // Sort transactions by amount
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  // Get either top 3 or all transactions based on showAll state
  const displayedTransactions = useMemo(() => {
    return showAll ? sortedTransactions : sortedTransactions.slice(0, 3);
  }, [sortedTransactions, showAll]);

  useEffect(() => {
    console.log('Fetching transactions for recipient:', causeId);
    
    getTransactions({
      signerPublicKey: "",
      recipientPublicKey: "CAvCqZP5xqk7E9baKSvAoFZazYYjNbgrgtnDicVMb25i",
    });
  }, [getTransactions]);

  return (
    <div className="causes-details__right">
      <div className="causes-details__organizer">
        <div className="causes-details__organizer-img">
          <Image src={organizer.src} alt="" />
        </div>
        <div className="causes-details__organizer-content">
          <p>Created 20 Jan, 2021</p>
          <h5>
            Organizer: <span>Jessica Smith</span>
          </h5>
          <ul className="causes-details__organizer-list list-unstyled">
            <li>
              <i className="fas fa-map-marker-alt"></i>Education
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i>Wrightwood, Canada
            </li>
          </ul>
        </div>
      </div>

      <div className="causes-details__donations">
        <h3 className="causes-details__donations-title">Recent Donations</h3>
        
        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            Error loading donations: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <ul className="list-unstyled causes-details__donations-list">
              {displayedTransactions.map((transaction) => (
                <li key={transaction.id}>
                  <div className="causes-details__donations-content">
                    <h4>${transaction.amount}</h4>
                    <p>ID: {truncateId(transaction.id)}</p>
                  </div>
                </li>
              ))}

              {transactions.length === 0 && (
                <li className="text-center py-4">
                  <p className="text-muted">No donations yet. Be the first to donate!</p>
                </li>
              )}
            </ul>

            {/* Only show button if there are more than 3 transactions */}
            {transactions.length > 3 && (
              <div className="text-center mt-4">
                <button
                  className="thm-btn"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? 'Show Less' : 'View All'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CausesDetailsRight;
