import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Homepage.css";

const Homepage = () => {
  const [productName, setProductName] = useState("All Products");
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [getProducts, setGetProducts] = useState({});
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [filterItem, setFilterItem] = useState("All");

  const storeObj = {
    page: "homepage",
    productName,
    setProductName,
    sidebarStatus,
    setSidebarStatus,
    getProducts,
    currentPageNumber,
    setCurrentPageNumber,
    filterItem,
    setFilterItem,
  };

  return (
    <>
      <div className="homepage-container">
        <Sidebar storeObj={storeObj} />
        <Navbar storeObj={storeObj} />
      </div>

      <div className="homepage-footer"></div>
    </>
  );
};

export default Homepage;
