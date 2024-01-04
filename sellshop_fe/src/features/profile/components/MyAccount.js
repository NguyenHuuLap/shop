import {
  EditNoteOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Grid,
  Typography,
  TextField,
  Avatar,
  IconButton,
  Button,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from "@mui/material";
import { format } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../actions/UserAction.js";
import axios from "axios";
import Cookies from "js-cookie";

const MyAccount = () => {
  const user = useSelector((state) => state.user.user);
  let formattedDate = "";
  if (user && user.createdAt) {
    formattedDate = format(new Date(user.createdAt), "dd/MM/yyyy");
  }
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [changePassword, setChangePassword] = React.useState(false);
  const [passwordOld, setPasswordOld] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const passwordsMatch = password === confirmPassword;

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordOldChange = (event) => {
    setPasswordOld(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const [editFields, setEditFields] = useState({
    ho: false,
    ten: false,
    diaChi: false,
  });
  const [editedData, setEditedData] = useState({
    ho: user.lastname,
    ten: user.firstname,
    diaChi: user.address,
  });

  const handleEdit = (field) => {
    setEditFields((prevEditFields) => ({
      ...prevEditFields,
      [field]: !prevEditFields[field],
    }));
  };
  const handleChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleChangePassword = () => {
    setChangePassword(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3030/auth/${user._id}`,
        {
          firstname: editedData.ten,
          lastname: editedData.ho,
          address: editedData.diaChi,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.data != null) {
        dispatch(updateUser(response.data.data));
      }
      setMessage(response.data.message);
      setOpenSnackbar(true);
    } catch (err) {
      console.log("Err: ", err);
    }
    setEditFields({
      ho: false,
      ten: false,
      diaChi: false,
    });
  };

  const handleSavePassword = async () => {
    try {
      if (user && user._id) {
        const response = await axios.post(
          `http://localhost:3030/auth/changepassword`,
          {
            userId: user._id,
            oldPassword: passwordOld,
            newPassword: password,
            confirmNewPassword: confirmPassword,
          },
        );
        setMessage(response.data.message);
        setOpenSnackbar(true);
      }
    } catch {
      console.log("Đã có lỗi xảy ra");
    }
  };

  const dataFields = [
    { label: "Họ", value: editedData.ho, field: "ho" },
    { label: "Tên", value: editedData.ten, field: "ten" }
  ];

  const renderInforAccount = () => (
    <Grid
      item
      sx={{
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        width: "900px",
      }}
    >
      <Avatar src={user.avatar} sx={{ height: "100px", width: "100px" }} />
      <Typography>{user.firstname + " " + user.lastname}</Typography>
      {dataFields.map(({ label, value, field }) => (
        <TextField
          key={field}
          label={label + ": " + value}
          variant="standard"
          sx={{ width: "650px", marginBottom: "15px" }}
          disabled={!editFields[field]}
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => handleEdit(field)}>
                <EditNoteOutlined />
              </IconButton>
            ),
          }}
        />
      ))}

      {/* Email */}
      <TextField
        id="input-email"
        label={"" + user.email}
        variant="standard"
        disabled
        sx={{ width: "650px", marginBottom: "15px" }}
      />

      {/* Ngày tham gia */}
      {/* <TextField
        id="input-ngay-tham-gia"
        label={"Ngày tham gia: " + formattedDate}
        disabled
        variant="standard"
        sx={{ width: "650px", marginBottom: "30px" }}
      /> */}
      <Button
        sx={{
          width: "650px",
          textTransform: "none",
          backgroundColor: "#ee4d2d",
          color: "white",
          "&:hover": { backgroundColor: "#ee4d2d" },
        }}
        onClick={handleSave}
      >
        Cập nhật thông tin
      </Button>
      <Button
        sx={{
          width: "650px",
          textTransform: "none",
          backgroundColor: "#ee4d2d",
          color: "white",
          "&:hover": { backgroundColor: "#ee4d2d" },
          marginTop: "8px",
        }}
        onClick={handleChangePassword}
      >
        Đổi mật khẩu
      </Button>
    </Grid>
  );
  const renderChangePassword = () => (
    <Grid
      item
      sx={{
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        width: "900px",
      }}
    >
      <Typography variant="h5" fontWeight={600} sx={{ marginBottom: "8px" }}>
        Tạo mật khẩu mới
      </Typography>
      <Avatar src={user.avatar} sx={{ height: "100px", width: "100px" }} />
      {/* Mật khẩu cũ */}
      <FormControl
        sx={{ m: 1, width: "25ch", width: "650px" }}
        variant="standard"
      >
        <InputLabel htmlFor="standard-adornment-password">
          Mật khẩu cũ
        </InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
          value={passwordOld}
          onChange={handlePasswordOldChange}
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
      {/* Mật khẩu mới */}
      <FormControl
        sx={{ m: 1, width: "25ch", width: "650px" }}
        variant="standard"
      >
        <InputLabel
          htmlFor="standard-adornment-password"
          error={!passwordsMatch}
        >
          Mật khẩu mới
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

      {/* Xác nhận lại mật khẩu mới */}
      <FormControl sx={{ m: 1, width: "650px" }} variant="standard">
        <InputLabel
          htmlFor="standard-adornment-password"
          error={!passwordsMatch}
        >
          Nhập lại mật khẩu mới
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

      <Button
        sx={{
          width: "650px",
          textTransform: "none",
          backgroundColor: "#1976d2",
          color: "white",
          "&:hover": { backgroundColor: "#1976d2" },
        }}
        onClick={handleSavePassword}
      >
        Đổi mật khẩu
      </Button>
    </Grid>
  );

  return (
    <Grid
      container
      item
      sx={{ position: "relative" }}
      spacing={2}
      marginBottom={80}
    >
      {changePassword ? renderChangePassword() : renderInforAccount()}
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
    </Grid>
  );
};

export default MyAccount;
