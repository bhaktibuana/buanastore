import React, { useState, useEffect } from "react";
import "./SignInContent.css";
import axios from "axios";
import SignAlert from "../SignAlert/SignAlert";
import * as Validator from "validatorjs";
import SignSpinner from "../SignSpinner/SignSpinner";
import { Navigate } from "react-router-dom";

const SignInContent = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [spinnerState, setSpinnerState] = useState(false);
  const [isNavigate, setIsNavigate] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    const rules = {
      email: "required|email",
      password: "required|min:8|string",
    };

    const validation = new Validator(data, rules);

    if (validation.passes()) {
      setShowEmailError(false);
      setShowPasswordError(false);
      setShowErrorAlert(false);

      try {
        setSpinnerState(true);

        await axios
          .post(props.apiURL.urlSignin, {
            email: email,
            password: password,
          })
          .then((res) => {
            setSpinnerState(false);
            setRememberMe(false);
            setEmail("");
            setPassword("");

            if (rememberMe === true) {
              localStorage.setItem("token", res.data.data.token);
            } else {
              sessionStorage.setItem("token", res.data.data.token);
            }

            setIsNavigate(true);
          })
          .catch((err) => {
            setSpinnerState(false);

            if (typeof err.response.data.message === "string") {
              setAlertMessage(err.response.data.message);
              setShowErrorAlert(true);
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      const errorMsg = validation.errors.all();

      if (errorMsg.email) {
        setEmailMessage(errorMsg.email);
        setShowEmailError(true);
      } else {
        setShowEmailError(false);
      }

      if (errorMsg.password) {
        setPasswordMessage(errorMsg.password);
        setShowPasswordError(true);
      } else {
        setShowPasswordError(false);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsNavigate(true);
    } else {
      if (sessionStorage.getItem("token") !== null) {
        setIsNavigate(true);
      } else {
        setIsNavigate(false);
      }
    }
  }, []);

  return (
    <>
      {isNavigate ? <Navigate to="/" /> : null}
      <div className="signin-content-container">
        <div className="signin-background-container">
          <img src={require("../../img/img-sign-bg.jpg")} alt="sign-bg" />
        </div>

        <div className="signin-card-container">
          <div className="signin-card">
            <p>Sign in and enjoy your shopping</p>

            {showErrorAlert ? (
              <>
                <SignAlert
                  variant="danger"
                  message={alertMessage}
                  setShowAlert={setShowErrorAlert}
                />
              </>
            ) : (
              <></>
            )}

            {spinnerState ? (
              <>
                <SignSpinner text="Authenticate..." />
              </>
            ) : (
              <>
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Input email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />

                    {showEmailError ? (
                      <p className="error-message">{emailMessage}</p>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Input password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />

                    {showPasswordError ? (
                      <p className="error-message">{passwordMessage}</p>
                    ) : null}
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remember_me"
                      onChange={(e) => {
                        setRememberMe(e.target.checked);
                      }}
                    />

                    <label className="form-check-label" htmlFor="remember_me">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn container-fluid btn-primary"
                    onClick={loginHandler}
                  >
                    Login
                  </button>
                </form>
              </>
            )}

            <p className="card-footer-text">
              Don't have account yet? <a href="/signup">Sign up here</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInContent;
