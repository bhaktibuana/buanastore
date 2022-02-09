import React from "react";
import "./ProductSpinner.css";
import Spinner from "react-bootstrap/Spinner";

const ProductSpinner = () => {
  return (
    <>
      <div className="product-spinner-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <br />
        <h3>Loading product...</h3>
      </div>
    </>
  );
};

export default ProductSpinner;
