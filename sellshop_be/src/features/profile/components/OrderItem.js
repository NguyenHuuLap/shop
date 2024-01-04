import { Box, Button, Container, Grid, Stack, Typography, Paper } from "@mui/material";
import logo from "../../../assets/images/logo/logo.png";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import axios from "axios";
import { orderItems } from "../../../actions/OrderAction.js";
import Cookies from "js-cookie";
import { Pending } from "@mui/icons-material";
import NumberFormat from "../../../utils/NumberFormat";
import { Link } from "react-router-dom";

const OrderItem = ({ status }) => {
  const items = useSelector((state) => state.order.orderItems);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [orderItem, setorderItem] = React.useState([]);
  const token = Cookies.get("token");

  React.useEffect(() => {
    const getItems = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(
            `http://localhost:3030/order/owner/status/${status}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          if (response.status === 200) {
            setorderItem(response.data.data || []);
            dispatch(orderItems(response.data.data));
          }
        }
      } catch (err) {
        console.log("ERR: ", err);
      }
    };
    getItems();
  }, [, status]);

  const handleRePay = async (orderId) => {
    try {
      const token = Cookies.get("token");
      await axios.get(`http://localhost:3030/order/repay/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },).then(value => window.open(value.data?.data, "_self"))
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Paper style={{ maxHeight: 600, overflow: 'auto', backgroundColor: "transparent" }}>

        {items &&
          items.map((item) => (
            <Grid
              container
              sx={{
                backgroundColor: "white",
                maxWidth: "900px",
                flexDirection: "column",
                width: "100%",
                marginTop: "10px",
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
            >
              <Grid
                item
                xs={12}
                sx={{ flexDirection: "row", display: "flex", margin: "8px" }}
              >
                <Grid item xs={1}>
                  <img src={item.items[0].thumbnail} height={50} width={50} />
                </Grid>
                <Grid
                  item
                  xs={9}
                  sx={{
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "flex-start",
                    marginRight: "8px",
                    marginLeft: "8px",
                  }}
                >
                  <Typography fontWeight={650} textAlign="start">{item.items[0].productId.name} </Typography>
                  <Typography>{item.items.length > 1 ? `Và ${item.items.reduce((acc, item) => acc + item.quantity, 0) - 1} mặt hàng khác` : ""}</Typography>

                  <Stack direction="row" spacing={1}>
                    <Box
                      sx={{
                        backgroundColor: "#EBF8F2",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                      }}
                    >
                      {item.status === "pending" &&
                        <Typography
                          sx={{
                            margin: "5px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#007b55",
                          }}
                        >
                          Chờ xác nhận
                        </Typography>
                      }

                      {item.status === "confirmed" &&
                        <Typography
                          sx={{
                            margin: "5px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#007b55",
                          }}
                        >
                          Đã xác nhận
                        </Typography>
                      }

                      {item.status === "shipping" &&
                        <Typography
                          sx={{
                            margin: "5px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#007b55",
                          }}
                        >
                          Đang vận chuyển
                        </Typography>
                      }
                      {item.status === "completed" &&
                        <Typography
                          sx={{
                            margin: "5px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#007b55",
                          }}
                        >
                          Đã giao hàng
                        </Typography>
                      }
                      {item.status === "cancelled" &&
                        <Typography
                          sx={{
                            margin: "5px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#007b55",
                          }}
                        >
                          Đã hủy
                        </Typography>
                      }
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: "#EBF8F2",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                      }}
                    >

                      {item.paymentStatus === "pending" &&
                        <Typography
                          sx={{
                            margin: "5px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#007b55",
                          }}
                        >
                          Chưa thanh toán
                        </Typography>
                      }

                      {item.paymentStatus === "paid" &&
                        <Typography
                          sx={{
                            margin: "5px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#007b55",
                          }}
                        >
                          Đã thanh toán
                        </Typography>
                      }

                      {item.paymentStatus === "cancelled" &&
                        <Typography
                          sx={{
                            margin: "5px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#007b55",
                          }}
                        >
                          Đã hủy
                        </Typography>
                      }
                    </Box>
                  </Stack>
                  <Stack direction="row">
                    <Typography
                      sx={{ fontSize: "14px", color: "red", fontWeight: "600" }}
                    >
                      <NumberFormat number={item.total} /> VNĐ&nbsp;
                    </Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                      - Khuyến mãi <NumberFormat number={item.discount} /> VNĐ
                    </Typography>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  {item.paymentStatus === "pending" && item.paymentMethod === "vnpay" &&
                    <Button
                      onClick={(event) => handleRePay(item._id)}
                      sx={{
                        fontSize: "12px",
                        textTransform: "none",
                        color: "#609af8",
                        marginRight: "5px",
                      }}
                      variant="outlined"
                    >
                      Thanh toán
                    </Button>
                  }

                  <Button
                    component={Link}
                    sx={{
                      fontSize: "12px",
                      textTransform: "none",
                      color: "#609af8",
                    }}
                    variant="outlined"
                    to={`./order/${item._id}`}
                  >
                    Xem chi tiết
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ))}

      </Paper>
    </>
  );
};

export default OrderItem;
