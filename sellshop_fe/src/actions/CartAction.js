import axios from "axios";
import { useDispatch } from "react-redux";

export const cartItems = (Items) => ({
  type: "CART_ITEMS",
  payload: Items,
});

export const useGetCartItems = () => {
  const dispatch = useDispatch();

  const getCartItems = async (userId) => {
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:3030/cart/${userId}`,
        );
        if (response.status === 200) {
          const cartItem = response.data.data?.items || [];
          dispatch(cartItems(cartItem));
        }
      } catch (err) {
        console.error("Lỗi khi lấy các mục giỏ hàng:", err);
        // Xử lý lỗi nếu cần thiết
      }
    }
  };

  return getCartItems;
};

export const selectAllItems = (selectAll) => ({
  type: "SELECT_ALL_PRODUCT",
  payload: selectAll,
});

export const deleteCart = (selectAll) => ({
  type: "DELETE_CART",
  payload: selectAll,
});

export const deleteCartItem = (productId, sku) => ({
  type: "DELETE_CART_ITEM",
  payload: { productId, sku },
});

export const increaseQuantity = (productId, sku) => ({
  type: "INCREASE_QUANTITY",
  payload: { productId, sku },
});

export const decreaseQuantity = (productId, sku) => ({
  type: "DECREASE_QUANTITY",
  payload: { productId, sku },
});

export const selectProduct = (productId, sku) => ({
  type: "SELECT_PRODUCT",
  payload: { productId, sku },
});
