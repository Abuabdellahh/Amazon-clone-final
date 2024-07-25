// Import necessary hooks and components from React and other libraries
import { useContext, useState } from "react";
import classes from "./Payment.module.css"; // Import CSS module for styling
import { DataContext } from "../../componentes/DataProvider/DataProvider"; // Import context to access global data
import LayOut from "../../componentes/LayOut/LayOut"; // Import layout component
import ProductCard from "../../componentes/product/ProductCard"; // Import product card component for displaying products

// Import Stripe elements for handling payments
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormater from "../../componentes/currencyFormat/CurrencyFormat"; // Import utility for formatting currency
import axiosInstance from "../../Api/axios"; // Import axios instance for API calls
import { db } from "../../Utility/firebase"; // Import firebase database instance
import { useNavigate } from "react-router-dom"; // Import hook for navigation
import { Type } from "../../Utility/action.type";

const Payment = () => {
  const [{ user, basket },dispatch] = useContext(DataContext); // Destructure user and basket from context
  const totalItem = basket?.reduce((amount, item) => amount + item.amount, 0); // Calculate total items in the basket
  const [cardError, setCardError] = useState(); // State for handling card errors
  const [processing, setProcessing] = useState(false); // State to indicate if the payment is being processed
  const stripe = useStripe(); // Hook to access Stripe.js
  const elements = useElements(); // Hook to access Stripe elements
  const navigate = useNavigate(); // Hook for navigation

  const handlePayment = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setProcessing(true); // Start processing payment
    try {
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`, // API call to create payment intent
      });
      console.log("Payment successful:", response.data);
      const clientSecret = response.data?.clientSecret;
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement), // Get card details from CardElement
        },
      });
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }); // Save order details in firebase

  dispatch({ type: Type.EMPTY_BASKET }); 


      setProcessing(false);
      navigate("/order", { msg: "you have placed new order" }); // Navigate to order page
    } catch (error) {
      console.error("Payment error:", error);
      setCardError("Payment failed. Please try again."); // Handle payment errors
    }
    setProcessing(false); // End processing
  };

  // Calculate total price of items in the basket
  const total = basket.reduce(
    (ammount, item) => item.price * item.amount + ammount,
    0
  );
  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError(""); // Handle card element changes
  };

  return (
    <LayOut>
      {/* Header section displaying total items */}
      <div className={classes.payment_header}>checkout {totalItem} items</div>
      {/* Main payment section */}
      <section className={classes.payment}>
        {/* Address section */}
        <div className={classes.payment_section}>
          <h3>Delivery Address</h3>
          <div className={classes.address_details}>
            <p>John Doe</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <hr />
        {/* Product review section */}
        <div className={classes.payment_section}>
          <h3>Review Items and Delivery</h3>
          <div className={classes.items}>
            {basket?.map((item, index) => (
              <ProductCard product={item} key={index} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* Payment method section */}
        <div className={classes.payment_section}>
          <h3>Payment Method</h3>

          <div className={classes.payment_form}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />

                {/* Price display */}
                <div className={classes.payment_price}>
                  <div>
                    <span>
                      Total order <CurrencyFormater amount={total} />
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className={classes.submit_button}
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <div className={classes.spinner}></div> Please Wait...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;
