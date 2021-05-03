import axios from 'axios';

export const makeAPICall = async (method, URL, data, headers) => {
  const config = {
    method: method,
    url: "http://localhost:4000" + URL,
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
