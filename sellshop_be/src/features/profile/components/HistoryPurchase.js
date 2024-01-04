import React, { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Avatar, Grid, Typography, Box, Divider, Button } from "@mui/material";

import imgEmpty from "../../../assets/images/Order-empty.webp";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";

const dataButtons = [
  { title: "Tất cả", buttonName: "all", path: "" },
  { title: "Chờ xác nhận", buttonName: "pending", path: "" },
  { title: "Đã xác nhận", buttonName: "confirmed", path: "" },
  { title: "Đang vận chuyển", buttonName: "shipping", path: "" },
  { title: "Đã giao hàng", buttonName: "completed", path: "" },
  // { title: "Đã hủy", buttonName: "cancelled", path: "" },
];

const OrderButtons = ({ title, buttonName, activeButton, path, onClick }) => (
  <Button
    sx={{
      py: 0.5,
      marginBottom: "14px",
      minHeight: "35px",
      borderRadius: "10px",
      "--Grid-borderWidth": "1px",
      border: "var(--Grid-borderWidth) solid",
      borderColor: "divider",
      color: "black",
      display: "flex",
      marginLeft: "20px",
      fontSize: "16px",
      textTransform: "none",
      backgroundColor: activeButton === buttonName ? "#ee4d2d" : "inherit",
    }}
    onClick={() => onClick(buttonName, path)}
  >
    {title}
  </Button>
);

const HistoryPurchase = () => {
  const [activeButton, setActiveButton] = useState("all");
  const user = useSelector((state) => state.user.user);
  const handleButtonClick = (buttonName, path) => {
    if (buttonName !== null)
    setActiveButton((prevButton) =>
      prevButton === buttonName ? null : buttonName,
    );
};

return (
  <Grid
    container
    item
    sx={{ position: "relative" }}
    spacing={3}
    direction="row"
  >
    <Grid item sx={{ position: "relativve", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src={user.avatar}
          sx={{
            border: "2px solid #1976d2",
            width: 50,
            height: 50,
            marginTop: "8px",
          }}
        />
        <Typography sx={{ marginLeft: "12px" }}>
          {user.firstname}
        </Typography>
      </Box>
      
      <Grid
        container
        item
        marginLeft={10}
        sx={{ position: "relative", marginTop: "14px" }}
      >
        {dataButtons.map((orderButtons, index) => (
          <OrderButtons
            key={index}
            title={orderButtons.title}
            buttonName={orderButtons.buttonName}
            path={orderButtons.path}
            activeButton={activeButton}
            onClick={handleButtonClick}
          />
        ))}
      </Grid>
      <OrderItem status={activeButton}/>
      <Grid sx={{ display: "flex" }}></Grid>
      <Grid sx={{ marginTop: "100px", marginBottom: "300px" }}>
        {/* <Box>
            <img src={imgEmpty} />
            <Typography>Không có đơn hàng nào thỏa mãn</Typography>
          </Box> */}
      </Grid>
    </Grid>
  </Grid>
);
};
export default HistoryPurchase;
