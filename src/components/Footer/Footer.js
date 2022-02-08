import React from "react";
import "./Footer.css";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-top-content-container">
          <div className="footer-feedback-container">
            <h4>Give us feedback!</h4>

            <form className="form-feedback" action="">
              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control" id="emailInput" />
              </div>

              <div className="mb-3">
                <label htmlFor="messageInput" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="messageInput"
                  cols="60"
                  rows="5"
                ></textarea>
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>

          <div className="footer-social-container">
            <h4>Follow us!</h4>

            <div className="footer-social-icons">
              <div className="footer-social">
                <div className="footer-social-icon">
                  <BsFacebook size={25} />
                </div>

                <a href="/" onClick={(e) => e.preventDefault()}>
                  Buana Store
                </a>
              </div>

              <div className="footer-social">
                <div className="footer-social-icon">
                  <BsInstagram size={25} />
                </div>

                <a href="/" onClick={(e) => e.preventDefault()}>
                  buana_store
                </a>
              </div>

              <div className="footer-social">
                <div className="footer-social-icon">
                  <BsTwitter size={25} />
                </div>

                <a href="/" onClick={(e) => e.preventDefault()}>
                  @buana_store
                </a>
              </div>

              <div className="footer-social">
                <div className="footer-social-icon">
                  <BsGithub size={25} />
                </div>

                <a href="https://github.com/bhaktibuana" target="_blank" rel="noopener noreferrer">
                  bhaktibuana
                </a>
              </div>
            </div>
          </div>

          <div className="footer-logo-container">
            <img
              src={require("../../img/img-logo-2.png")}
              alt=""
              className="footer-logo"
            />
            <h4>Buana Store</h4>
          </div>
        </div>

        <div className="footer-copyright-container">
          <p>© 2022, Buana Store</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
