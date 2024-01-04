import React, { useState } from "react";
import {
  CardGiftcard,
  GppGoodOutlined,
  Home,
  InventoryOutlined,
  Logout,
  Person,
} from "@mui/icons-material";
import {
  Card,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import HomeProfile from "./HomeProfile";
import HistoryPurchase from "./HistoryPurchase";
import LookUpWarranty from "./LookUpWarranty";
import Promotion from "./Promotion";
import MyAccount from "./MyAccount";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/UserAction";
import Cookies from "js-cookie";

const menuItems = [
  {
    icon: InventoryOutlined,
    text: "Lịch sử mua hàng",
    buttonName: "historypurchase",
  },
  { icon: Person, text: "Tài khoản của bạn", buttonName: "youraccount" },
  { icon: Logout, text: "Đăng xuất", buttonName: "logout" },
];

const MenuItem = ({
  icon: Icon,
  text,
  buttonName,
  activeComponent,
  onClick,
}) => (
  <ListItemButton
    sx={{
      py: 0.5,
      marginBottom: "14px",
      borderRadius: "10px",
      width: "240px",
      backgroundColor: activeComponent === buttonName ? "#A2C7FF" : "inherit",
      border:
        activeComponent === buttonName
          ? "1px solid #4287ED"
          : "1px solid transparent",
    }}
    onClick={() => onClick(buttonName)}
  >
    {Icon && <Icon sx={{ mx: 1 }} />}
    <ListItemText
      primary={text}
      primaryTypographyProps={{ fontSize: "14px" }}
    />
  </ListItemButton>
);

const BlockMenu = () => {
  const [activeComponent, setActiveComponent] = useState("youraccount");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3030/auth/logout");
      if (response.status === 200) {
        Cookies.remove("token");
        dispatch(logout());
        navigate("/login");
      } else {
        console.error("Login failed with status: ", response.status);
      }
    } catch (e) {
      console.error("Login failed: ", e);
    }
  };

  const handleButtonClick = (buttonName) => {
    if (buttonName === "logout") {
      setOpen(true);
    }
    setActiveComponent(buttonName);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const renderComponent = () => {
    switch (activeComponent) {
      case "historypurchase":
        return <HistoryPurchase />;
      case "youraccount":
        return <MyAccount />;
      case "logout":
        return logoutDialog;
      default:
        return null;
    }
  };

  const logoutDialog = (
    <Dialog open={open} onClose={handleClose} sx={{ marginBottom: "200px" }}>
      <center>
        <DialogTitle>Thông báo</DialogTitle>
      </center>
      <DialogContent>Bạn có chắc chắn muốn đăng xuất không?</DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ backgroundColor: "#e7e7e7", width: "170px" }}
        >
          <Typography sx={{ color: "black" }}>Không</Typography>
        </Button>
        <Button
          onClick={handleLogout}
          sx={{ backgroundColor: "#1976d2", width: "170px" }}
        >
          <Typography sx={{ color: "white" }}>Đồng ý</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      <center>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            margin: "auto",
          }}
          direction="row"
        >
          <Grid item>
            <Card>
              <List>
                {menuItems.map((menuItem, index) => (
                  <MenuItem
                    key={index}
                    icon={menuItem.icon}
                    text={menuItem.text}
                    buttonName={menuItem.buttonName}
                    activeComponent={activeComponent}
                    onClick={handleButtonClick}
                  />
                ))}
              </List>
            </Card>
          </Grid>
          <Grid
            sx={{
              backgroundColor: "#F5F5F5",
            }}
            item
            direction="row"
          >
            {renderComponent()}
          </Grid>
        </Grid>
      </center>
    </>
  );
};

export default BlockMenu;
