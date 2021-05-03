import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import "./styles.css";

import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { makeAPICall } from "../utils/AxiosUtils";
import { ADD_NEW_CARTOON, DELETE_CARTOON } from "../redux/actions/CartoonActions";
import { isTokenPresent } from "../utils/AuthUtils";
function Cartooncard(props) {

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(props.cartoon);
  });

  const userDetails = useSelector(
    (state) => state.user.userDetails
  );

  const addCartoonAPI = async (reqBody) => {
    const response = await makeAPICall(
      "POST",
      "/cartoons",
      reqBody
    );
    if (response.status === 200) {
      if (response.data.success) {
        dispatch({ type: ADD_NEW_CARTOON, payload:reqBody });
        NotificationManager.success("Cartoon Addedd", "Success", 1000);
      } else {
        NotificationManager.warning(response.data.message, "Warning", 1000);
      }
    } else {
      NotificationManager.error("Unable to add cartoon", "Warning", 1000);
    }
  }

  const handleAddCartoon = () => {
    if(isTokenPresent() && userDetails._id){
      const reqBody = {
        userId : userDetails._id,
        cartoonId:props.cartoon.id,
        name:props.cartoon.name,
        status : props.cartoon.status,
        species : props.cartoon.species,
        origin : props.cartoon.origin,
        location : props.cartoon.location,
        image:props.cartoon.image,
      }
      addCartoonAPI(reqBody)
    }else{
      history.push("/");
      NotificationManager.warning("Kindly login to continue", "Warning", 1000);
    }
  }

  const deleteCartoonAPI = async (userId,cartoonId) => {
    const response = await makeAPICall(
      "DELETE",
      `/cartoons/${userId}/${cartoonId}`,
    );
    if (response.status === 200) {
      if (response.data.success) {
        dispatch({ type: DELETE_CARTOON, payload:{id:cartoonId} });
        NotificationManager.success("Cartoon removed", "Success", 1000);
      } else {
        NotificationManager.warning(response.data.message, "Warning", 1000);
      }
    } else {
      NotificationManager.error("Unable to delete cartoon", "Warning", 1000);
    }
  }

  const handleDeleteCartoon = () => {
    if(userDetails._id){
      deleteCartoonAPI( userDetails._id,props.cartoon.cartoonId )
    }else{
      history.push("/");
      NotificationManager.warning("Kindly login to continue", "Warning", 1000);
    }
  }

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
              <button type="button" className="btn btn-light btn-sm" onClick={() => handleAddCartoon()}>
                <span className="buttonText">Get it</span>
              </button>
            )}
            {!isDashBoardLocation() && (
              <button type="button" className="btn btn-light btn-sm"  onClick={() => handleDeleteCartoon()}  >
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
