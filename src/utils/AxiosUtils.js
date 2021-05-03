import axios from "axios";
import authUtils from "./AuthUtils";

const dotenv = require("dotenv");
dotenv.config();

export const makeAPICall = async (method, URL, data) => {
  let headers = {};
  if (authUtils.getToken() !== "") {
    headers = {
      authorization: authUtils.getToken(),
    };
  }
  const config = {
    method: method,
    url: process.env.REACT_APP_API_URL + URL,
    data: {
      ...data,
    },
    headers: {
      ...headers,
    },
  };
  let response = await axios(config);
  return response;
};
