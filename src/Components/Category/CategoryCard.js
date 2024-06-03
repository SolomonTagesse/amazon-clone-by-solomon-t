import React from "react";
import "./Category.css";
import { Link } from "react-router-dom";
const CategoryCard = (props) => {
  return (
    <div className="Category">
      <Link to={`/category/${props.data.category}`}>
        <span>
          <h2>{props.data?.title}</h2>
        </span>
        <img src={props.data?.image} alt="" />
        <p>Shop Now</p>
      </Link>
    </div>
  );
};

export default CategoryCard;
