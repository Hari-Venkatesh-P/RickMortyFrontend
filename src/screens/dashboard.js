import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Cartooncard from "../components/cartooncard";
import NavBar from "../components/navbar";
import { makeAPICall } from "../utils/AxiosUtils";
import { SET_CARTOONS } from "../redux/actions/CartoonActions";
import "./styles.css";
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(true);
  const dashboardCartoons = useSelector(
    (state) => state.cartoon.dashboardCartoons
  );

  const getCartoonDetails = async () => {
    setLoading(true);
    const response = await makeAPICall("GET", `/cartoons/${pageNo}`);
    setLoading(false);
    if (response.status === 200 && response.data.success) {
      dispatch({ type: SET_CARTOONS, payload: response.data.message });
    } else {
      NotificationManager.error("Unable to fetch cartoons", "Warning", 1000);
    }
  };

  useEffect(() => {
    getCartoonDetails();
  }, [pageNo]);

  const renderDashboardCartoons = () => {
    return dashboardCartoons.map((cartoon) => {
      return <Cartooncard cartoon={cartoon}></Cartooncard>;
    });
  };

  const handlePagination = (str) => {
    if (str == "back" && pageNo!==1) {
      setPageNo(pageNo - 1);
    } else if (str == "next" && pageNo!== 34) {
      setPageNo(pageNo + 1);
    }
  };

  return (
    <div>
      <div style={{ position: "fixed", width: "100%" }}>
        <NavBar></NavBar>
      </div>
      {!loading && (
        <React.Fragment>
          <div className="container">
            <div className="dashboard-card-container">
              {renderDashboardCartoons()}
            </div>

            <div className="paginationContainer">
              <button
                type="button"
                className="btn btn-secondary btn-sm buttonText"
                onClick={() => {
                  handlePagination("back");
                }}
              >
                <i className="fa fa-backward fa-sm" color="black">
                  &nbsp; Back
                </i>
              </button>

              <span className="buttonText">
                &nbsp; {pageNo + " of 34"} &nbsp;
              </span>

              <button
                type="button"
                className="btn btn-secondary btn-sm buttonText"
                onClick={() => {
                  handlePagination("next");
                }}
              >
                Next &nbsp;
                <i color="black" className="fa fa-forward fa-sm "></i>
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
      {loading && (
        <div className="flexRowCenter" style={{ paddingTop: "20%" }}>
          <ScaleLoader color={"black"} loading={true} size={150} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
