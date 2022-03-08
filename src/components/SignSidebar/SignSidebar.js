import React, { useState } from "react";
import "./SignSidebar.css";
import { Navigate } from "react-router-dom";
import {
  BsFillBagCheckFill,
  BsFillInfoCircleFill,
  BsXLg,
} from "react-icons/bs";

const SignSidebar = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [navigateTarget, setNavigateTarget] = useState("");

  const sidebarStatusHandler = () => {
    props.storeObj.setSidebarStatus(!props.storeObj.sidebarStatus);
  };

  return (
    <>
      {navigateTarget}
      {props.storeObj.sidebarStatus ? (
        <div
          className="sign-sidebar-modal"
          onClick={sidebarStatusHandler}
        ></div>
      ) : (
        <></>
      )}

      <div
        className={
          props.storeObj.sidebarStatus ? "sign-sidebar-active" : "sign-sidebar"
        }
      >
        <button className="modal-close" onClick={sidebarStatusHandler}>
          <BsXLg />
        </button>

        <div className="sign-sidebar-container">
          <div className="sign-sidebar-title">
            <a href="/">
              <div className="sign-sidebar-logo">
                <img
                  src={require("../../img/img-logo-1.png")}
                  alt=""
                  className="sign-image-sidebar-logo"
                />
              </div>

              <p>BUANA STORE</p>
            </a>

            <div className="sign-sidebar-title-line"></div>
          </div>

          <div className="sign-sidebar-items-container">
            <button
              className="sign-sidebar-item"
              onClick={() => setNavigateTarget(<Navigate to="/" />)}
            >
              <div className="sign-sidebar-item-content">
                <div className="sign-sidebar-item-icon">
                  <BsFillBagCheckFill size={16} />
                </div>

                <p className="sign-sidebar-item-text">
                  Store
                </p>
              </div>
            </button>

            <button
              className="sign-sidebar-item"
              onClick={() => setNavigateTarget(<Navigate to="/about" />)}
            >
              <div className="sign-sidebar-item-content">
                <div className="sign-sidebar-item-icon">
                  <BsFillInfoCircleFill size={16} />
                </div>

                <p className="sign-sidebar-item-text">
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

export default SignSidebar;
