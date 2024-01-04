const initialState = {
  orderItems: [],
  isSelected: [],
};
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ORDER_ITEMS":
      return {
        ...state,
        orderItems: action.payload,
      };
    default:
      return state;
  }
};
export default orderReducer;
