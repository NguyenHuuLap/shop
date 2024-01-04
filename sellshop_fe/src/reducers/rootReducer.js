import { combineReducers } from "redux";
import userReducer from "./UserReducer.js";
import cartReducer from "./CartReducer.js";
import searchReducer from "./SearchReducer.js";
import orderReducer from "./OrderReducer.js";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  search: searchReducer,
  order: orderReducer,
});

export default rootReducer;
