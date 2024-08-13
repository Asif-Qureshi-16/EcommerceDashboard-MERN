import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Login from "./Login";
import { IoMdLogOut } from "react-icons/io";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
      <img className="logoimg" src="data:image/png;base64,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" alt="logo" />
      {auth ? (
        <ul className="nav">
          <li>
            <Link to="/">Product</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              <IoMdLogOut/> {JSON.parse(auth).name}
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
