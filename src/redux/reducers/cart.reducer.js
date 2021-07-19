import { ADD_TO_ORDER, GET_CART } from "../actions/actionTypes";

const initialState = JSON.parse(localStorage.getItem("cartOrder"));

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_ORDER:
      const add_order = {
        ...state,
        itemNames: [action.payload.itemName, ...state.itemNames],
        itemPrices: [action.payload.itemPrice, ...state.itemPrices],
        itemQuantities: [action.payload.itemQuantity, ...state.itemQuantities],
        itemSizes: [action.payload.itemSize, ...state.itemSizes],
        itemTotalPrices: [action.payload.totalPrice, ...state.itemTotalPrices],
      };

      return localStorage.setItem("cartOrder", JSON.stringify(add_order));
    case GET_CART:
      return { state };
    default:
      return state;
  }
};
