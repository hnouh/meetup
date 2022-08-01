import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import logo from "../assets/logo.png";
import "../Components/Navbar.css";
export default function Navbar() {
  useEffect(() => {

  }, []);

  return (
    <header>
      <Link to="/">
        <img alt="logo"className="logo" src={logo}></img>
      </Link>
      <nav>
        <ul className="list">  
          <Link to="/">
            <li className="items">Home</li>
          </Link>
          <Link to="/Grocery">
            <li className="items">Grocery</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
