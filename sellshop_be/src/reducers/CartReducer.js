const initialState = {
  cartItems: [],
  isSelected: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "DELETE_CART_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            !(
              item.productId._id === action.payload.productId &&
              item.sku === action.payload.sku
            ),
        ),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productId._id === action.payload.productId &&
          item.sku === action.payload.sku
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.productId._id === action.payload.productId &&
            item.sku === action.payload.sku
              ? { ...item, quantity: Math.max(0, item.quantity - 1) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case "SELECT_PRODUCT":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productId._id === action.payload.productId &&
          item.sku === action.payload.sku
            ? { ...item, isSelected: !item.isSelected }
            : item,
        ),
      };
    case "SELECT_ALL_PRODUCT":
      return {
        ...state,
        cartItems: state.cartItems.map((item) => ({
          ...item,
          isSelected: action.payload,
        })),
      };
    case "DELETE_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => !item.isSelected),
      };
    default:
      return state;
  }
};
export default cartReducer;
