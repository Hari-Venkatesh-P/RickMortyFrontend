import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import ReactTooltip from "react-tooltip";
import { GoogleLogin } from "react-google-login";

import { makeAPICall } from "../utils/AxiosUtils";
import "./styles.css";
const dotenv = require("dotenv");
dotenv.config();

function Signup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {});

  const signUpAPI = async () => {
    const response = await makeAPICall("POST", "/users/create", {
      name,
      email,
      password,
    });
    if (response.status === 200) {
      if (response.data.success) {
        NotificationManager.success("Account created", "Success", 1000);
        // props.toggle()
      } else {
        setError(response.data.message);
        NotificationManager.warning(response.data.message, "Warning", 1000);
      }
    } else {
      NotificationManager.error("Unable to create account", "Warning", 1000);
    }
  };

  const validate = () => {
    let err = "";
    let emailPattern = new RegExp(
      "^[a-z0-9._%+-]+@[a-z0-9.-]+[.]{1}[a-z]{2,3}"
    );
    let passwordPattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,12}$"
    );
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === ""
    ) {
      NotificationManager.warning("Fill all required details", "Warning", 1000);
      err = "Fill all required details";
    } else if (!emailPattern.test(email)) {
      NotificationManager.warning("Invalid Mail format", "Warning", 1000);
      err = "Invalid Mail format";
    } else if (!passwordPattern.test(password)) {
      NotificationManager.warning("Invalid Password format", "Warning", 1000);
      err = "Invalid Password Format";
    } else if (password !== passwordConfirm) {
      err = "Passwords does'nt match";
      NotificationManager.warning("Passwords does'nt match", "Warning", 1000);
    }
    setError(err);
    if (err === "") {
      return true;
    } else {
      return false;
    }
  };

  const handleSignUp = () => {
    if (validate()) {
      signUpAPI();
    }
  };

  const onSuccessResponseGoogle = (response) => {
    let details;
    if (response.profileObj) {
      details = response.profileObj;
      setName(details.name);
      setEmail(details.email);
      console.log("googled");
    } else {
      NotificationManager.warning(
        "Unable to sign up with Google",
        "Warning",
        1000
      );
    }
  };

  const onFailureResponseGoogle = (response) => {
    NotificationManager.warning(
      "Unable to sign up with Google",
      "Warning",
      1000
    );
  };

  return (
    <div className="signupContainer">
      <div className="mb-3 row">
        <label
          for="inputPassword"
          className="col-sm-4 col-form-label buttonText"
        >
          Name
        </label>
        <div className="col-sm-8">
          <input
            value={name}
            type="text"
            className="form-control"
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="name"
          ></input>
        </div>
      </div>
      <div className="mb-3 row">
        <label
          for="inputPassword"
          className="col-sm-4 col-form-label buttonText"
        >
          Email
        </label>
        <div className="col-sm-8">
          <input
            value={email}
            type="text"
            className="form-control"
            id="email"
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
          <span className="flexColumnSB">
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
            <span>
              <p
                style={{ cursor: "pointer" }}
                data-tip={
                  "6 to 12 characters ,  one upper case letter ,one lower case letter and one numeric digit"
                }
              >
                {"Password Terms"}
              </p>
              <ReactTooltip multiline={true} delayUpdate={1000} />
            </span>
          </span>
        </div>
      </div>
      <div className="mb-3 row">
        <label
          for="inputPassword"
          className="col-sm-4 col-form-label buttonText"
        >
          Confirm Password
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            id="passwordCOnfirm"
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          ></input>
        </div>
      </div>
      {error !== "" && <span className="flexRow errorText">{error}</span>}
      <div className="signupButtonContainer">
        <button
          style={{ width: "100%", marginBottom: "5%" }}
          type="button"
          className="btn btn-secondary "
          onClick={() => {
            handleSignUp();
          }}
        >
          Create an account
        </button>

        <span>
          <GoogleLogin
            clientId= {process.env.REACT_APP_GOOGLE_CLIENT_SECRET}//"393599926777-5q541vhi9mchrcgbmh8otbn65n5sfb99.apps.googleusercontent.com"
            buttonText="Sign up with Google"
            onSuccess={onSuccessResponseGoogle}
            onFailure={onFailureResponseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </span>
      </div>
    </div>
  );
}

export default Signup;
