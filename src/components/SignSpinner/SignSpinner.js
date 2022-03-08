import React from "react";
import "./SignSpinner.css";
import Spinner from "react-bootstrap/Spinner";

const SignSpinner = (props) => {
  return (
    <>
      <div className="sign-spinner-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <br />
        <h3>{props.text}</h3>
      </div>
    </>
  );
};

export default SignSpinner;
