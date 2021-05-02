import React, { useEffect, useState } from "react";

import "./styles.css";
import Signupcard from "../components/signupcard";
import SiginCard from "../components/signincard";
import AppBar from "../components/AppBar";

function Login(props) {
  const [isSignup, setSignUp] = useState(true);
  useEffect(() => {
    console.log(props.cartoon);
  });

  return (
    <div>
      <div>
        <AppBar></AppBar>
      </div>
      <div className="container loginContainer">
        {!isSignup && (
          <div>
            <Signupcard ></Signupcard>
            <span
              className="buttonText"
              onClick={() => {
                setSignUp(true);
              }}
            >
              Already have an account ?
            </span>
          </div>
        )}
        {isSignup && (
          <div>
            <SiginCard></SiginCard>
            <span
              className="buttonText"
              onClick={() => {
                setSignUp(false);
              }}
            >
              Create an account ?
            </span>
          </div>
        )}

      </div>
    </div>
  );
}

export default Login;
