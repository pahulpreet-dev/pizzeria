import { ADD_TO_ORDER } from "../actions/actionTypes";

const initialState = {
  itemNames: [],
  itemPrices: [],
};

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_ORDER:
      return {
        ...state,
        itemNames: [action.payload.itemName, ...state.itemNames],
        itemPrices: [action.payload.itemPrice, ...state.itemPrices],
      };
    default:
      return state;
  }
};
