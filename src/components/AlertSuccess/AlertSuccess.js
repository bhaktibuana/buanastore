import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

const AlertSuccess = () => {
  const [alertShow, setAlertShow] = useState(true);

  if (alertShow) {
    return (
      <>
        <Alert variant="success" onClose={() => setAlertShow(false)} dismissible>
          🎉<strong>Happy New Year!</strong>🎉 Enjoy shopping with{" "}
          <strong>30% off</strong> until 31-January-2022!
        </Alert>
      </>
    );
  }

  return <></>;
};

export default AlertSuccess;
