import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert
import "./PaymentForm.css"; // Import the CSS file for styling

const PaymentForm = () => {
  const [amount, setAmount] = useState(5000); // Amount in cents
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState(""); // Only keep name input for simplicity

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    if (!name) {
      setError("Name is required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post("http://localhost:3000/payment/create-payment-intent", {
        amount,
      });

      const clientSecret = data.clientSecret;

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: stripeError.message,
        });
      } else if (paymentIntent.status === "succeeded") {
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "Your payment was processed successfully!",
        });
        // Reset the form after success
        setName(""); // Reset the name field
        elements.getElement(CardElement).clear(); // Reset the card input field
        setError(null); // Reset any previous errors
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "There was an issue with the payment. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form-container">
      <h2 className="payment-form-title">Payment Form</h2>
      <div className="payment-form">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="payment-form-input"
        />
        <div className="card-element-container">
          <CardElement className="card-element" />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button onClick={handlePayment} className="payment-button" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
