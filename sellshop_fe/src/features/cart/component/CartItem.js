import React from "react";
import {
  AddCircle,
  CheckCircle,
  Delete,
  RemoveCircle,
} from "@mui/icons-material";
import { Checkbox, Grid, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  deleteCartItem,
  increaseQuantity,
  selectProduct,
} from "../../../actions/CartAction.js";
import NumberFormat from "../../../utils/NumberFormat.jsx";

const CartItem = () => {
  const user = useSelector((state) => state.user.user);
  const items = useSelector((state) => state.cart.cartItems);
  const selectedItems = useSelector((state) => state.cart.isSelected);
  const dispatch = useDispatch();
  const handleDelete = async (productId, sku) => {
    try {
      const response = await axios.delete(
        `http://localhost:3030/cart/?userId=${user._id}&productId=${productId}&sku=${sku}`,
      );
      if (response.status === 200) {
        dispatch(deleteCartItem(productId, sku));
      } else {
        console.log("lỗi");
      }
    } catch (err) {
      console.log("ERR: ", err);
    }
  };

  const handleIncreaseQuantity = async (productId, sku) => {
    try {
      const response = await axios.patch("http://localhost:3030/cart/", {
        userId: user._id,
        productId: productId,
        sku: sku,
        delta: 1,
      });
      dispatch(increaseQuantity(productId, sku));
    } catch (err) {
      console.log("ERR: ", err);
    }
  };

  const handleDecreaseQuantity = async (productId, sku) => {
    try {
      const response = await axios.patch("http://localhost:3030/cart/", {
        userId: user._id,
        productId: productId,
        sku: sku,
        delta: -1,
      });
      dispatch(decreaseQuantity(productId, sku));
    } catch (err) {
      console.log("ERR: ", err);
    }
  };
  const handleSelect = (productId, sku) => {
    dispatch(selectProduct(productId, sku));
    console.log(items)
  };

  return (
    <>
      {items &&
        items.map((item) => (
          <Grid
            container
            key={item._id}
            sx={{
              backgroundColor: "white",
              maxWidth: "600px",
              flexDirection: "column",
              width: "100%",
              marginTop: "10px",
              border: "1px solid #ccc",
              borderRadius: "10px",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                margin: "10px",
              }}
            >
              <Grid
                sx={{
                  flexDirection: "column",
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <Checkbox
                  icon={<CheckCircle />}
                  checked={
                    item.isSelected !== undefined ? item.isSelected : false
                  }
                  onChange={() => handleSelect(item.productId._id, item.sku)}
                  checkedIcon={<CheckCircle />}
                />
              </Grid>

              <img
                height={100}
                width={100}
                src={item.productId.variants[0].thumbnail}
                alt={item.productId.name}
              />
              <Grid
                sx={{
                  flexDirection: "column",
                  marginLeft: "10px",
                  minWidth: "336px",
                }}
              >
                <Typography variant="body1" fontWeight={500}>
                  {item.productId.name +
                    " - " +
                    item.productId.variants.find(
                      (variant) => variant.sku === item.sku,
                    )?.variantName}
                </Typography>
                <Grid sx={{ flexDirection: "row", display: "flex" }}>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ marginTop: "20px" }}
                  >
                    {
                      item.productId.variants.find(
                        (variant) => variant.sku === item.sku,
                      )?.price
                    }
                    đ -{" "}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{
                      marginTop: "20px",
                      marginLeft: "5px",
                      textDecoration: "line-through",
                    }}
                  >
                    {" "}
                    <NumberFormat number={
                      item.productId.variants.find(
                        (variant) => variant.sku === item.sku,
                      )?.marketPrice
                    } />
                    đ
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                sx={{
                  flexDirection: "column",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(item.productId._id, item.sku)}
                >
                  {" "}
                  <Delete />
                </IconButton>
                <Grid
                  sx={{
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    aria-label="increase"
                    onClick={() =>
                      handleIncreaseQuantity(item.productId._id, item.sku)
                    }
                  >
                    <AddCircle />
                  </IconButton>
                  <Typography variant="body2" fontWeight={500}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    aria-label="decrease"
                    onClick={() =>
                      handleDecreaseQuantity(item.productId._id, item.sku)
                    }
                  >
                    <RemoveCircle />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </>
  );
};

export default CartItem;
