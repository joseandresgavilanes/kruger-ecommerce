import { CLIENT_ID } from "../../../../Config/config.js";
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./Paypal.scss";
import { useNavigate } from "react-router-dom";

const Checkout = ({ PayPalCreateOrder, cartaFinalPrice }) => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  const navigate = useNavigate();

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Kruger Cell",
            amount: {
              currency_code: "USD",
              value: cartaFinalPrice,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        PayPalCreateOrder();
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function(details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
      console.log("Order successful . Your order id is--", orderID);
      navigate("/orders");
    }
  }, [success]);

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
      <div className="paypal">
        <PayPalButtons
          style={{ layout: "vertical" }}
          className="checkout_paypal"
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;
