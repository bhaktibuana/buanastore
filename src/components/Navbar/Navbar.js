import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Navigate } from "react-router-dom";
import {
  BsSearch,
  BsCartCheckFill,
  BsFillHeartFill,
  BsList,
  BsFillPersonFill,
} from "react-icons/bs";
import ListModal from "../ListModal/ListModal";

const Navbar = (props) => {
  const [navigateTarget, setNavigateTarget] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const sidebarStatusHandler = () => {
    props.storeObj.setSidebarStatus(!props.storeObj.sidebarStatus);
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      props.storeObj.setSearchState(true);
      props.storeObj.setProductName("All Products");
      props.storeObj.setFilterItem("All");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsLogin(false);
    setIsLogout(true);
  };

  const showModalHandler = (title) => {
    setModalTitle(title);
    setShowModal(true);
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsLogin(true);
    } else {
      if (sessionStorage.getItem("token") !== null) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isLogout) {
      window.location.reload();
    }
  }, [isLogout]);

  return (
    <>
      {navigateTarget}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <div className="navbar-content">
            <div className="navbar-title-container">
              <div className="navbar-title">
                <a href="/">
                  <div className="navbar-logo">
                    <img
                      src={require("../../img/img-logo-1.png")}
                      alt="navbar-logo"
                    />
                  </div>

                  <p>BUANA STORE</p>
                </a>

                <div id="title-line" className="navbar-title-line"></div>
              </div>

              <div
                id="small-display"
                className="navbar-item-right"
              >
                <button className="icon" onClick={() => showModalHandler("Cart")}>
                  <BsCartCheckFill size={18} />
                </button>

                <button
                  id="wishlist"
                  className="icon"
                  onClick={() => showModalHandler("Wishlist")}
                >
                  <BsFillHeartFill size={18} />
                </button>

                <button
                  id="list-icon"
                  className="icon"
                  onClick={sidebarStatusHandler}
                >
                  <BsList size={18} />
                </button>

                <div className="navbar-title-line"></div>

                {isLogin ? (
                  <>
                    <button className="icon" id="user-icon-small">
                      <BsFillPersonFill size={18} />
                    </button>

                    <div className="navbar-user-small-dropdown-container">
                      <div className="navbar-user-small-dropdown">
                        <button onClick={logoutHandler}>Log out</button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      className="text"
                      onClick={() =>
                        setNavigateTarget(<Navigate to="/signin" />)
                      }
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="navbar-item-left">
              <button
                className="navbar-button-item-left"
                onClick={() => {
                  if (props.storeObj.page === "homepage") {
                    window.location.reload();
                  } else {
                    setNavigateTarget(<Navigate to="/" />);
                  }
                }}
              >
                <span>Store</span>
              </button>

              {props.storeObj.page === "homepage" ? (
                <button
                  id="products-button"
                  className="navbar-button-item-left"
                >
                  <span>Products</span>

                  <div className="navbar-products-dropdown-container">
                    <div className="navbar-products-dropdown">
                      <button
                        onClick={() => {
                          props.storeObj.setProductName("All Products");
                          props.storeObj.setFilterItem("All");
                          props.storeObj.setSearchState(false);
                          props.storeObj.setCurrentPageNumber(1);
                        }}
                      >
                        All Products
                      </button>

                      <button
                        onClick={() => {
                          props.storeObj.setProductName("T-Shirts");
                          props.storeObj.setFilterItem("All");
                          props.storeObj.setSearchState(false);
                          props.storeObj.setCurrentPageNumber(1);
                        }}
                      >
                        T-Shirts
                      </button>

                      <button
                        onClick={() => {
                          props.storeObj.setProductName("Hoodie");
                          props.storeObj.setFilterItem("All");
                          props.storeObj.setSearchState(false);
                          props.storeObj.setCurrentPageNumber(1);
                        }}
                      >
                        Hoodie
                      </button>

                      <button
                        onClick={() => {
                          props.storeObj.setProductName("Shorts");
                          props.storeObj.setFilterItem("All");
                          props.storeObj.setSearchState(false);
                          props.storeObj.setCurrentPageNumber(1);
                        }}
                      >
                        Shorts
                      </button>
                    </div>
                  </div>
                </button>
              ) : (
                <></>
              )}

              <button
                className="navbar-button-item-left"
                onClick={() => {
                  if (props.storeObj.page === "about") {
                    window.location.reload();
                  } else {
                    setNavigateTarget(<Navigate to="/about" />);
                  }
                }}
              >
                <span>About</span>
              </button>
            </div>

            <div className="navbar-search">
              <input
                type="text"
                placeholder="Search here.."
                onKeyDown={keyDownHandler}
                onChange={(e) => {
                  props.storeObj.setSearchString(e.target.value);
                  props.storeObj.setSearchState(false);
                }}
              />

              <div className="navbar-search-icon">
                <button
                  onClick={() => {
                    props.storeObj.setSearchState(true);
                    props.storeObj.setProductName("All Products");
                    props.storeObj.setFilterItem("All");
                  }}
                >
                  <BsSearch />
                </button>
              </div>
            </div>

            <div id="large-display" className="navbar-item-right">
              <button className="icon" onClick={() => showModalHandler("Cart")}>
                <BsCartCheckFill size={18} />
              </button>

              <button
                id="wishlist"
                className="icon"
                onClick={() => showModalHandler("Wishlist")}
              >
                <BsFillHeartFill size={18} />
              </button>

              <button
                id="list-icon"
                className="icon"
                onClick={sidebarStatusHandler}
              >
                <BsList size={18} />
              </button>

              <div className="navbar-title-line"></div>

              {isLogin ? (
                <>
                  <button className="icon" id="user-icon-large">
                    <BsFillPersonFill size={18} />
                  </button>

                  <div className="navbar-user-dropdown-container">
                    <div className="navbar-user-dropdown">
                      <button onClick={logoutHandler}>Log out</button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="text"
                    onClick={() => setNavigateTarget(<Navigate to="/signin" />)}
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <ListModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setModalTitle("");
        }}
        modalTitle={modalTitle}
        apiURL={props.apiURL}
      />
    </>
  );
};

export default Navbar;
