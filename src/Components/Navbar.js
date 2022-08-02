import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import logo from "../assets/logo.png";
import "../Components/Navbar.css";
import 'font-awesome/css/font-awesome.min.css';

export default function Navbar() {
  const [toggle,setToggle]=useState(false)
  const [screenWidth,setScreenWidth]=useState(window.innerWidth)

  useEffect(() => {
    const changeWidth=()=>{
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize',changeWidth)
  }, []);

  return (
    <header>
      <Link to="/">
        <img alt="logo"className="logo" src={logo}></img>
      </Link>
      <nav>
        {(toggle||screenWidth>500)&&(
          <ul className="list">  
          <Link to="/">
            <li 
            onClick={()=>{
              setToggle(!toggle)
            }}
            className="items">Home</li>
          </Link>
          <Link to="/Grocery">
            <li 
            onClick={()=>{
              setToggle(!toggle)
            }}
            className="items">Grocery</li>
          </Link>
        </ul>
        )} 
        <button className="btn">
          <i className="fa fa-bars"
          onClick={()=>{
            setToggle(!toggle)
          }}
          aria-hidden="true"></i>
        </button>
      </nav>
    </header>
  );
}
