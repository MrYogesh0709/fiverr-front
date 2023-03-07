import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51MibbFSA0xTYzbpiFHz3Cctba6yBg93JPQnQqLQL2EOgL5CjOYtcW4PCcFDfgByIglxm4IcOTEmG5i4cI5wIrOzS002JXr8T6l"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();

  const makeRequest = async () => {
    try {
      const res = await newRequest.post(`/orders/create-payment-intent/${id}`);
      setClientSecret(res.data.clientSecret);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
