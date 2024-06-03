import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./Product.css";
import Loader from "../Loader/Loader";
const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        return response.json();
      })
      .then((dataget) => {
        setProducts(dataget);
        setIsLoading(false);
      });
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="products_container">
          {products.map((singleProduct) => {
            return (
              <ProductCard
                product={singleProduct}
                key={singleProduct.id}
                renderAdd={true}
              />
            );
          })}
        </section>
      )}
    </div>
  );
};

export default Product;
