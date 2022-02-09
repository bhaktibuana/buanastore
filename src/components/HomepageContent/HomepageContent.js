import React, { useState, useEffect } from "react";
import "./HomepageContent.css";
import axios from "axios";
import AlertSuccess from "../AlertSuccess/AlertSuccess";
import StoreCarousel from "../StoreCarousel/StoreCarousel";
import ThumbnailCard from "../ThumbnailCard/ThumbnailCard";
import ProductDetails from "../ProductDetails/ProductDetails";
import ProductSpinner from "../ProductSpinner/ProductSpinner";
import ProductNotFound from "../ProductNotFound/ProductNotFound";
import {
  BsFillFunnelFill,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

const HomepageContent = (props) => {
  const [totalProducts, setTotalProducts] = useState(null);
  const [products, setProducts] = useState(null);
  const [itemSelectedCode, setItemSelectedCode] = useState(null);
  const [productDetailState, setProductDetailState] = useState(false);
  const [productDetailObject, setProductDetailObject] = useState(null);
  const [pageNumberLength, setPageNumberLength] = useState(null);
  const [pageNumberView, setPageNumberView] = useState(null);
  const [showStartPage, setShowStartPage] = useState(false);
  const [showEndPage, setShowEndPage] = useState(false);
  const [productSpinnerState, setProductSpinnerState] = useState(false);
  const [modalSpinnerState, setModalSpinnerState] = useState(false);

  const fetchTotalProducts = async () => {
    try {
      setProductSpinnerState(true);

      await axios.get(props.apiURL.urlProductCountAll).then((res) => {
        setTotalProducts(res.data[0].total);

        if (res.data[0].total % 10 === 0) {
          setPageNumberLength(Math.floor(res.data[0].total / 10));
          pageNumberViewHandler(Math.floor(res.data[0].total / 10));
        } else {
          setPageNumberLength(Math.floor(res.data[0].total / 10) + 1);
          pageNumberViewHandler(Math.floor(res.data[0].total / 10) + 1);
        }

        setProductSpinnerState(false);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalProductsCategory = async () => {
    try {
      setProductSpinnerState(true);

      if (props.storeObj.filterItem === "All") {
        await axios
          .get(props.apiURL.urlProductCountCategory, {
            params: {
              key1: props.storeObj.productName,
            },
          })
          .then((res) => {
            setTotalProducts(res.data[0].total);

            if (res.data[0].total % 10 === 0) {
              setPageNumberLength(Math.floor(res.data[0].total / 10));
              pageNumberViewHandler(Math.floor(res.data[0].total / 10));
            } else {
              setPageNumberLength(Math.floor(res.data[0].total / 10) + 1);
              pageNumberViewHandler(Math.floor(res.data[0].total / 10) + 1);
            }

            setProductSpinnerState(false);
          });
      } else {
        await axios
          .get(props.apiURL.urlProductCountCategory, {
            params: {
              key1: props.storeObj.productName,
              key2: props.storeObj.filterItem,
            },
          })
          .then((res) => {
            setTotalProducts(res.data[0].total);

            if (res.data[0].total % 10 === 0) {
              setPageNumberLength(Math.floor(res.data[0].total / 10));
              pageNumberViewHandler(Math.floor(res.data[0].total / 10));
            } else {
              setPageNumberLength(Math.floor(res.data[0].total / 10) + 1);
              pageNumberViewHandler(Math.floor(res.data[0].total / 10) + 1);
            }

            setProductSpinnerState(false);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalProductsSearch = async () => {
    try {
      setProductSpinnerState(true);

      await axios
        .get(props.apiURL.urlProductCountCategory, {
          params: searchStrHandler(props.storeObj.searchString),
        })
        .then((res) => {
          setTotalProducts(res.data[0].total);

          if (res.data[0].total % 10 === 0) {
            setPageNumberLength(Math.floor(res.data[0].total / 10));
            pageNumberViewHandler(Math.floor(res.data[0].total / 10));
          } else {
            setPageNumberLength(Math.floor(res.data[0].total / 10) + 1);
            pageNumberViewHandler(Math.floor(res.data[0].total / 10) + 1);
          }

          setProductSpinnerState(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchProducts = async (pgNumber) => {
    const pageNumber = (pgNumber - 1) * 10;

    try {
      setProductSpinnerState(true);

      await axios
        .get(props.apiURL.urlProductThumbnail + `${pageNumber}`)
        .then((res) => {
          setProducts(
            res.data.map((item) => {
              return (
                <ThumbnailCard
                  productName={item.product_name}
                  productCode={item.code}
                  productDiscount={item.discount_value}
                  productPrice={item.price}
                  setProductDetailState={setProductDetailState}
                  setItemSelectedCode={setItemSelectedCode}
                />
              );
            })
          );

          setProductSpinnerState(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchProductsCategory = async (pgNumber) => {
    const pageNumber = (pgNumber - 1) * 10;

    try {
      setProductSpinnerState(true);

      if (props.storeObj.filterItem === "All") {
        await axios
          .get(props.apiURL.urlProductThumbnailCategory + `${pageNumber}`, {
            params: {
              key1: props.storeObj.productName,
            },
          })
          .then((res) => {
            setProducts(
              res.data.map((item) => {
                return (
                  <ThumbnailCard
                    productName={item.product_name}
                    productCode={item.code}
                    productDiscount={item.discount_value}
                    productPrice={item.price}
                    setProductDetailState={setProductDetailState}
                    setItemSelectedCode={setItemSelectedCode}
                  />
                );
              })
            );

            setProductSpinnerState(false);
          });
      } else {
        await axios
          .get(props.apiURL.urlProductThumbnailCategory + `${pageNumber}`, {
            params: {
              key1: props.storeObj.productName,
              key2: props.storeObj.filterItem,
            },
          })
          .then((res) => {
            setProducts(
              res.data.map((item) => {
                return (
                  <ThumbnailCard
                    productName={item.product_name}
                    productCode={item.code}
                    productDiscount={item.discount_value}
                    productPrice={item.price}
                    setProductDetailState={setProductDetailState}
                    setItemSelectedCode={setItemSelectedCode}
                  />
                );
              })
            );

            setProductSpinnerState(false);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchProductsSearch = async (pgNumber) => {
    const pageNumber = (pgNumber - 1) * 10;

    try {
      setProductSpinnerState(true);

      await axios
        .get(props.apiURL.urlProductThumbnailCategory + `${pageNumber}`, {
          params: searchStrHandler(props.storeObj.searchString),
        })
        .then((res) => {
          setProducts(
            res.data.map((item) => {
              return (
                <ThumbnailCard
                  productName={item.product_name}
                  productCode={item.code}
                  productDiscount={item.discount_value}
                  productPrice={item.price}
                  setProductDetailState={setProductDetailState}
                  setItemSelectedCode={setItemSelectedCode}
                />
              );
            })
          );

          setProductSpinnerState(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchProductDetail = async () => {
    try {
      setModalSpinnerState(true);

      await axios
        .get(props.apiURL.urlProductDetail, {
          params: {
            code: itemSelectedCode,
          },
        })
        .then((res) => {
          setProductDetailObject(res.data);
          setModalSpinnerState(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const searchStrHandler = (string) => {
    const strToArr = string.split(" ");
    const resutlObj = {};

    for (let i = 0; i < strToArr.length; i++) {
      resutlObj[strToArr[i]] = strToArr[i];
    }

    return resutlObj;
  };

  // pagination logic
  const pageNumberViewHandler = (totalPageLength) => {
    const tempArray = [];
    const totalPage = totalPageLength;
    const currentPage = props.storeObj.currentPageNumber;
    let startPage, endPage, diff;

    startPage = currentPage < 5 ? 1 : currentPage - 2;
    endPage = 4 + startPage;
    endPage = totalPage < endPage ? totalPage : endPage;
    diff = startPage - endPage + 4;
    startPage = startPage - (startPage - diff > 0 ? diff : 0);

    setShowStartPage(false);
    setShowEndPage(false);

    if (startPage > 1) {
      setShowStartPage(true);
    }

    for (let i = startPage; i <= endPage; i++) {
      tempArray.push(i);
    }

    setPageNumberView(
      tempArray.map((number) => {
        if (number === currentPage) {
          return (
            <>
              <button className="pagination-number-active">
                {props.storeObj.currentPageNumber}
              </button>
            </>
          );
        } else {
          return (
            <>
              <button
                className="pagination-number"
                onClick={() => {
                  props.storeObj.setCurrentPageNumber(number);
                }}
              >
                {number}
              </button>
            </>
          );
        }
      })
    );

    if (endPage < totalPage) {
      setShowEndPage(true);
    }
  };

  useEffect(() => {
    if (props.storeObj.searchState) {
      fetchTotalProductsSearch();

      if (totalProducts > 0) {
        fetchProductsSearch(props.storeObj.currentPageNumber);
      }
    } else if (
      props.storeObj.productName === "All Products" &&
      props.storeObj.filterItem === "All"
    ) {
      fetchTotalProducts();

      if (totalProducts > 0) {
        fetchProducts(props.storeObj.currentPageNumber);
      }
    } else {
      fetchTotalProductsCategory();

      if (totalProducts > 0) {
        fetchProductsCategory(props.storeObj.currentPageNumber);
      }
    }
  }, [
    totalProducts,
    props.storeObj.currentPageNumber,
    props.storeObj.productName,
    props.storeObj.filterItem,
    props.storeObj.searchState,
  ]);

  useEffect(() => {
    if (productDetailState === true) {
      fetchProductDetail();
    }
  }, [productDetailState]);

  return (
    <>
      {/* homepage carousel */}
      <div className="homepage-carousel-container">
        <StoreCarousel />
      </div>

      {/* homepage content start */}
      <div className="homepage-content-container">
        <div className="homepage-top-content-container">
          {/* homepage breadcrumb */}
          <nav aria-label="breadcrumb">
            {props.storeObj.filterItem === "All" ? (
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Store</a>
                </li>

                <li className="breadcrumb-item active">
                  {props.storeObj.productName}
                </li>
              </ol>
            ) : (
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Store</a>
                </li>

                <li className="breadcrumb-item">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      props.storeObj.setFilterItem("All");
                      props.storeObj.setCurrentPageNumber(1);
                    }}
                  >
                    {props.storeObj.productName}
                  </a>
                </li>

                <li className="breadcrumb-item active">
                  {props.storeObj.filterItem}
                </li>
              </ol>
            )}
          </nav>

          {/* homepage filter */}
          <div className="homepage-filter-container">
            <button className="homepage-filter">
              <BsFillFunnelFill />
              <p>{props.storeObj.filterItem}</p>
            </button>

            <div className="homepage-filter-dropdown-container">
              <div className="homepage-filter-dropdown">
                <button
                  className="filter-dropdown-item"
                  onClick={() => {
                    props.storeObj.setFilterItem("All");
                    props.storeObj.setSearchState(false);
                    props.storeObj.setCurrentPageNumber(1);
                  }}
                >
                  All
                </button>

                <button
                  className="filter-dropdown-item"
                  onClick={() => {
                    props.storeObj.setFilterItem("Male");
                    props.storeObj.setSearchState(false);
                    props.storeObj.setCurrentPageNumber(1);
                  }}
                >
                  Male
                </button>

                <button
                  className="filter-dropdown-item"
                  onClick={() => {
                    props.storeObj.setFilterItem("Female");
                    props.storeObj.setSearchState(false);
                    props.storeObj.setCurrentPageNumber(1);
                  }}
                >
                  Female
                </button>

                <button
                  className="filter-dropdown-item"
                  onClick={() => {
                    props.storeObj.setFilterItem("Unisex");
                    props.storeObj.setSearchState(false);
                    props.storeObj.setCurrentPageNumber(1);
                  }}
                >
                  Unisex
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* homepage alert */}
        <div className="homepage-alert-container">
          <AlertSuccess />
        </div>

        {productSpinnerState ? (
          <ProductSpinner />
        ) : (
          <>
            {totalProducts > 0 ? (
              <>
                {/* homepage thumbnail card */}
                <div className="homepage-thumbnail-card-container">
                  {products}
                </div>

                {/* homepage pagination */}
                <div className="homepage-pagination-container">
                  {props.storeObj.currentPageNumber === 1 ? (
                    <button className="pagination-arrow" disabled>
                      <BsChevronLeft />
                    </button>
                  ) : (
                    <button
                      className="pagination-arrow"
                      onClick={() => {
                        props.storeObj.setCurrentPageNumber(
                          props.storeObj.currentPageNumber - 1
                        );
                      }}
                    >
                      <BsChevronLeft />
                    </button>
                  )}

                  {showStartPage ? (
                    <>
                      <button
                        className="pagination-number"
                        onClick={() => {
                          props.storeObj.setCurrentPageNumber(1);
                        }}
                      >
                        1
                      </button>

                      <button className="pagination-number" disabled>
                        ...
                      </button>
                    </>
                  ) : (
                    <></>
                  )}

                  {pageNumberView}

                  {showEndPage ? (
                    <>
                      <button className="pagination-number" disabled>
                        ...
                      </button>

                      <button
                        className="pagination-number"
                        onClick={() => {
                          props.storeObj.setCurrentPageNumber(pageNumberLength);
                        }}
                      >
                        {pageNumberLength}
                      </button>
                    </>
                  ) : (
                    <></>
                  )}

                  {props.storeObj.currentPageNumber === pageNumberLength ? (
                    <button className="pagination-arrow" disabled>
                      <BsChevronRight />
                    </button>
                  ) : (
                    <button
                      className="pagination-arrow"
                      onClick={() => {
                        props.storeObj.setCurrentPageNumber(
                          props.storeObj.currentPageNumber + 1
                        );
                      }}
                    >
                      <BsChevronRight />
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <ProductNotFound />
              </>
            )}
          </>
        )}
      </div>

      {/* modal product detail */}
      <ProductDetails
        show={productDetailState}
        onHide={() => {
          setProductDetailState(false);
          setProductDetailObject(null);
          setItemSelectedCode(null);
        }}
        name={
          productDetailObject !== null
            ? productDetailObject[0].product_name
            : ""
        }
        description={
          productDetailObject !== null ? productDetailObject[0].description : ""
        }
        code={productDetailObject !== null ? productDetailObject[0].code : ""}
        price={productDetailObject !== null ? productDetailObject[0].price : ""}
        discount={
          productDetailObject !== null
            ? productDetailObject[0].discount_value
            : ""
        }
        productDetailObject={productDetailObject}
        modalSpinnerState={modalSpinnerState}
      />
    </>
  );
};

export default HomepageContent;
