import React, { useState, useEffect, useRef } from "react";
import ResVaultSDK from "resvault-sdk";
import NotificationModal from "./NotificationModal";

const TransactionForm = ({ onLogout, token }) => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const sdkRef = useRef(null);

  if (!sdkRef.current) {
    sdkRef.current = new ResVaultSDK();
  }

  const handleIncrement = () => {
    setAmount((prev) => String(Number(prev) + 1));
  };

  const handleDecrement = () => {
    setAmount((prev) => {
      const newAmount = Number(prev) - 1;
      return String(newAmount > 0 ? newAmount : 0);
    });
  };

  useEffect(() => {
    const sdk = sdkRef.current;
    if (!sdk) return;

    const messageHandler = (event) => {
      const message = event.data;

      if (
        message &&
        message.type === "FROM_CONTENT_SCRIPT" &&
        message.data &&
        message.data.success !== undefined
      ) {
        if (message.data.success) {
          setModalTitle("Success");
          setModalMessage(
            "Thank you for your contribution! ID: " +
              message.data.data.postTransaction.id
          );
        } else {
          setModalTitle("Transaction Failed");
          setModalMessage(
            "Transaction failed: " +
              (message.data.error || JSON.stringify(message.data.errors))
          );
        }
        setShowModal(true);
      }
    };

    sdk.addMessageListener(messageHandler);

    return () => {
      sdk.removeMessageListener(messageHandler);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recipient) {
      setModalTitle("Validation Error");
      setModalMessage("Please enter a recipient address.");
      setShowModal(true);
      return;
    }

    if (sdkRef.current) {
      sdkRef.current.sendMessage({
        type: "commit",
        direction: "commit",
        amount: amount,
        data: {},
        recipient: recipient,
      });
    } else {
      setModalTitle("Error");
      setModalMessage("SDK is not initialized.");
      setShowModal(true);
    }
  };

  const handleLogoutClick = () => {
    onLogout();
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSliderChange = (e) => {
    setAmount(e.target.value);
  };

  const formatNumber = (num) => {
    // Remove any commas first and parse the number
    const value = num.replace(/,/g, '');
    if (!value) return '';
    return Number(value).toLocaleString('en-US');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Remove commas for validation and storage
    const rawValue = value.replace(/,/g, '');
    // Only allow numbers
    if (/^\d*$/.test(rawValue)) {
      setAmount(rawValue);  // Store raw value without commas
    }
  };

  // Add this function to format display value
  const displayAmount = () => {
    return amount ? formatNumber(amount) : '';
  };

  return (
    <>
      <div className="page-container">
        <div className="form-container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="heading">Make a Contribution</h2>
            <button
              type="button"
              className="btn btn-danger logout-button"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <div className="amount-input-container">
                <input
                  type="text"
                  className="form-control"
                  value={displayAmount()}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={amount || 0}
                  className="amount-slider"
                  onChange={handleSliderChange}
                />
              </div>
            </div>

            <div className="form-group mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter recipient address here"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>

            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary button">
                Donate
              </button>
            </div>
          </form>
        </div>
      </div>

      <NotificationModal
        show={showModal}
        title={modalTitle}
        message={modalMessage}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default TransactionForm;
