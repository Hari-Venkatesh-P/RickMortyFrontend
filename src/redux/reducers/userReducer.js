import { LOGOUT_USER, LOGIN_USER  } from "../actions/UserActions";

const initialState = {
  userDetails: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, userDetails: action.payload };
    case LOGOUT_USER:
      return { ...state, userDetails: {} };
    default:
      return state;
  }
};
