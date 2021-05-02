import { combineReducers, createStore } from "redux";

import { cartoonReducer } from "./reducers/cartoonreducer";
import { userReducer } from "./reducers/userReducer";


const rootReducer = combineReducers({
  cartoon: cartoonReducer,
  user:userReducer
});

const store = createStore(rootReducer);

export default store;

