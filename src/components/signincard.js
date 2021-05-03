import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

import { makeAPICall } from "../utils/AxiosUtils";
import "./styles.css";
import { LOGIN_USER } from "../redux/actions/UserActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { isTokenPresent, setTokens } from "../utils/AuthUtils";

function SignInCard(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(true);

  const signInAPI = async () => {
    const response = await makeAPICall(
      "POST",
      "/users/login",
      {
        email,
        password,
      }
    );

    if (response.status === 200) {
      if (response.data.success) {
        setTokens(response.data.token)
        dispatch({ type: LOGIN_USER, payload: response.data.message });
        history.push("/dashboard");
      } else {
        setError(response.data.message);
        NotificationManager.warning(response.data.message, "Warning", 1000);
      }
    } else {
      NotificationManager.error("Unable to Sign in", "Warning", 1000);
    }
  };

  const validate = () => {
    let err;
    if (email === "" || password === "") {
      NotificationManager.warning("Fill all required details", "Warning", 1000);
      err = "Fill all required details";
      setError(err);
      return false;
    } else {
      return true;
    }
  };

  const handleSignIn = () => {
    if (validate()) {
      signInAPI();
    }
  };

  return (
    <div className="signupContainer">
      <div className="mb-3 row">
        <label
          for="inputPassword"
          className="col-sm-4 col-form-label buttonText"
        >
          Email
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            id="email "
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="mb-3 row">
        <label
          for="inputPassword"
          className="col-sm-4 col-form-label buttonText "
        >
          Password
        </label>
        <div className="col-sm-8">
          <input
            type={showPassword ? "password" : "text"}
            className="form-control"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          {showPassword && (
            <span
              onClick={() => {
                setShowPassword(false);
              }}
            >
              <i class="fa fa-eye"></i> {"Show"}
            </span>
          )}
          {!showPassword && (
            <span
              onClick={() => {
                setShowPassword(true);
              }}
            >
              <i class="fa fa-eye-slash"></i> {"Hide"}
            </span>
          )}
        </div>
      </div>
      {error !== "" && <span className="flexRow errorText">{error}</span>}
      <div className="flexRow">
        <button
          type="button"
          className="btn btn-secondary "
          onClick={() => {
            handleSignIn();
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignInCard;
