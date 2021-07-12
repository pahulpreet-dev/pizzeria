export const ADD_TO_ORDER = "ADD_TO_ORDER";
export const CartAction = (order) => (dispatch) => {
  dispatch({
    type: ADD_TO_ORDER,
    payload: order,
  });
};
