import React, { useEffect, useState } from "react";
import "./styles.css";

function AppBar(props) {
  useEffect(() => {
  });

  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
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
        </div>
      </nav>
    </div>
  );
}

export default AppBar;
