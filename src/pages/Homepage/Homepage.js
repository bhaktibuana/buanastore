import React, { useState, useEffect } from "react";
import HomepageContent from "../../components/HomepageContent/HomepageContent";
import "./Homepage.css";
import { apiURL } from "../../api/apiURL";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const Homepage = (props) => {
  const [productName, setProductName] = useState("All Products");
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [filterItem, setFilterItem] = useState("All");
  const [searchState, setSearchState] = useState(false);
  const [searchString, setSearchString] = useState("");

  const storeObj = {
    page: "homepage",
    productName,
    setProductName,
    sidebarStatus,
    setSidebarStatus,
    currentPageNumber,
    setCurrentPageNumber,
    filterItem,
    setFilterItem,
    setSearchState,
    searchState,
    setSearchString,
    searchString,
  };

  return (
    <>
      <div className="homepage-container">
        <Sidebar storeObj={storeObj} />
        <Navbar storeObj={storeObj} />
        <HomepageContent storeObj={storeObj} apiURL={apiURL} />
      </div>

      <div className="homepage-footer">
        <Footer />
      </div>
    </>
  );
};

export default Homepage;
