import React, { useState } from "react";
import AboutContent from "../../components/AboutContent/AboutContent";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./About.css";

const About = (props) => {
  const [productName, setProductName] = useState("All Products");
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [filterItem, setFilterItem] = useState("All");

  const storeObj = {
    page: "about",
    productName,
    setProductName,
    sidebarStatus,
    setSidebarStatus,
    currentPageNumber,
    setCurrentPageNumber,
    filterItem,
    setFilterItem,
  };

  return (
    <>
      <div className="about-container">
        <Sidebar storeObj={storeObj} />
        <Navbar storeObj={storeObj} />
        <AboutContent />
      </div>

      <div className="about-footer">
        <Footer />
      </div>
    </>
  );
};

export default About;
