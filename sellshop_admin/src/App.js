import React, { useContext, useEffect } from "react";
import './App.css';
import { CssBaseline, ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import User from './features/user/presentations/User';
import Layout from "./components/layout/Layout";
import Brand from "./features/brand/presentations/Brand";
import Category from "./features/category/presentations/Category";
import Comment from "./features/comment/presentations/Comment";
import Product from "./features/product/presentations/Product";
import Login from "./features/login/presentations/Login";
import Discount from "./features/discount/presentations/Discount";
import Cart from "./features/cart/presentations/Cart";
import Order from "./features/order/presentations/Order";
import Variant from "./features/product/components/Variant";
import Item from "./features/order/components/Item";
import OverSpec from "./features/product/components/OverSpec";
import DetailSpec from "./features/product/components/DetailSpec";
import HightLightPic from "./features/product/components/HighLightPics";
import Statistics from "./features/statistics/presentations/statistics";
import { Provider } from "react-redux";
import store from "./redux/stores";
import { useSelector, useDispatch } from 'react-redux';
import { login } from "./redux/actions/UserAction";
import axios from "axios";
import Cookies from "js-cookie";

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    background: {
      default: "#f4f6f8",
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const responses = await axios.get("http://localhost:3030/user/owner", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (responses.data.role === 'admin') {
            dispatch(login(responses.data));
          }

        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        }
      }
    };

    fetchData();
  }, [dispatch, token]);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <StyledEngineProvider injectFirst>
            <BrowserRouter>
              {/* <Layout /> */}
              <Routes>
                
                {isAuthenticated ?
                  <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to='/login' />}  >
                    <Route path="/user" name="User" Component={User} />
                    <Route path="/brand" name="Brand" Component={Brand} />
                    <Route path="/category" name="Category" Component={Category} />
                    <Route path="/comment" name="Comment" Component={Comment} />
                    <Route path="/statistics" name="statistics" Component={Statistics} />
                    <Route path="/product" name="Product" Component={Product} />
                    <Route path="/product/:productId/variant" name="Variant" Component={Variant} />
                    <Route path="/product/:productId/over-spec" name="OverSpec" Component={OverSpec} />
                    <Route path="/product/:productId/detail-spec" name="DetailSpec" Component={DetailSpec} />
                    <Route path="/product/:productId/high-light-pics" name="HightLightPic" Component={HightLightPic} />
                    <Route path="/order/:orderId/item" name="Order Items" Component={Item} />
                    <Route path="/discount" name="Discount" Component={Discount} />
                    <Route path="/cart" name="Cart" Component={Cart} />
                    <Route path="/order" name="Cart" Component={Order} />
                  </Route> : <Route path="/login" name="Login" Component={Login} />}
              </Routes>
            </BrowserRouter>
          </StyledEngineProvider>
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
