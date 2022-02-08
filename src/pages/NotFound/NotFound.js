import React from "react";
import "./NotFound.css";
import { BsEmojiDizzy } from "react-icons/bs";

const NotFound = () => {
  return (
    <>
      <div className="not-found-container">
        <p className="tag-404">404</p>
        <h1>Oops!</h1>
        <h1>Page not found</h1>
        <br />
        <BsEmojiDizzy size={100} />
      </div>
    </>
  );
};

export default NotFound;
