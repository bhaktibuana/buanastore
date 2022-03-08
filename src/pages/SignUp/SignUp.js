import React, { useState } from "react";
import "./SignUp.css";
import SignNavbar from "../../components/SignNavbar/SignNavbar";
import SignSidebar from "../../components/SignSidebar/SignSidebar";
import SignUpContent from "../../components/SignUpContent/SignUpContent";

const SignUp = (props) => {
  const [sidebarStatus, setSidebarStatus] = useState(false);

  const storeObj = {
    page: "signup",
    sidebarStatus,
    setSidebarStatus,
  };

  return (
    <>
      <div className="signin-container">
        <SignSidebar storeObj={storeObj} />
        <SignNavbar storeObj={storeObj} />
        <SignUpContent apiURL={props.apiURL} />
      </div>

      <div className="signin-footer">
        <p>© 2022, Buana Store</p>
      </div>
    </>
  );
};

export default SignUp;
