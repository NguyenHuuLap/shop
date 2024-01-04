import axios from "axios";

export const setCategory = (category) => ({
  type: "SET_CATEGORY",
  payload: category,
});

export const setBrand = (brand) => ({
  type: "SET_BRAND",
  payload: brand,
});

export const setKeyword = (keyword) => ({
  type: "SET_KEYWORD",
  payload: keyword,
});

export const setMinPrice = (minPrice) => ({
  type: "SET_MIN_PRICE",
  payload: minPrice,
});

export const setMaxPrice = (maxPrice) => ({
  type: "SET_MAX_PRICE",
  payload: maxPrice,
});

export const setPage = (page) => ({
  type: "SET_PAGE_PRODUCT",
  payload: page,
});

export const setAmoutProduct = (amount) => ({
  type: "SET_AMOUNT_PRODUCT",
  payload: amount,
});

// export const searchProducts = (minPrice, maxPrice, category, brand, keyword) => ({
//   type: 'SEARCH_PRODUCTS',
//   payload: { minPrice, maxPrice, category, brand, keyword }
// });

export const searchProducts = (
  minPrice,
  maxPrice,
  category,
  brand,
  keyword,
  page = 1,
) => {
  return (dispatch) => {
    axios
      .get(
        `http://localhost:3030/product/search?minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&brand=${brand}&keyword=${
          keyword === "" ? "" : encodeURIComponent(keyword)
        }&page=${page}`,
      )
      .then((response) => {
        dispatch({
          type: "SEARCH_PRODUCTS",
          payload: response.data,
        });
      });
  };
};
