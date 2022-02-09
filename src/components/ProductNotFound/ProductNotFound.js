import React from "react";
import "./ProductNotFound.css";
import { BsEmojiFrown } from "react-icons/bs";

const ProductNotFound = () => {
  return (
    <>
      <div className="product-not-found-container">
        <h1>Oops!</h1>
        <br />
        <BsEmojiFrown size={100} />
        <br />
        <h1>Product not found</h1>
      </div>
    </>
  );
};

export default ProductNotFound;
