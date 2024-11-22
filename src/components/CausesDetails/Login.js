import React, { useEffect, useRef, useState } from "react";
import ResVaultSDK from "resvault-sdk";
import NotificationModal from "./NotificationModal";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
// Import SVG as a component
import ResVaultLogo from "@/images/resilientdb.svg";

const Login = ({ onLogin }) => {
  const sdkRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const animationContainer = useRef(null);

  if (!sdkRef.current) {
    sdkRef.current = new ResVaultSDK();
  }

  useEffect(() => {
    if (typeof window !== "undefined" && animationContainer.current) {
      import("lottie-web").then((lottie) => {
        const instance = lottie.default.loadAnimation({
          container: animationContainer.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: require("@/images/animation.json"),
        });

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              instance.play();
            } else {
              instance.pause();
            }
          });
        });

        if (animationContainer.current) {
          observer.observe(animationContainer.current);
        }

        return () => {
          instance.destroy();
          if (animationContainer.current) {
            observer.unobserve(animationContainer.current);
          }
        };
      });
    }
  }, []);

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
          const token = uuidv4();
          sessionStorage.setItem("token", token);
          onLogin(token);
        }
      } else if (
        message &&
        message.type === "FROM_CONTENT_SCRIPT" &&
        message.data &&
        message.data === "error"
      ) {
        setModalTitle("Authentication Failed");
        setModalMessage(
          "Please connect ResVault to ResCharity and try again."
        );
        setShowModal(true);
      }
    };

    sdk.addMessageListener(messageHandler);

    return () => {
      sdk.removeMessageListener(messageHandler);
    };
  }, [onLogin]);

  const handleAuthentication = () => {
    if (sdkRef.current) {
      sdkRef.current.sendMessage({
        type: "login",
        direction: "login",
      });
    } else {
      setModalTitle("Error");
      setModalMessage("SDK is not initialized.");
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="page-container">
        <div className="form-container">
          <h2 className="heading">ResCharity</h2>

          <div ref={animationContainer} className="animation-container"></div>

          <div className="form-group text-center mb-4">
            <label className="signin-label">Sign In Via</label>
            <button
              type="button"
              className="btn btn-secondary oauth-button"
              onClick={handleAuthentication}
            >
              <div className="logoBox">
                <ResVaultLogo width={24} height={24} />
              </div>
              <span className="oauth-text">ResVault</span>
            </button>
          </div>
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

export default dynamic(() => Promise.resolve(Login), {
  ssr: false,
});
