import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import ScaleLoader from "react-spinners/ScaleLoader";

import Cartooncard from "../components/cartooncard";
import NavBar from "../components/navbar";
import { makeAPICall } from "../utils/AxiosUtils";
import { SET_USER_CARTOONS } from "../redux/actions/CartoonActions";
import "./styles.css";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const userCartoons = useSelector((state) => state.cartoon.userCartoons);
  const userDetails = useSelector((state) => state.user.userDetails);

  const getUserCartoonDetails = async () => {
    const response = await makeAPICall(
      "GET",
      "/cartoons/user/" + userDetails._id
    );
    setLoading(false);
    if (response.status === 200 && response.data.success) {
      let cartoons = response.data.message.reverse();
      dispatch({ type: SET_USER_CARTOONS, payload: cartoons });
    } else {
      NotificationManager.error("Unable to fetch cartoons", "Warning", 1000);
    }
  };

  useEffect(() => {
    getUserCartoonDetails();
  }, [userDetails._id]);

  const renderuserCartoons = () => {
    return userCartoons.map((cartoon) => {
      return <Cartooncard cartoon={cartoon}></Cartooncard>;
    });
  };

  return (
    <div>
      <div id="top">
        <NavBar></NavBar>
      </div>
      <div className="container profileContainer">
        <span className="noCartoonLabels">
          {"Welcome , " + userDetails.name}
        </span>
        <button
          type="button btn-sm buttonText"
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i className="fa fa-user fa-sm" color="black">
            &nbsp; Profile
          </i>
        </button>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Your Details
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="row">
                  <span className="col-md-4 buttonText">Name :</span>
                  <span className="col-md-8">{userDetails.name}</span>
                </div>
                <div className="row">
                  <span className="col-md-4 buttonText">Email :</span>
                  <span className="col-md-8">{userDetails.email}</span>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="flexRowCenter" style={{ paddingTop: "20%" }}>
          <ScaleLoader color={"black"} loading={true} size={150} />
        </div>
      )}
      {!loading && (
        <React.Fragment>
          <div className="container">
            <div className="dashboard-card-container">
              {renderuserCartoons()}
            </div>
          </div>
          <div className="flexRowCenter">
            {userCartoons.length === 0 && (
              <span className="noCartoonLabels">No Cartoons</span>
            )}
          </div>
          {!userCartoons.length === 0 && (
            <div className="paginationContainer">
              <button
                type="button"
                className="btn btn-secondary btn-sm buttonText"
              >
                <i className="fa fa-arrow-up fa-sm buttonText" color="black">
                  &nbsp;
                </i>
                <a
                  className="buttonText"
                  href="#top"
                  style={{ color: "black" }}
                >
                  Go to top
                </a>
              </button>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Home;
