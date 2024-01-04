import axios from "axios";
import { useDispatch } from "react-redux";

export const orderItems = (Items) => ({
  type: "ORDER_ITEMS",
  payload: Items,
});

export const useGetOrderItems = () => {
  const dispatch = useDispatch();

  const getOrderItems = async (userId) => {
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:3030/cart/${userId}`,
        );
        if (response.status === 200) {
          const orderItem = response.data.data?.items || [];
          dispatch(orderItems(orderItem));
        }
      } catch (err) {
        console.error("Lỗi khi lấy các mục giỏ hàng:", err);
        // Xử lý lỗi nếu cần thiết
      }
    }
  };

  return getOrderItems;
};
