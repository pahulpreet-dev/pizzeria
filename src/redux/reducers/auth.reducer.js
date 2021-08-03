import { SET_USER } from "../actions/actionTypes";

const initState = {
  isAuthentic: false,
  user: {},
};

export const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthentic: action.payload ? true : false,
        user: action.payload,
      };
    default:
      return state;
  }
};
