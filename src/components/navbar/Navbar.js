import React, { useState } from "react";
import "./Navbar.css";

import { Outlet, Link } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { IoCloseSharp } from "react-icons/io5";
import Carticon from "../carticon/Carticon";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import logo from "../../assests/logo.png";

function Navbar() {
  const [menu, setMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  function handleMenuClick() {
    setMenu(!menu);
  }

  function handleClick() {}

  function handleLogin() {
    navigate("/login");
  }

  async function handleLogout() {
    await auth.signOut();
    navigate("/");
  }

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo}></img>
        </div>

        <div className="navbar-links">
          <ul
            className={menu ? "navbar-options-active" : "navbar-options"}
            onClick={menu ? handleMenuClick : handleClick}
          >
            <li className="nav-item">
              <Link to="/" className="nav-links">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/shop" className="nav-links">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-links">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contactus" className="nav-links">
                Contact
              </Link>
            </li>

            <div className="navbar-login-section">
              <div
                className="navbar-login-btn"
                onClick={user ? handleLogout : handleLogin}
              >
                {user ? "Logout" : "Login"}
              </div>
            </div>

            {/* {user ? (
              <li className="nav-item">
                <Link to="/login" className="nav-links">
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/" className="nav-links">
                  Logout
                </Link>
              </li>
            )} */}
          </ul>

          <div className="cart-icon">
            <Link to="/cart">
              <Carticon />
            </Link>
          </div>
          <div className="menu-icon" onClick={handleMenuClick}>
            {/* for small screens */}
            {menu ? <IoCloseSharp fontSize={32} /> : <ImMenu fontSize={32} />}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
