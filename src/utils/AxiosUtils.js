import axios from 'axios';

export const makeAPICall = async (method, URL, data, headers) => {
  const config = {
    method: method,
    url: URL,
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
