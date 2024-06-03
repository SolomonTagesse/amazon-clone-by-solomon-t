import React from "react";
import { categoryInfos } from "./CategoryFullInfos";
import CategoryCard from "./CategoryCard";
import "./Category.css";
const Category = () => {
  return (
    <section className="Category_container">
      {categoryInfos.map((infos, index) => {
        return <CategoryCard data={infos} key={index} />;
      })}
    </section>
  );
};

export default Category;
