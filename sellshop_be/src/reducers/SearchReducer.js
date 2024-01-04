import axios from "axios";

const initialState = {
  category: "",
  brand: "",
  keyword: "",
  minPrice: 0,
  maxPrice: 30000000,
  searchResults: [],
  page: 1,
  amount: 0,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
        page: 1,
      };
    case "SET_BRAND":
      return {
        ...state,
        brand: action.payload,
        page: 1,
      };
    case "SET_KEYWORD":
      return {
        ...state,
        keyword: action.payload,
        page: 1,
      };
    case "SET_MIN_PRICE":
      return {
        ...state,
        minPrice: action.payload,
        page: 1,
      };
    case "SET_MAX_PRICE":
      return {
        ...state,
        maxPrice: action.payload,
        page: 1,
      };
    case "SEARCH_PRODUCTS":
      return {
        ...state,
        searchResults: action.payload.list,
        amount: action.payload.total,
      };
    case "SET_PAGE_PRODUCT":
      return {
        ...state,
        page: action.payload,
      };
    case "SET_AMOUNT_PRODUCT":
      return {
        ...state,
        amount: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
