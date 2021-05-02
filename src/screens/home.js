import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cartooncard from "../components/cartooncard";
import NavBar from "../components/navbar";
import { makeAPICall } from "../utils/AxiosUtils";
import { SET_CARTOONS } from "../redux/actions/CartoonActions";
import "./styles.css";

const Home = () => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState("1");
  const dashboardCartoons = useSelector(
    (state) => state.cartoon.dashboardCartoons
  );

  const getCartoonDetails = async () => {
    const response = await makeAPICall(
      "GET",
      "http://localhost:4000/cartoons/1"
    );
    if (response.status === 200 && response.data.success) {
      dispatch({ type: SET_CARTOONS, payload: response.data.message });
    }
  };

  useEffect(() => {
    getCartoonDetails();
  }, []);

  const renderDashboardCartoons = () => {
    return dashboardCartoons.map((cartoon) => {
      return <Cartooncard cartoon={cartoon}></Cartooncard>;
    });
  };

  return (
    <div>
      <div>
        <NavBar></NavBar>
      </div>
      <div className="container">
        <div className="dashboard-card-container">
          {renderDashboardCartoons()}
        </div>
      </div>
    </div>
  );
};

export default Home;
