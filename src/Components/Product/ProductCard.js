import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import "./Product.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
const ProductCard = ({ product, flex, renderDesc, renderAdd }) => {
  const [state, dispatch] = useContext(DataContext);
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: product,
    });
  };

  //const { id, title, price, description, category, image, rating } = product;
  //console.log(product);
  var ratingValue = product?.rating?.rate;
  console.log(ratingValue);
  var countValue = product?.rating?.count;
  console.log(countValue);
  return (
    <div className={`card_container ${flex ? `product_flexed` : ``}`}>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt="" className="img_container" />
      </Link>
      <div>
        <h3>{product.title}</h3>
        {renderDesc && (
          <div style={{ maxWidth: "750px" }}>{product.description}</div>
        )}
        <div className="rating">
          <Rating value={ratingValue} precision={0.1} />
          <small>Value={countValue}</small>
        </div>
        <div>
          <CurrencyFormat amount={product.price} />
        </div>
        {renderAdd && (
          <button onClick={addToCart} className="button">
            add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
