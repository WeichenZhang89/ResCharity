import React, { useState, useEffect, useRef } from "react";
import ResVaultSDK from "resvault-sdk";
import NotificationModal from "./NotificationModal";
import { targetPublicKey } from "../../config/targetPublicKey";
import { useDonations } from "@/context/DonationContext";

const TransactionForm = ({ onLogout, token }) => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState(targetPublicKey);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const { remainingAmount } = useDonations();
  const sdkRef = useRef(null);
  const presetAmounts = [50, 100, 150, 200];
  const [selectedPreset, setSelectedPreset] = useState(null);
  const handlePresetAmount = (presetAmount) => {
    setAmount(String(Math.min(presetAmount, remainingAmount)));
    setSelectedPreset(presetAmount);
  };
  if (!sdkRef.current) {
    sdkRef.current = new ResVaultSDK();
  }

  const handleIncrement = () => {
    setAmount((prev) => {
      const newAmount = Number(prev) + 1;
      return String(Math.min(newAmount, remainingAmount));
    });
  };

  const handleDecrement = () => {
    setAmount((prev) => {
      const newAmount = Number(prev) - 1;
      return String(newAmount > 0 ? newAmount : 0);
    });
  };

  const handleSliderChange = (e) => {
    const value = Math.min(parseInt(e.target.value), remainingAmount);
    setAmount(String(value));
  };

  const formatNumber = (num) => {
    const value = num.toString().replace(/,/g, "");
    if (!value) return "";
    return Number(value).toLocaleString("en-US");
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(value)) {
      const numValue = parseInt(value) || 0;
      setAmount(String(Math.min(numValue, remainingAmount)));
    }
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
            "Thank you for your contribution!\n" +
              "Transaction ID: " +
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

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
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
            <div className="form-group mb-4">
              <input
                type="text"
                value={recipient}
                onChange={handleRecipientChange}
                className="form-control"
                style={{
                  fontSize: "14px",
                  color: "#666",
                  background: "#f5f5f5",
                }}
              />
            </div>
            <div className="amount-input-container">
              <input
                type="text"
                className="form-control"
                value={formatNumber(amount)}
                onChange={handleInputChange}
                placeholder="Enter amount"
              />
              <div className="preset-amounts">
                {presetAmounts.map((presetAmount) => (
                  <button
                    key={presetAmount}
                    type="button"
                    className={`preset-amount-btn ${
                      amount === String(presetAmount) ? "active" : ""
                    }`}
                    onClick={() => handlePresetAmount(presetAmount)}
                  >
                    ${presetAmount}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="0"
                max={remainingAmount}
                value={amount || 0}
                className="amount-slider"
                onChange={handleSliderChange}
              />
              <div className="remaining-amount">
                Remaining Goal: ${formatNumber(remainingAmount)}
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="button">
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
