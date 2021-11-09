/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./mainhomepage.css";

const Mainhomepage = (props) => {
  useEffect(() => {
    localStorage.setItem("toggle", false);
  }, []);

  return (
    <>
      <div className="mainHomePage">
        <div className="innerHomePage">
          <div
            className="HomePageCard"
            onClick={() => props.history.replace("/login:agency")}
          >
            <span className="leftHomePageBorder"></span>
            <p>Login</p>
          </div>
          <div
            className="HomePageCard"
            onClick={() => props.history.replace("/register:agency")}
          >
            <span className="leftHomePageBorder"></span>
            <p>Sign Up</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mainhomepage;
