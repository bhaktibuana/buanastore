import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

import "./ListModal.css";
import ProductNotFound from "../ProductNotFound/ProductNotFound";
import ProductSpinner from "../ProductSpinner/ProductSpinner";

const ListModal = (props) => {
  const [data, setData] = useState([]);
  const [removeClicked, setRemoveClicked] = useState(false);
  const [isProductNotFound, setIsProductNotFound] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  const fetchData = async () => {
    setSpinnerState(true);

    const apiUrl =
      props.modalTitle === "Wishlist"
        ? props.apiURL.urlGetWishlist
        : props.apiURL.urlGetCart;
    const token =
      localStorage.getItem("token") !== null
        ? localStorage.getItem("token")
        : sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios
        .get(apiUrl, config)
        .then((res) => {
          setData(res.data);
          setRemoveClicked(false);
          setIsProductNotFound(false);
          setSpinnerState(false)
          setIsUnauthorized(false);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setIsProductNotFound(true);
            setSpinnerState(false);
          } else if (err.response.status === 401) {
            setIsUnauthorized(true);
            setSpinnerState(false);
          }
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const removeData = async (productCode) => {
    const apiUrl =
      props.modalTitle === "Wishlist"
        ? props.apiURL.urlSoftDeleteWihslist
        : props.apiURL.urlSoftDeleteCart;
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
      product_code: productCode,
    };

    try {
      await axios
        .put(apiUrl, bodyParams, config)
        .then((res) => {
          setRemoveClicked(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const imageUrlParse = (code) => {
    const codeArr = code.split("-");
    codeArr.pop();
    return codeArr.join("-");
  };

  const productSize = (code) => {
    const codeArr = code.split("-");
    return codeArr[codeArr.length - 1];
  };

  useEffect(() => {
    if (props.modalTitle !== "") {
      fetchData();
    }
  }, [props.modalTitle, removeClicked]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {spinnerState ? (
            <ProductSpinner />
          ) : ""}

          {isUnauthorized ? (
            <>
              <p>You need login to see the {props.modalTitle}</p>
            </>
          ) : ""}

          {isProductNotFound ? (
            <>
              <ProductNotFound />
            </>
          ) : (
            data.map((item, idx) => (
              <div className="list-modal-item-container" key={idx}>
                <img
                  className="list-modal-img"
                  src={require(`../../img/img-${imageUrlParse(
                    item.product_code
                  )}.jpg`)}
                  alt="product"
                />

                <div className="list-modal-item-desc">
                  <p>{item.product_name}</p>
                  <p>Size: {productSize(item.product_code)}</p>
                </div>

                <Button
                  variant="danger"
                  id="list-modal-btn-remove"
                  onClick={() => removeData(item.product_code)}
                >
                  Remove
                </Button>
              </div>
            ))
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ListModal;
