import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { apiURL } from "./api/apiURL";
import NotFound from "./pages/NotFound/NotFound";
import Homepage from "./pages/Homepage/Homepage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="*" element={<NotFound />} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
