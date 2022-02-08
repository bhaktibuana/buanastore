import React, { useState } from "react";
import "./Sidebar.css";
import { Navigate } from "react-router-dom";
import {
  BsFillBagCheckFill,
  BsFillInboxesFill,
  BsFillInfoCircleFill,
  BsXLg,
} from "react-icons/bs";

const Sidebar = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [navigateTarget, setNavigateTarget] = useState("");

  const dropdownHandler = () => {
    setDropdown(!dropdown);
  };

  const sidebarStatusHandler = () => {
    props.storeObj.setSidebarStatus(!props.storeObj.sidebarStatus);
  };

  return (
    <>
      {navigateTarget}
      {props.storeObj.sidebarStatus ? (
        <div className="sidebar-modal" onClick={sidebarStatusHandler}></div>
      ) : (
        ""
      )}
      <div
        className={props.storeObj.sidebarStatus ? "sidebar-active" : "sidebar"}
      >
        <button className="modal-close" onClick={sidebarStatusHandler}>
          <BsXLg />
        </button>
        <div className="sidebar-container">
          <div className="sidebar-title">
            <a href="/">
              <div className="sidebar-logo">
                <img
                  className="image-sidebar-logo"
                  src={require("../../img/img-logo-1.png")}
                  alt=""
                />
              </div>
              <p>BUANA STORE</p>
            </a>

            <div className="sidebar-title-line"></div>
          </div>

          <div className="sidebar-items-container">
            <button
              className={
                props.storeObj.page === "homepage"
                  ? "sidebar-item-selected"
                  : "sidebar-item"
              }
              onClick={() => {
                if (props.storeObj.page === "homepage") {
                  window.location.reload();
                } else {
                  setNavigateTarget(<Navigate to="/" />);
                }
              }}
            >
              <div className="sidebar-item-content">
                <div
                  className={
                    props.storeObj.page === "homepage"
                      ? "sidebar-item-icon-selected"
                      : "sidebar-item-icon"
                  }
                >
                  <BsFillBagCheckFill size={16} />
                </div>

                <p
                  className={
                    props.storeObj.page === "homepage"
                      ? "sidebar-item-text-selected"
                      : "sidebar-item-text"
                  }
                >
                  Store
                </p>
              </div>
            </button>

            {props.storeObj.page !== "about" ? (
              <>
                <button
                  className={
                    dropdown ? "sidebar-item-selected" : "sidebar-item"
                  }
                  onClick={dropdownHandler}
                >
                  <div className="sidebar-item-content">
                    <div
                      className={
                        dropdown
                          ? "sidebar-item-icon-selected"
                          : "sidebar-item-icon"
                      }
                    >
                      <BsFillInboxesFill size={16} />
                    </div>

                    <p
                      className={
                        dropdown
                          ? "sidebar-item-text-selected"
                          : "sidebar-item-text"
                      }
                    >
                      Products
                    </p>
                  </div>
                </button>

                <div className="dopdown-container">
                  <button
                    className={
                      !dropdown ? "dropdown-item-active" : "dropdown-item"
                    }
                    onClick={() => {
                      props.storeObj.setProductName("All Products");
                      dropdownHandler();
                      props.storeObj.setFilterItem("All");
                      props.storeObj.setCurrentPageNumber(1);
                    }}
                  >
                    <p
                      className={
                        !dropdown
                          ? "dropdown-item-text-active"
                          : "dropdown-item-text"
                      }
                    >
                      All Products
                    </p>
                  </button>

                  <button
                    className={
                      !dropdown ? "dropdown-item-active" : "dropdown-item"
                    }
                    onClick={() => {
                      props.storeObj.setProductName("Shirt");
                      dropdownHandler();
                      props.storeObj.setFilterItem("All");
                      props.storeObj.setCurrentPageNumber(1);
                    }}
                  >
                    <p
                      className={
                        !dropdown
                          ? "dropdown-item-text-active"
                          : "dropdown-item-text"
                      }
                    >
                      Shirt
                    </p>
                  </button>

                  <button
                    className={
                      !dropdown ? "dropdown-item-active" : "dropdown-item"
                    }
                    onClick={() => {
                      props.storeObj.setProductName("Hoodie");
                      dropdownHandler();
                      props.storeObj.setFilterItem("All");
                      props.storeObj.setCurrentPageNumber(1);
                    }}
                  >
                    <p
                      className={
                        !dropdown
                          ? "dropdown-item-text-active"
                          : "dropdown-item-text"
                      }
                    >
                      Hoodie
                    </p>
                  </button>

                  <button
                    className={
                      !dropdown ? "dropdown-item-active" : "dropdown-item"
                    }
                    onClick={() => {
                      props.storeObj.setProductName("Shorts");
                      dropdownHandler();
                      props.storeObj.setFilterItem("All");
                      props.storeObj.setCurrentPageNumber(1);
                    }}
                  >
                    <p
                      className={
                        !dropdown
                          ? "dropdown-item-text-active"
                          : "dropdown-item-text"
                      }
                    >
                      Shorts
                    </p>
                  </button>
                </div>
              </>
            ) : (
              ""
            )}

            <button
              className={
                props.storeObj.page === "about"
                  ? "sidebar-item-selected"
                  : "sidebar-item"
              }
              onClick={() => {
                if (props.storeObj.page === "about") {
                  window.location.reload();
                } else {
                  setNavigateTarget(<Navigate to="/about" />);
                }
              }}
            >
              <div className="sidebar-item-content">
                <div
                  className={
                    props.storeObj.page === "about"
                      ? "sidebar-item-icon-selected"
                      : "sidebar-item-icon"
                  }
                >
                  <BsFillInfoCircleFill size={16} />
                </div>

                <p
                  className={
                    props.storeObj.page === "about"
                      ? "sidebar-item-text-selected"
                      : "sidebar-item-text"
                  }
                >
                  About
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
