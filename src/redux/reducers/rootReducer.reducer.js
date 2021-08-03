import { combineReducers } from "redux";
import { CartReducer } from "./cart.reducer";
import { AuthReducer } from "./auth.reducer";

export default combineReducers({
  AuthReducer,
  CartReducer,
});
