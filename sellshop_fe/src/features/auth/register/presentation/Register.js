import * as React from "react";
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
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Google,
  Visibility,
  VisibilityOff,
  Key,
  Facebook,
} from "@mui/icons-material";

import imgLogin from "../../../../assets/images/logo/logo.png";
import { alpha } from "@mui/system";
import axios from "axios";

const Register = () => {
  const Root = styled("div")(({ theme }) => ({
    width: "650px",
    marginTop: "20px",
    ...theme.typography.body2,
    "& > :not(style) ~ :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3030/auth/register", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      setMessage(response.data.message);
      setOpenSnackbar(true);
    } catch (err) {
      console.log("Err: ", err);
    }
  };

  const passwordsMatch = password === confirmPassword;
  return (
    <>
      <center>
        <Container sx={{ width: "1200px", marginTop: "15px" }}>
          <Toolbar sx={{ flexDirection: "column" }}>
            <Typography variant="h5" component="div" sx={{ width: "auto" }}>
              Đăng ký tài khoản
            </Typography>
            <img alt="Login" src={imgLogin} height={300}/>

            {/* Nhập họ */}
            <TextField
              id="input-with-sx"
              label="Nhập họ"
              value={lastname}
              variant="standard"
              sx={{
                width: "650px",
                marginBottom: "8px",
              }}
              onChange={(e) => setLastname(e.target.value)}
            />
            {/* Nhập tên */}
            <TextField
              id="input-with-sx"
              label="Nhập tên"
              value={firstname}
              variant="standard"
              sx={{
                width: "650px",
                marginBottom: "8px",
              }}
              onChange={(e) => setFirstname(e.target.value)}
            />

            {/* Nhập email */}
            <TextField
              id="input-with-sx"
              label="Nhập email"
              variant="standard"
              value={email}
              sx={{
                width: "650px",
                marginBottom: "8px",
              }}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Mật khẩu */}
            <FormControl
              sx={{ m: 1, width: "25ch", width: "650px" }}
              variant="standard"
            >
              <InputLabel
                htmlFor="standard-adornment-password"
                error={!passwordsMatch}
              >
                Mật khẩu
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
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
            {/* Xác nhận lại mật khẩu */}
            <FormControl sx={{ m: 1, width: "650px" }} variant="standard">
              <InputLabel
                htmlFor="standard-adornment-password"
                error={!passwordsMatch}
              >
                Nhập lại mật khẩu
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
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
            {!passwordsMatch && (
              <Typography
                variant="body2"
                color="error"
                sx={{
                  marginRight: "535px",
                  marginBottom: "14px",
                  fontSize: "12px",
                }}
              >
                Mật khẩu không khớp
              </Typography>
            )}

            <FormControlLabel
              control={<Checkbox size="small" defaultChecked />}
              label={
                <Typography sx={{ fontSize: "13px" }}>
                  Tôi đồng ý với các điều khoản bảo mật cá nhân
                </Typography>
              }
              sx={{ marginRight: "350px" }}
            />

            <Button
              sx={{ width: "650px", marginTop: "14px" }}
              onClick={handleRegister}
              variant="contained"
            >
              Đăng ký
            </Button>
            {/* <Root>
              <Divider>Hoặc đăng ký bằng</Divider>
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
                      variant="outlined"
                      sx={{ color: "inherit", width: "120px" }}
                      startIcon={<Facebook color="blue" />}
                    >
                      <span style={{ fontSize: "14px" }}>Facebook</span>
                    </Button> */}
                  </center>
                </Box>
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
                      variant="outlined"
                      sx={{ color: "inherit", width: "120px" }}
                      startIcon={<Google color="blue" />}
                    >
                      <span style={{ fontSize: "14px" }}>Google</span>
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
              Bạn đã có tài khoản?{" "}
              <Link href="/login" underline="none" sx={{ fontSize: "14px" }}>
                Đăng nhập
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
    </>
  );
};
export default Register;
