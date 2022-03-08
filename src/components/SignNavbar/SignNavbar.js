import React, { useState } from "react";
import "./SignNavbar.css";
import { Navigate } from "react-router-dom";
import { BsList } from "react-icons/bs";

const SignNavbar = (props) => {
  const [navigateTarget, setNavigateTarget] = useState("");

  return (
    <>
      {navigateTarget}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <div className="sign-navbar-content">
            <div className="sign-navbar-title-container">
              <div className="sign-navbar-title">
                <a href="/">
                  <div className="sign-navbar-logo">
                    <img
                      src={require("../../img/img-logo-1.png")}
                      alt="navbar-logo"
                    />
                  </div>

                  <p>BUANA STORE</p>
                </a>

                <div id="title-line" className="sign-navbar-title-line"></div>
              </div>

              <div id="small-display" className="sign-navbar-item-right">
                <button
                  id="list-icon"
                  className="icon"
                  onClick={() => props.storeObj.setSidebarStatus(true)}
                >
                  <BsList size={18} />
                </button>

                <div className="sign-navbar-title-line"></div>

                {props.storeObj.page === "signin" ? (
                  <button
                    className="text-signup"
                    onClick={() => setNavigateTarget(<Navigate to="/signup" />)}
                  >
                    Sign Up
                  </button>
                ) : (
                  <button
                    className="text-signin"
                    onClick={() => setNavigateTarget(<Navigate to="/signin" />)}
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>

            <div className="sign-navbar-item-left">
              <button
                className="sign-navbar-button-item-left"
                onClick={() => setNavigateTarget(<Navigate to="/" />)}
              >
                <span>Store</span>
              </button>

              <button
                className="sign-navbar-button-item-left"
                onClick={() => setNavigateTarget(<Navigate to="/about" />)}
              >
                <span>About</span>
              </button>
            </div>

            <div id="large-display" className="sign-navbar-item-right">
              <button
                id="list-icon"
                className="icon"
                onClick={() => props.storeObj.setSidebarStatus(true)}
              >
                <BsList size={18} />
              </button>

              <div id="list-icon" className="sign-navbar-title-line"></div>

              {props.storeObj.page === "signin" ? (
                <button
                  className="text-signup"
                  onClick={() => setNavigateTarget(<Navigate to="/signup" />)}
                >
                  Sign Up
                </button>
              ) : (
                <button
                  className="text-signin"
                  onClick={() => setNavigateTarget(<Navigate to="/signin" />)}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SignNavbar;
