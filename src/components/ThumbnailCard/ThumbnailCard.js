import React from "react";
import "./ThumbnailCard.css";

const ThumbnailCard = (props) => {
  const titleFormatting = (title) => {
    const titleArr = title.split("");

    if (titleArr.length > 33) {
      const tempArr = titleArr.slice(0, 30);

      for (let i = 0; i < 3; i++) {
        tempArr.push(".");
      }

      return tempArr.join("");
    } else {
      return titleArr.join("");
    }
  };

  const imageUrlParse = () => {
    const codeArr = props.productCode.split("-");
    codeArr.pop();
    return codeArr.join("-");
  };

  const productSize = () => {
    const codeArr = props.productCode.split("-");
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

  return (
    <>
      <div
        id="thumbnail"
        className="card"
        onClick={() => {
          props.setProductDetailState(true);
          props.setItemSelectedCode(props.productCode);
        }}
      >
        <img
          src={require(`../../img/img-${imageUrlParse()}.jpg`)}
          alt=""
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{titleFormatting(props.productName)}</h5>
          <p className="card-text">Size: {productSize()}</p>
          {props.productDiscount > 0 ? (
            <div className="discount-container">
              <div className="discount-alert">{props.productDiscount}%</div>
              <del>Rp{priceFormatting(props.productPrice)},-</del>
            </div>
          ) : (
            ""
          )}

          <div className="price-container">
            <p id="price" className="card-text">
              Rp
              {priceFormatting(
                Math.floor(
                  (props.productPrice * (100 - props.productDiscount)) / 100
                )
              )}
              ,-
            </p>
            <p id="details" className="card-text">
              Click for detail
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThumbnailCard;
