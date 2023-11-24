// import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../componentstyles/home.css";

const Home = () => {
  const navigate = useNavigate();


 

  const redirectToRegister = () => {
    navigate("/register");
    window.location.reload(); // Reload the page
  };

 

  
  const redirectToLogin = () => {
    navigate('/login');
    window.location.reload(); // Reload the page

  };
  return (
    <div className="nav">
      <div className="">
        <div className="login-inner">
        <div className="loginresponse3" >Welcome to TO DO LIST application</div>

         
          <div className="button">
          <button onClick={redirectToLogin} className="login-button">
          Login
           </button>

            <button onClick={redirectToRegister} className="register">
              Register
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
