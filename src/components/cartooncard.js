import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./styles.css";

function Cartooncard(props) {
  const location = useLocation();

  useEffect(() => {
    // console.log(props.cartoon);
  });

  const getTrimmedValue = (str) => {
    const value = str.split(" ");
    return value[0];
  };

  const isDashBoardLocation = () => {
    if (location.pathname.includes("/dashboard")) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div className="cardContainer">
        <div>
          <img src={props.cartoon.image} alt="..." className="cardImage" />
        </div>

        <div className="cardBody">
          <div className="flexRow">
            <span className="nameStyle">
              {getTrimmedValue(props.cartoon.name)}{" "}
            </span>
            <span className="flexColumn">
              <span>
                <i
                  className="fa fa-circle fa-xs"
                  style={{
                    color:
                      props.cartoon.status === "Alive"
                        ? "lightgreen"
                        : props.cartoon.status === "Dead"
                        ? "#cf5b5b"
                        : "#363232",
                  }}
                ></i>
                &nbsp;
              </span>
              <span className="statusText">
                {`${props.cartoon.status} - ${props.cartoon.species}`}
              </span>
            </span>
          </div>
          <div className="flexRow">
            <span className="cardTextTitle">Last known location:</span>
            <span className="cardTextValue">
              {getTrimmedValue(props.cartoon.location.name)}
            </span>
          </div>
          <div className="flexRow">
            <span className="cardTextTitle">First seen in : </span>
            <span className="cardTextValue">
              {getTrimmedValue(props.cartoon.origin.name)}
            </span>
          </div>
          <span className="flexColumn">
            {isDashBoardLocation() && (
              <button type="button" className="btn btn-light btn-sm">
                <span className="buttonText">Get it</span>
              </button>
            )}
            {!isDashBoardLocation() && (
              <button type="button" className="btn btn-light btn-sm">
                <span className="buttonText">Remove</span>
              </button>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Cartooncard;
