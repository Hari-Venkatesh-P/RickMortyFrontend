import {
  SET_CARTOONS,
  ADD_NEW_CARTOON,
  SET_USER_CARTOONS,
  DELETE_CARTOON,
  RESET_CARTOONS,
} from "../actions/CartoonActions";

const initialState = {
  userCartoons: [],
  dashboardCartoons: [],
};

export const cartoonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CARTOONS:
      return { ...state, dashboardCartoons: action.payload };
    case SET_USER_CARTOONS:
      return { ...state, userCartoons: action.payload };
    case ADD_NEW_CARTOON:
      return {
        ...state,
        userCartoons: [action.payload, ...state.userCartoons],
      };
    case DELETE_CARTOON: {
      return {
        ...state,
        userCartoons: state.userCartoons.filter(
          (cartoon) => cartoon.cartoonId !== action.payload.id
        ),
      };
    }
    case RESET_CARTOONS:
      return { ...state, userCartoons: [], dashboardCartoons: [] };
    default:
      return state;
  }
};
