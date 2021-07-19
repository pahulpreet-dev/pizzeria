import { ADD_TO_ORDER, GET_CART } from "./actionTypes";

//add to order
export const cartAction = (order) => (dispatch) => {
  dispatch({
    type: ADD_TO_ORDER,
    payload: order,
  });
};

//get from cart
export const getCartAction = () => (dispatch) => {
  dispatch({
    type: GET_CART,
  });
};
