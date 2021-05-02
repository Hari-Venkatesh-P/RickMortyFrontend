import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useHistory } from "react-router";
import ReactTooltip from "react-tooltip";
import { makeAPICall } from "../utils/AxiosUtils";

import "./styles.css";

function Signup(props) {

  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {});

  const signUpAPI = async () => {
    const response = await makeAPICall(
      "POST",
      "http://localhost:4000/users/create",
      {
        name,
        email,
        password
      }
    );
    if (response.status === 200) {
      if(response.data.success){
        NotificationManager.success("Account created", "Success", 1000);
        // props.toggle()
      }else {
        setError(response.data.message)
        NotificationManager.warning(response.data.message, "Warning", 1000);
      }
    }else {
      NotificationManager.error("Unable to create account", "Warning", 1000);
    }
  }



  const validate = () => {
    let err="";
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
    }  else if (!passwordPattern.test(password)) {
      NotificationManager.warning("Invalid Password format", "Warning", 1000);
      err = "Invalid Password Format";
    } else if (password !== passwordConfirm) {
      err = "Passwords does'nt match";
      NotificationManager.warning("Passwords does'nt match", "Warning", 1000);
    }
    setError(err);
    if(err===""){
      return true;
    }else {
      return false;
    }
  };

  const handleSignUp =  () => {
    if(validate()){
      signUpAPI()
    }
  }

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
      <div className="flexRow">
        <button
          type="button"
          className="btn btn-secondary "
          onClick={() => {
            handleSignUp();
          }}
        >
          Create an account
        </button>
      </div>
    </div>
  );
}

export default Signup;
