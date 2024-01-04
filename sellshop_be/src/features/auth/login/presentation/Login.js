import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
  Input,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Divider,
  styled,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Google,
  Visibility,
  VisibilityOff,
  Facebook,
} from "@mui/icons-material";

import imgLogin from "../../../../assets/images/logo/logo.png";
import { alpha } from "@mui/system";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../../../actions/UserAction.js";
import Cookies from "js-cookie";
import ShowSnackbar from "../../../../components/common/components/ShowSnackbar.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const Root = styled("div")(({ theme }) => ({
    width: "650px",
    marginTop: "20px",
    ...theme.typography.body2,
    "& > :not(style) ~ :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3030/auth/login", {
        email: username,
        password: password,
      });
      if (response.data.token != null) {
        const data = response.data.token;
        Cookies.set("token", data, { expires: 7 });
        try {
          const responses = await axios.get("http://localhost:3030/user/", {
            headers: {
              Authorization: `Bearer ${data}`,
            },
          });
          dispatch(login(responses.data));
          navigate("/");
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        }
      }
      setMessage(response.data.message);
      setOpenSnackbar(true);
    } catch (e) {
      console.error("Login failed: ", e);
    }
  };

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleGoogleLogin = async () => {
    window.open("http://localhost:3030/auth/google/", "_self");
  }

  return (

    <center>
      <Container sx={{ width: "1200px", marginTop: "15px" }}>
        <Toolbar sx={{ flexDirection: "column" }}>
          <Typography component="div" sx={{ width: "auto" }} fontWeight={700} fontSize={40}>
            Đăng nhập tài khoản
          </Typography>
          <img alt="Login" src={imgLogin} height={300}></img>
          <TextField
            id="input-with-sx"
            label="Nhập email"
            variant="standard"
            sx={{ width: "650px", marginBottom: "15px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormControl
            sx={{ m: 1, width: "650px", marginBottom: "15px" }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Container
            sx={{
              width: "700px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {/* <Link href="#" underline="none" sx={{ fontSize: "14px" }}>
              Quên mật khẩu?
            </Link> */}
          </Container>
          <Button type="button" onClick={handleLogin} variant="contained" sx={{ width: "650px" ,fontWeight: 1000 }}>
            Đăng nhập
          </Button>
          {/* <Root>
            <Divider>Hoặc đăng nhập bằng</Divider>
          </Root> */}
          <center>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "12px",
              }}
            >
              <Box
                sx={{
                  width: "auto",
                  backgroundColor: alpha("#0000FF", 0.05),
                  borderRadius: "10px",
                  marginLeft: "12px",
                }}
              >
                <center>
                  {/* <Button
                    onClick={handleGoogleLogin}
                    variant="outlined"
                    sx={{ color: "white", width: "650px", backgroundColor: "#FF4308", border: "1px solid #c32f00 !important", '&:hover': { backgroundColor: "#c32f00" } }}
                    startIcon={<Google color="blue" />}
                  >
                    <span style={{ fontSize: "14px", fontWeight: 1000 }}>Đăng nhập với Google</span>
                  </Button> */}
                </center>
              </Box>
            </Container>
          </center>
          <Typography
            component="div"
            sx={{
              width: "auto",
              fontSize: "14px",
              marginTop: "12px",
              marginBottom: "80px",
            }}
          >
            Bạn chưa có tài khoản? Vui lòng{" "}
            <Link href="/register" underline="none" sx={{ fontSize: "14px" }}>
              Đăng ký
            </Link>
          </Typography>
        </Toolbar>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={message.includes("thành công") ? "success" : "error"}
          sx={{ width: "350px" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </center>

  );
};
export default Login;
