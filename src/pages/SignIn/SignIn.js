import React, { useState } from "react";
import SignInContent from "../../components/SignInContent/SignInContent";
import SignNavbar from "../../components/SignNavbar/SignNavbar";
import SignSidebar from "../../components/SignSidebar/SignSidebar";
import "./SignIn.css";

const SignIn = (props) => {
  const [sidebarStatus, setSidebarStatus] = useState(false);

  const storeObj = {
    page: "signin",
    sidebarStatus,
    setSidebarStatus,
  };

  return (
    <>
      <div className="signin-container">
        <SignSidebar storeObj={storeObj} />
        <SignNavbar storeObj={storeObj} />
        <SignInContent apiURL={props.apiURL} />
      </div>

      <div className="signin-footer">
        <p>© 2022, Buana Store</p>
      </div>
    </>
  );
};

export default SignIn;
