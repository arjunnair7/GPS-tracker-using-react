import React from "react";

import { Link } from "react-router-dom";
import profileImg from "./user_pic.png";
import "./TopNav.css";

const TopNav = () => {
  return (
    <div className="top__nav">
      <div className="top__nav-wrapper">
        <div className="search__box">
          <input type="text" placeholder="search or type" />
          <span>
            <i class="ri-search-line"></i>
          </span>
        </div>
        <div className="top__nav-right">
          <span className="notification">
            <i class="ri-notification-3-line"></i>
            <span className="badge">1</span>
          </span>
          <div className="profile">
            <Link to={`/`}>
              <img src={profileImg} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;