import { SET_USER } from "./actionTypes";

//login action
export const loginUser = (userPayload) => {
  return {
    type: SET_USER,
    payload: userPayload,
  };
};

//logout action
export const logoutUser = () => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  return {
    type: SET_USER,
    payload: {},
  };
};
