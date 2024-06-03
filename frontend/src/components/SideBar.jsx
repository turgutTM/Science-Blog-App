import React, { useState } from "react";
import "../css/sidebar.css";
import logo from "../images/einstein_883032.png";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TiThList } from "react-icons/ti";
import { GiPirateCaptain } from "react-icons/gi";
import { Link } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";

const SideBar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-components">
        <div className="sidebar-logo">
          <Link to="/dashboard">
            <img src={logo}></img>
          </Link>
        </div>
        <div className="sidebar-icons">
          <Link to="allscientists">
            <TiThList style={{ cursor: "pointer", color: "black" }} />
          </Link>
          <Link to="/dashboard/admin">
            <RiAdminLine style={{ cursor: "pointer", color: "black" }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
