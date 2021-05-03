import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { RESET_CARTOONS } from "../redux/actions/CartoonActions";
import { LOGOUT_USER } from "../redux/actions/UserActions";
import { isTokenPresent } from "../utils/AuthUtils";
import "./styles.css";

function Navbar(props) {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);

  const isDashBoardLocation = () => {
    if (location.pathname.includes("/dashboard")) {
      return true;
    } else {
      return false;
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    dispatch({ type: RESET_CARTOONS, payload: {} });
    dispatch({ type: LOGOUT_USER, payload: {} });
    console.log(storeData);
    history.push("/");
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* , position:'fixed' */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a style={{ cursor: "pointer" }}
            className="navbar-brand"
            onClick={() => {
              history.push("/");
            }}
          >
            <span
              style={{
                fontFamily: "Roboto Slab",
                fontWeight: "bolder",
                fontSize: "25px",
              }}
            >
              Rick and Morty
            </span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {!isDashBoardLocation() && (
                <li className="nav-item" style={{ cursor: "pointer" }}>
                  <a
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => {
                      history.push("/dashboard");
                    }}
                  >
                    <span className="labelText">Dashboard</span>
                  </a>
                </li>
              )}
              {isTokenPresent() && isDashBoardLocation() && (
                <li className="nav-item" style={{ cursor: "pointer" }}>
                  <a
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => {
                      history.push("/home");
                    }}
                  >
                    <span className="labelText">Home</span>
                  </a>
                </li>
              )}
              {isTokenPresent() && (
                <li className="nav-item" style={{ cursor: "pointer" }}>
                  <a
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    <span className="labelText">Logout</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
