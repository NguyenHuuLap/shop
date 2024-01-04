import {
  Container,
  Toolbar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import imgLogin from "../../../../assets/images/login.png";
const ForgotPassword = () => {
  return (
    <>
      <center>
        <Container sx={{ width: "1200px", marginTop: "15px" }}>
          <Toolbar sx={{ flexDirection: "column" }}>
            <Typography variant="h5" component="div" sx={{ width: "auto" }}>
              Quên mật khẩu
            </Typography>
            <img alt="Login" src={imgLogin}></img>
            <TextField
              id="input-with-sx"
              label="Nhập số điện thoại/email"
              variant="standard"
              sx={{
                width: "650px",
                marginBottom: "15px",
                marginBottom: "30px",
              }}
            />
            <Button
              sx={{ width: "400px", borderRadius: "20px" }}
              variant="contained"
            >
              Đăng nhập
            </Button>
          </Toolbar>
        </Container>
      </center>
    </>
  );
};
export default ForgotPassword;
