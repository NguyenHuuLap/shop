import * as React from "react";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Badge,
  Container,
  Button,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { ShoppingCart } from "@mui/icons-material";
import SearchButton from "../components/Search";
import { alpha } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { cartItems } from "../../../actions/CartAction.js";
import CategoryBar from "../components/CategoryBar";
import logo from "../../../assets/images/logo/logo.png";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const items = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch();
  const [totalProduct, setTotalProduct] = React.useState(0);
  const [cartItem, setCartItem] = React.useState([]);

  React.useEffect(() => {
    const getItems = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(
            `http://localhost:3030/cart/${user._id}`,
          );
          if (response.status === 200) {
            setCartItem(response.data.data?.items || []);
            dispatch(cartItems(response.data.data?.items || []));
            const newTotalProduct = cartItem.reduce(
              (total, item) => total + item.quantity,
              0,
            );
            setTotalProduct(newTotalProduct);
          }
        }
      } catch (err) {
        console.log("ERR: ", err);
      }
    };
    getItems();
  }, [user]);

  React.useEffect(() => {
    const getItems = async () => {
      try {
        const newTotalProduct = items.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        setTotalProduct(newTotalProduct);
      } catch (err) {
        console.log("ERR: ", err);
      }
    };
    getItems();
  }, [items, cartItem]);

  const navigate = useNavigate();
  const handleOnClick = async () => {
    if (isAuthenticated) {
      navigate("/profile", { state: { user: user } });
    } else {
      navigate("/login");
    }
  };
  const handleClickHome = async () => {
    navigate("/");
  };

  const handleClickCart = async () => {
    navigate("/cart");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ee4d2d" }}>
      <Container>
        <Toolbar sx={{ width: "1200px" }}>
          <img
            onClick={handleClickHome}
            src={logo}
            style={{
              height: "50px",
              width: "50px",
              marginLeft: "50px",
              marginRight: "50px",
            }}
          />
          {/* <Box
            sx={{
              width: "auto",
              backgroundColor: alpha("#FFFFFF", 0.1),
              borderRadius: "10px",
            }}
          >
            <center>
              <Button sx={{ color: "inherit", textTransform: "none" }}>
                <MenuIcon sx={{ marginRight: "5px" }} />
                <span style={{ fontSize: "14px" }}>Danh mục</span>
              </Button>
            </center>
          </Box> */}

          {/* Search*/}
          <center>
            <SearchButton sx={{ marginRight: "5px" }} />
          </center>

          {/* Giỏ hàng */}
          <Box
            sx={{
              width: "auto",
              backgroundColor: alpha("#FFFFFF", 0.1),
              borderRadius: "10px",
              marginLeft: "12px",
            }}
          >
            <center>
              <Button
                type="button"
                onClick={handleClickCart}
                sx={{ color: "inherit", textTransform: "none" }}
              >
                <Badge
                  badgeContent={totalProduct}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: 9,
                      height: 15,
                      minWidth: 15,
                    },
                  }}
                >
                  <ShoppingCart />
                </Badge>
                <span style={{ fontSize: "14px" }}>Giỏ hàng</span>
              </Button>
            </center>
          </Box>

          {/* Accounts */}
          <Box
            sx={{
              width: "auto",
              backgroundColor: alpha("#FFFFFF", 0.1),
              borderRadius: "10px",
              marginLeft: "12px",
            }}
          >
            <center>
              <Button
                type="button"
                onClick={handleOnClick}
                sx={{ color: "inherit", textTransform: "none" }}
              >
                <Avatar
                  src={user?.avatar}
                  sx={{ height: "30px", width: "30px", marginRight: "5px" }}
                />
                <span style={{ fontSize: "14px" }}>
                  {isAuthenticated ? user?.firstname : `Đăng nhập`}
                </span>
              </Button>
            </center>
          </Box>
        </Toolbar>
      </Container>
      <CategoryBar />
    </AppBar>
  );
};
export default Header;
