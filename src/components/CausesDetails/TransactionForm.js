import React, { useState, useEffect, useRef } from "react";
import ResVaultSDK from "resvault-sdk";
import NotificationModal from "./NotificationModal";
import { useDonations } from "@/context/DonationContext";
import { Modal, Button } from "react-bootstrap";

const TransactionForm = ({ onLogout, token, targetPublicKey, onTransactionSuccess }) => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState(targetPublicKey);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [transactionData, setTransactionData] = useState(null);

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
    if (targetPublicKey) {
      setRecipient(targetPublicKey);
    }
  }, [targetPublicKey]);

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
          const receiptData = {
            transactionId: message.data.data.postTransaction.id,
            amount: formatNumber(amount),
            recipient: recipient,
            date: new Date().toLocaleString(),
            timestamp: Date.now(),
            status: "Success",
          };

          setModalTitle("Success");
          setModalMessage(
            "Thank you for your contribution!\n" +
              "Transaction ID:\n" +
              receiptData.transactionId
          );
          setTransactionData(receiptData);
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
  }, [amount, recipient]);

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

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload();
  };

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleMonthlyDonate = (e) => {
    e.preventDefault();
    // TODO: Implement monthly donation logic
    setModalTitle("Monthly Donation");
    setModalMessage("Monthly donation feature coming soon!");
    setShowModal(true);
  };

  const handleDownloadReceipt = () => {
    // Implement receipt download logic
  };

  return (
    <>
      <div className="page-container">
        <div className="form-container p-4">
          <h2 className="text-center mb-4">Donation Information</h2>

          {/* 预设金额按钮组 */}
          <div className="preset-amounts-row mb-3">
            {[100, 500, 1000, 2500].map((amount) => (
              <button
                key={amount}
                type="button"
                className={`preset-btn ${
                  selectedPreset === amount ? "active" : ""
                }`}
                onClick={() => handlePresetAmount(amount)}
              >
                ${amount}
              </button>
            ))}
          </div>

          {/* 金额输入框 */}
          <div className="amount-input-wrapper mb-3">
            <input
              type="text"
              className="form-control amount-input"
              value={formatNumber(amount)}
              onChange={handleInputChange}
              placeholder="Enter custom amount"
            />
            <span className="currency-label">USD</span>
          </div>

          {/* 保证信息 */}
          <div className="guarantee-box mb-4">
            <div className="d-flex align-items-center mb-2">
              <i className="fas fa-check-circle text-success me-2"></i>
              <span className="guarantee-text">
                We guarantee that 100% of your donation goes straight to
                funding!
              </span>
            </div>
            <div className="public-key-text text-muted small">
              Donating to: {recipient}
            </div>
          </div>

          {/* 捐赠按钮 */}
          <div className="d-flex gap-3">
            <button
              type="submit"
              className="btn btn-primary flex-grow-1"
              onClick={handleSubmit}
            >
              One Time
            </button>
            <button
              type="button"
              className="btn btn-outline-primary flex-grow-1"
              onClick={handleMonthlyDonate}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      <Modal 
        show={showModal} 
        onHide={handleCloseModal}
        className="custom-modal"
        centered
      >
        <div className="modal-content" style={{ borderRadius: '8px', padding: '24px', background: '#1f2937', color: 'white' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="m-0">{modalTitle}</h4>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleCloseModal}
              style={{ background: 'none', border: 'none', color: 'white' }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          {modalTitle === "Success" && (
            <>
              <div className="text-center mb-4">
                <i className="fas fa-check-circle text-success" style={{ fontSize: '2rem', color: '#15c8a0' }}></i>
                <p className="mt-3">Thank you for your contribution!</p>
                <p className="text-muted small mb-2">Transaction ID:</p>
                <p className="small" style={{ wordBreak: 'break-all' }}>
                  {transactionData?.transactionId}
                </p>
              </div>
              <div className="d-flex gap-2 justify-content-end">
                <Button 
                  variant="secondary"
                  onClick={handleDownloadReceipt}
                  style={{ background: '#6c757d', border: 'none' }}
                >
                  Download Receipt
                </Button>
                <Button 
                  variant="primary"
                  onClick={handleCloseModal}
                  style={{ background: '#15c8a0', border: 'none' }}
                >
                  OK
                </Button>
              </div>
            </>
          )}
          
          {modalTitle !== "Success" && (
            <>
              <p>{modalMessage}</p>
              <div className="d-flex justify-content-end">
                <Button 
                  variant="primary" 
                  onClick={handleCloseModal}
                  style={{ background: '#15c8a0', border: 'none' }}
                >
                  OK
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default TransactionForm;
