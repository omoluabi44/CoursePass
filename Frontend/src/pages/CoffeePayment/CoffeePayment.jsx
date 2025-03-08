import React, { useState, useEffect } from "react";
import "./PaymentPage.css";

const PaymentPage = () => {
  const [status, setStatus] = useState("idle"); // idle, processing, completed

  const handlePayClick = () => {
    setStatus("processing");
  };

  useEffect(() => {
    let timer;
    if (status === "processing") {
      // Simulate a 1-minute payment process (60000ms)
      timer = setTimeout(() => {
        setStatus("completed");
      }, 60000);
    }
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div className="payment-page">
      <h1>Payment Page</h1>
      <div className="account-details">
        <h2>Account Details</h2>
        <p>Account Name: ogunleye emmanuel</p>
        <p>Account Number: 9169199340</p>
        <p>Bank: OPay/Palmoay</p>
 
      </div>

      {status === "idle" && (
        <button className="pay-button" onClick={handlePayClick}>
          Pay
        </button>
      )}

      {status === "processing" && (
        <div className="processing">
          <div className="spinner"></div>
          <p>Confirming your payment...</p>
        </div>
      )}

      {status === "completed" && (
        <div className="completed">
          <h2>Thank You</h2>
          <p>Your payment has been processed successfully.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
