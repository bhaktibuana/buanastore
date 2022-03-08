import React, { useState } from "react";
import "./SignUpContent.css";
import axios from "axios";
import SignAlert from "../SignAlert/SignAlert";
import * as Validator from "validatorjs";
import SignSpinner from "../SignSpinner/SignSpinner";

const SignUpContent = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showFirstNameError, setShowFirstNameError] = useState(false);
  const [firstNameMessage, setFirstNameMessage] = useState("");
  const [showLastNameError, setShowLastNameError] = useState(false);
  const [lastNameMessage, setLastNameMessage] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [showPasswordConfirmationError, setShowPasswordConfirmationError] =
    useState(false);
  const [passwordConfirmationMessage, setPasswordConfirmationMessage] =
    useState("");
  const [spinnerState, setSpinnerState] = useState(false);

  const registerHandler = async (e) => {
    e.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    const rules = {
      first_name: "required",
      last_name: "required",
      email: "required|email",
      password: "required|min:8|string|confirmed",
      password_confirmation: "required|min:8|string",
    };

    const validation = new Validator(data, rules);

    if (validation.passes()) {
      setShowFirstNameError(false);
      setShowLastNameError(false);
      setShowEmailError(false);
      setShowPasswordError(false);
      setShowPasswordConfirmationError(false);
      setShowErrorAlert(false);
      setShowSuccessAlert(false);

      try {
        setSpinnerState(true);

        await axios
          .post(props.apiURL.urlSignup, {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
          })
          .then((res) => {
            setSpinnerState(false);
            setShowSuccessAlert(true);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setPasswordConfirmation("");
            setAlertMessage(res.data.message);
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

      if (errorMsg.first_name) {
        setFirstNameMessage(errorMsg.first_name);
        setShowFirstNameError(true);
      } else {
        setShowFirstNameError(false);
      }

      if (errorMsg.last_name) {
        setLastNameMessage(errorMsg.last_name);
        setShowLastNameError(true);
      } else {
        setShowLastNameError(false);
      }

      if (errorMsg.email) {
        setEmailMessage(errorMsg.email);
        setShowEmailError(true);
      } else {
        setShowEmailError(false);
      }

      if (errorMsg.password) {
        setPasswordMessage(errorMsg.password[0]);
        setShowPasswordError(true);
      } else {
        setShowPasswordError(false);
      }

      if (errorMsg.password_confirmation) {
        setPasswordConfirmationMessage(errorMsg.password_confirmation);
        setShowPasswordConfirmationError(true);
      } else {
        setShowPasswordConfirmationError(false);
      }
    }
  };

  return (
    <>
      <div className="signup-content-container">
        <div className="signup-background-container">
          <img src={require("../../img/img-sign-bg.jpg")} alt="sign-bg" />
        </div>

        <div className="signup-card-container">
          <div className="signup-card">
            <p>Create your account for free!</p>

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

            {showSuccessAlert ? (
              <>
                <SignAlert
                  variant="success"
                  message={alertMessage}
                  setShowAlert={setShowSuccessAlert}
                />
              </>
            ) : (
              <></>
            )}

            {spinnerState ? (
              <>
                <SignSpinner text="Creating your account..." />
              </>
            ) : (
              <>
                <form>
                  <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">
                      First Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      placeholder="Input first name"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />

                    {showFirstNameError ? (
                      <>
                        <p className="error-message">{firstNameMessage}</p>
                      </>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">
                      Last Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="last_name"
                      placeholder="Input last name"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />

                    {showLastNameError ? (
                      <>
                        <p className="error-message">{lastNameMessage}</p>
                      </>
                    ) : null}
                  </div>

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
                      <>
                        <p className="error-message">{emailMessage}</p>
                      </>
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
                      <>
                        <p className="error-message">{passwordMessage}</p>
                      </>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="password_confirmation"
                      className="form-label"
                    >
                      Password Confirmation
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      id="password_confirmation"
                      placeholder="Input password confirmation"
                      onChange={(e) => {
                        setPasswordConfirmation(e.target.value);
                      }}
                    />

                    {showPasswordConfirmationError ? (
                      <>
                        <p className="error-message">
                          {passwordConfirmationMessage}
                        </p>
                      </>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="btn container-fluid btn-primary"
                    onClick={registerHandler}
                  >
                    Register
                  </button>
                </form>

                <p className="card-footer-text">
                  Already have account? <a href="/signin">Sign in here</a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpContent;
