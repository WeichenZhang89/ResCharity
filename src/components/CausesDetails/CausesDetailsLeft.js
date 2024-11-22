import { useCausesDetails } from "@/data/causesDetails";
import { social } from "@/data/NavItems";
import download from "@/images/resources/causes-details-download-icon.png";
import React, { useState, useEffect } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Link from "next/link";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("./Login"), {
  ssr: false,
});

const TransactionForm = dynamic(() => import("./TransactionForm"), {
  ssr: false,
});

const Loader = dynamic(() => import("./Loader"), {
  ssr: false,
});

const CausesDetailsLeft = () => {
  const {
    comments,
    summaryList,
    raised,
    goal,
    category,
    title,
    images,
    texts,
    summaryText,
  } = useCausesDetails();

  console.log('CausesDetailsLeft - Raised Amount:', raised);

  const raisedNumber = +raised.split(",").join("");
  const goalNumber = +goal.split(",").join("");
  const percent = Math.round((raisedNumber / goalNumber) * 100) + "%";
  console.log('Calculated percent:', percent);

  const [showDonationModal, setShowDonationModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoadingAfterLogin, setIsLoadingAfterLogin] = useState(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (authToken) => {
    setIsLoadingAfterLogin(true);
    setToken(authToken);
    sessionStorage.setItem("token", authToken);

    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoadingAfterLogin(false);
    }, 2000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
    sessionStorage.removeItem("token");
  };

  const cause = {
    id: "cause-1",
    name: title,
  };

  return (
    <div className="causes-details__left-bar">
      <div className="causes-details__img">
        <div className="causes-details__img-box">
          <Image src={images[0].src} alt="" />
          <div className="causes-details__category">
            <span>{category}</span>
          </div>
        </div>
        <div className="causes-details__progress">
          <div className="bar">
            <div
              className="bar-inner count-bar"
              style={{ width: percent, opacity: 1 }}
              data-percent={percent}
            >
              <div style={{ opacity: 1 }} className="count-text">
                {percent}
              </div>
            </div>
          </div>
          <div className="causes-details__goals">
            <p>
              <span>${raised}</span> Raised
            </p>
            <p>
              <span>${goal}</span> Goal
            </p>
          </div>
        </div>
      </div>
      <div className="causes-details__text-box">
        <h3>{title}</h3>
        {texts.map((text, index) => (
          <p key={index} className={`causes-details__text-${index + 1}`}>
            {text}
          </p>
        ))}
      </div>
      <div className="causes-details__share">
        <div className="causes-details__share-btn-box">
          <button
            className="causes-details__share-btn thm-btn"
            onClick={() => setShowDonationModal(true)}
          >
            <i className="fas fa-arrow-circle-right"></i>Donate Us Now
          </button>
        </div>
      </div>

      {showDonationModal && (
        <div className="donation-modal">
          <div className="donation-modal-content">
            <button 
              className="modal-close-btn"
              onClick={() => setShowDonationModal(false)}
            >
              ×
            </button>
            {isLoadingAfterLogin ? (
              <Loader />
            ) : isAuthenticated ? (
              <TransactionForm onLogout={handleLogout} token={token} />
            ) : (
              <Login onLogin={handleLogin} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CausesDetailsLeft;
