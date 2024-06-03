import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/Product/ProductCard";
const Results = () => {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  console.log(categoryName);
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${categoryName}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setResults(data);
      });
  }, [categoryName]);
  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <h2 style={{ padding: "30px" }}>Category / {categoryName}</h2>
        <hr />
        <div className="products_container">
          {results?.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </section>
    </LayOut>
  );
};

export default Results;
