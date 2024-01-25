import React from 'react';
import './App.css'
const Navbar = ({ handleTabChange }) => {

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.png" alt="Logo" width="150" height="50" />
      </div>
      <div className="nav-buttons justify-center mx-5 my-2">
        <button className="nav-btn px-4" onClick={() => handleTabChange("form")}>
          Form
        </button>
        <button className="nav-btn px-4" onClick={() => handleTabChange("table")}>
          Table
        </button>
      </div>
    </div>
  );
};

export default Navbar;

