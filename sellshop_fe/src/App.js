import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header/presentation/Header.js";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Login from "./features/auth/login/presentation/Login";
import ForgotPassword from "./features/auth/forgot_password/presentation/ForgotPassword";
import Register from "./features/auth/register/presentation/Register.js";
import Profile from "./features/profile/presentation/Profile";
import Discount from "./features/discount/presentation/Discount.js";
import Home from "./features/home/presentation/Home";
import ProductDetail from "./features/product/product_detail.jsx/presentation/ProductDetail";
import ConfirmAccount from "./features/auth/confirm_account/presentation/ConfirmAccount.js";
import { StyledEngineProvider } from "@mui/material";
import Search from "./features/search/presentation/Search";
import { BrowserRouter, Routes, Route, Redirect, Navigate } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./stores/index.js";
import Cookies from "js-cookie";
import axios from "axios";
import { login } from "./actions/UserAction.js";
import Discountt from "./features/discount/presentation/Discount";
import Payment from "./features/payment/presentations/Payment";
import OrderDetail from "./features/profile/components/OrderDetail";
import Cart from "./features/cart/presentation/Cart";
import NotFound from "./features/notfound/presentations/notfound";
import PageMetadata from "./components/common/components/PageMetadata";
import LoadingPage from "./components/common/components/LoadingPage";

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
          
          if(responses.data)
          dispatch(login(responses.data));
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
              <Header />
              <Routes>
                <Route path="/" name="Home" Component={Home} />
                <Route path="/search" name="Search" element={<Search />} />
                <Route
                  path="/search/:categorySlug"
                  name="Search"
                  Component={Search}
                />
                <Route
                  path="/product-detail/:productSlug/:variantSku"
                  name="Product Detail"
                  Component={ProductDetail}
                />
                <Route path="/login" name="Login" Component={Login} />
                {isAuthenticated ?
                  <Route path="/profile" name="Profile" element={isAuthenticated ? <Profile /> : <Navigate to='/login' />} />
                  :
                  <Route path="/profile" name="Profile" element={<LoadingPage />} />
                }

                {isAuthenticated ?
                  <Route path="/cart" name="Cart" element={isAuthenticated ? <Cart /> : <Navigate to='/login' />} />
                  :
                  <Route path="/cart" name="Cart" element={<LoadingPage />} />
                }

                <Route path="/register" name="Register" Component={Register} />
                <Route
                  path="/confirm/:userId/:tokenconfirm"
                  name="ConfirmAccount"
                  Component={ConfirmAccount}
                />
                <Route path="/discount/:discountId" name="Discount" Component={Discount} />
                {isAuthenticated ?
                  <Route path="/payment" name="Payment" element={isAuthenticated ? <Payment /> : <Navigate to='/login' />} />
                  :
                  <Route path="/payment" name="Payment" element={<LoadingPage />} />
                }
                {isAuthenticated ?
                  <Route path="/profile/order/:orderId" name="Order Detail" element={isAuthenticated ? <OrderDetail /> : <Navigate to='/login' />} />
                  :
                  <Route path="/profile/order/:orderId" name="Order Detail" element={<LoadingPage />} />
                }

                <Route path="*" Component={NotFound} />
              </Routes>
            </BrowserRouter>
          </StyledEngineProvider>
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
