import React, { useState, useEffect } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
//import Loader from "../../Components/Loader/Loader";
const ProductDetail = () => {
  const { productId } = useParams();
  console.log(useParams());
  const [productFetched, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://fakestoreapi.com/products/${productId}`)
      //
      .then((res) => {
        let jSon = res.json();
        return jSon;
      })
      .then((datagot) => {
        setProduct(datagot);
        setIsLoading(false);
      });
  }, [productId]);
  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          product={productFetched}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </LayOut>
  );
};

export default ProductDetail;
