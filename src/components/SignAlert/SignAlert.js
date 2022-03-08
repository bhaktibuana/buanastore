import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

const SignAlert = (props) => {
  const [alertShow, setAlertShow] = useState(true);

  if (alertShow) {
    return (
      <>
        <Alert
          variant={props.variant}
          onClose={() => {
            setAlertShow(false);
            props.setShowAlert(false);
          }}
          dismissible
        >
          {props.message}
        </Alert>
      </>
    );
  }
};

export default SignAlert;
