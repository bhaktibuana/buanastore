import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import "./ProductDetails.css";
import { BsFillHeartFill, BsCartPlusFill } from "react-icons/bs";
import axios from "axios";

const ProductDetails = (props) => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isWishlistExist, setIsWishlistExist] = useState(false);
  const [isCartExist, setIsCartExist] = useState(false);

  const imageUrlParse = () => {
    const codeArr = props.code.split("-");
    codeArr.pop();
    return codeArr.join("-");
  };

  const productSize = () => {
    const codeArr = props.code.split("-");
    return codeArr[codeArr.length - 1];
  };

  const priceFormatting = (price) => {
    const currency = price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    const currencyArr = currency.split("");

    for (let i = 0; i < 3; i++) {
      currencyArr.pop();
    }

    currencyArr.shift();

    return currencyArr.join("").replace(/,/g, ".");
  };

  const addWishlistHandler = async () => {
    const token =
      localStorage.getItem("token") !== null
        ? localStorage.getItem("token")
        : sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const bodyParams = {
      product_code: props.code,
    };

    try {
      await axios
        .post(props.apiURL.urlAddWishlist, bodyParams, config)
        .then((res) => {
          setSuccessMessage(res.data.message);
          setShowSuccess(true);
          setShowError(false);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setErrorMessage("You must be logged in to add to wishlist");
            setShowError(true);
            setShowSuccess(false);
          } else if (err.response.status === 500) {
            setErrorMessage("Product already in wishlist");
            setShowError(true);
            setShowSuccess(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const removeWishlistHandler = async () => {
    const token =
      localStorage.getItem("token") !== null
        ? localStorage.getItem("token")
        : sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const bodyParams = {
      product_code: props.code,
    };

    try {
      await axios
        .put(props.apiURL.urlSoftDeleteWihslist, bodyParams, config)
        .then((res) => {
          setSuccessMessage("Removed from wishlist");
          setShowSuccess(true);
          setShowError(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addCartHandler = async () => {
    const token =
      localStorage.getItem("token") !== null
        ? localStorage.getItem("token")
        : sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const bodyParams = {
      product_code: props.code,
    };

    try {
      await axios
        .post(props.apiURL.urlAddCart, bodyParams, config)
        .then((res) => {
          setSuccessMessage(res.data.message);
          setShowSuccess(true);
          setShowError(false);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setErrorMessage("You must be logged in to add to cart");
            setShowError(true);
            setShowSuccess(false);
          } else if (err.response.status === 500) {
            setErrorMessage("Product already in cart");
            setShowError(true);
            setShowSuccess(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartHandler = async () => {
    const token =
      localStorage.getItem("token") !== null
        ? localStorage.getItem("token")
        : sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const bodyParams = {
      product_code: props.code,
    };

    try {
      await axios
        .put(props.apiURL.urlSoftDeleteCart, bodyParams, config)
        .then((res) => {
          setSuccessMessage("Removed from cart");
          setShowSuccess(true);
          setShowError(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setShowError(false);
    setShowSuccess(false);

    if (
      localStorage.getItem("token") !== null ||
      sessionStorage.getItem("token") !== null
    ) {
      const token =
        localStorage.getItem("token") !== null
          ? localStorage.getItem("token")
          : sessionStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          product_code: props.code,
        },
      };

      if (props.code !== "") {
        axios
          .get(props.apiURL.urlCheckSelectedWishlist, config)
          .then((res) => {
            if (res.data.length > 0) {
              setIsWishlistExist(true);
            } else {
              setIsWishlistExist(false);
            }
          })
          .catch((err) => {
            setIsWishlistExist(false);
          });

        axios
          .get(props.apiURL.urlCheckSelectedCart, config)
          .then((res) => {
            if (res.data.length > 0) {
              setIsCartExist(true);
            } else {
              setIsCartExist(false);
            }
          })
          .catch((err) => {
            setIsCartExist(false);
          });
      }
    }
  }, [props.code]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Product Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.modalSpinnerState ? (
            <>
              <div className="modal-spinner-container">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <br />
                <h4>Loading product detail...</h4>
              </div>
            </>
          ) : (
            <>
              <h4>{props.name}</h4>

              <div className="modal-product-content">
                <div className="modal-product-image-container">
                  <img
                    src={
                      props.productDetailObject !== null
                        ? require(`../../img/img-${imageUrlParse()}.jpg`)
                        : ""
                    }
                    alt=""
                  />
                </div>

                <div className="modal-product-description-container">
                  <p>
                    <strong>Code:</strong> {` ${props.code}`}
                  </p>

                  <p>
                    <strong>Size:</strong> {` ${productSize()}`}
                  </p>

                  <p id="modal-product-description">
                    <strong>Description:</strong>
                  </p>

                  <p id="modal-product-description-text">{props.description}</p>

                  <p id="modal-product-price">
                    {props.discount > 0 ? (
                      <strong>
                        Rp
                        {priceFormatting(
                          Math.floor(
                            (props.price * (100 - props.discount)) / 100
                          )
                        )}
                        ,-
                      </strong>
                    ) : (
                      <strong>Rp{priceFormatting(props.price)},-</strong>
                    )}
                  </p>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {showError ? <p>{errorMessage}</p> : ""}
          {showSuccess ? <p>{successMessage}</p> : ""}

          {isWishlistExist ? (
            <>
              <button
                id="modal-button-wishlist"
                type="button"
                className="btn btn-danger"
                onClick={removeWishlistHandler}
              >
                <div className="modal-button-container">
                  <div className="modal-button-icon-container">
                    <BsFillHeartFill />
                  </div>
                  Remove from wishlist
                </div>
              </button>
            </>
          ) : (
            <>
              <button
                id="modal-button-wishlist"
                type="button"
                className="btn btn-danger"
                onClick={addWishlistHandler}
              >
                <div className="modal-button-container">
                  <div className="modal-button-icon-container">
                    <BsFillHeartFill />
                  </div>
                  Add to wishlist
                </div>
              </button>
            </>
          )}

          {isCartExist ? (
            <>
              <button
                id="modal-button-add-to-cart"
                type="button"
                className="btn btn-success"
                onClick={removeCartHandler}
              >
                <div className="modal-button-container">
                  <div className="modal-button-icon-container">
                    <BsCartPlusFill />
                  </div>
                  Remove from cart
                </div>
              </button>
            </>
          ) : (
            <>
              <button
                id="modal-button-add-to-cart"
                type="button"
                className="btn btn-success"
                onClick={addCartHandler}
              >
                <div className="modal-button-container">
                  <div className="modal-button-icon-container">
                    <BsCartPlusFill />
                  </div>
                  Add to cart
                </div>
              </button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductDetails;
