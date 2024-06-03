import React, { useContext } from "react";
import "./Cart.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };
  console.log("cart");
  console.log(basket);
  return (
    <LayOut>
      <section className="container">
        <div className="cart_container">
          <h2>Hello</h2>
          <h3>Your Shopping basket</h3>
          {basket.length === 0 ? (
            <p>Opps ! No item found in your cart</p>
          ) : (
            basket.map((item, i) => {
              return (
                <section className="cart_product">
                  <ProductCard
                    product={item}
                    renderDesc={true}
                    flex={true}
                    key={i}
                    renderAdd={false}
                  />
                  <div className="btn_container">
                    <button className="btn" onClick={() => increment(item)}>
                      <IoIosArrowUp />
                    </button>
                    <span>{item.amount}</span>
                    <button className="btn" onClick={() => decrement(item.id)}>
                      <IoIosArrowDown />
                    </button>
                  </div>
                </section>
              );
            })
          )}
          <hr />
        </div>
        {basket?.length !== 0 && (
          <div className="subtotal">
            <div>
              <p> Subtotal({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkbox</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Cart;
