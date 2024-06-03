import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { Type } from "../../Utility/action.type";
import "./Payment.css";
import ProductCard from "../../Components/Product/ProductCard";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const totalPrice = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const totalprice100 = totalPrice * 100;

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleChange = (e) => {
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
  };
  const handlePayment = async (e) => {
    setProcessing(true);
    e.preventDefault();
    try {
      //1. backend || functions==> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payments/create?total=${totalprice100}`,
      });
      //console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      //2. Client side (react side) confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
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
        });
      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      navigate("/orders", {
        state: {
          msg: "You have placed new order",
        },
      });
      // console.log(confirmation);
    } catch (error) {
      setProcessing(false);
    }

    //3. after the confirmation===> order the firestor data base,then clear basker
  };
  return (
    <LayOut>
      {/* {header} */}
      <div className="payment_header">Checkout {totalItem} items</div>
      {/* {Payment Method} */}
      <section className="payment">
        {/* {Address} */}
        <div className="flex">
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago</div>
          </div>
        </div>
        <hr />
        <div>
          <h3>Review Items and Delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className="flex">
          {/* {card form} */}
          <h3>Payments methods</h3>
          <div className="payment_card_container">
            <div className="payments_detail">
              <form onSubmit={handlePayment} action="">
                {cardError && <small>{cardError}</small>}
                <CardElement onChange={handleChange} />
                <div>
                  <div className="payment_price">
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order: </p>
                      <CurrencyFormat amount={totalPrice} />
                    </span>
                  </div>

                  <button type="submit">
                    {processing ? (
                      <div className="loading">
                        <ClipLoader color="#d63649" size={12} />
                        <p>Please Wait</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;
<ClipLoader color="#d63649" size={18} />;
