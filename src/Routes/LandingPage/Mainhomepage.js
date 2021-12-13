/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./mainhomepage.css";
import cookie from "react-cookies";

const Mainhomepage = (props) => {
  console.log(props);
  const auth = cookie.load("Authorization");
  const role = localStorage.getItem('role');

  if (props.history.action === 'POP') {
    console.log(props.history.action);
    // props.history.push('/');
    window.location.href = 'https://sourcebae.com/';
  }

  useEffect(() => {
    localStorage.setItem("toggle", false);
  }, []);

  useEffect(() => {
    if (auth !== null && auth !== undefined) {
      props.history.replace(`/login:${role}`)
    }
  }, [])


  return (
    <>
      {!auth ?
        <div className="mainHomePage">
          <div className="innerHomePage">
            <div className="HomePageCard" onClick={() => props.history.push("/login:agency")}>
              <span className="leftHomePageBorder"></span>
              <p>Login</p>
            </div>
            <div className="HomePageCard" onClick={() => props.history.push("/register:agency")}>
              <span className="leftHomePageBorder"></span>
              <p>Sign Up</p>
            </div>
          </div>
        </div>
        :
        null
      }
    </>
  );
};

export default Mainhomepage;
