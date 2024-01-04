import { ToggleButton, Grid, Pagination, Box, Card, CardContent, Typography, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, ToggleButtonGroup, requirePropFactory, Divider, Paper, Snackbar, Alert } from "@mui/material";
import * as React from "react";
import ReciveTab from "../components/ReciveTab";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import LoadingPage from "../../../components/common/components/LoadingPage";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/styles";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import NumberFormat from "../../../utils/NumberFormat";
import { deleteCartItem } from "../../../actions/CartAction";

const CustomToggleButton = styled(ToggleButton)({
  margin: "0px 10px",
  backgroundColor: "#f8f9fa",
  color: "black",
  border: "1px solid #e9ecef !important",
  borderRadius: "10px !important",
  fontWeight: 600,
  padding: 7,
  [`&.Mui-selected`]: {
    backgroundColor: "#23ad00",
    borderColor: "#23ad00",
    color: "white",
  },
  [`&.Mui-selected:hover`]: {
    backgroundColor: "#1d9100",
    borderColor: "#23ad00",
    color: "white",
  },
});

const Payment = () => {
  const items = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productList, setProductList] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [isReciveAtStore, setIsReciveAtStore] = React.useState(true);
  const [address, setAddress] = React.useState(null);
  const [discount, setDiscount] = React.useState(null);
  const [discontCode, setDiscountCode] = React.useState(null);
  const [acceptedDiscount, setAcceptedDiscount] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState("cod");
  const [total, setTotal] = React.useState(null);
  const [vnpayLink, setVnPayLink] = React.useState(null);
  const [note, setNote] = React.useState(null);
  const [subTotal, setSubTotal] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  React.useEffect(() => {
    const fecthProduct = async () => {
      const tempList = await JSON.parse(localStorage.getItem('paying_products'));
      const commonElements = await items.filter(item =>
        tempList.some(product => product.productId._id === item.productId._id && product.sku === item.sku)
      );
      setSubTotal(await JSON.parse(localStorage.getItem('total_paying_products')))
      setProductList(commonElements)
    }
    fecthProduct();
  }, [items])

  const findDiscount = async () => {
    if (discontCode !== null) {
      const token = Cookies.get("token");
      const response = await axios.post(`http://localhost:3030/discount/calc/${discontCode}`, { "amount": subTotal })
      const check = await axios.get(`http://localhost:3030/order/check-discount/${discontCode}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(check);
      if (response.data.status === 500 || check.data.data === true) {
        setDiscount(null);
        setAcceptedDiscount(false);
      }
      else
        setDiscount(response.data.data)
    } else
      setDiscount(null)
  }

  const handleChangeName = (event) => {
    const { value } = event.target;
    const sanitizedValue = value.replace(/[^a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g, ''); // Loại bỏ các ký tự không phải chữ cái và khoảng trắng
    const trimmedValue = sanitizedValue.replace(/\s{2,}/g, ' ');
    setName(trimmedValue);
  }

  const handlePhoneNumberChange = (event) => {
    const inputPhoneNumber = event.target.value;
    const numericPhoneNumber = inputPhoneNumber.replace(/\D/g, '');
    setPhone(numericPhoneNumber);
  };
  const payOrder = async () => {
    if (name === null || name.trim() === "") {
      setMessage("Tên người dùng không hợp lệ");
      setOpenSnackbar(true);
    } else if (phone === null || phone.length < 10 || phone.trim() === "") {
      setMessage("Số điện thoại không hợp lệ");
      setOpenSnackbar(true);
    } else if (isReciveAtStore === false &&
      (address === null ||
        !address.province ||
        !address.district ||
        !address.ward ||
        address.street === null || address.street.trim() === "")) {
      setMessage("Địa chỉ khi nhận không hợp lệ");
      setOpenSnackbar(true);
    } else {
      const data = {
        "customer": {
          "name": name,
          "phone": phone,
        },
        "note": note,
        "isReceiveAtStore": isReciveAtStore,
        "address": address,
        "discountCode": acceptedDiscount ? discount.info.code : null,
        "paymentMethod": paymentMethod,
        "items": (JSON.parse(localStorage.getItem('paying_products'))).map(item => ({ productId: item.productId._id, sku: item.sku, quantity: item.quantity }))
      }
      const token = Cookies.get("token");
      const response = await axios.post(`http://localhost:3030/order/`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      response.data.data.items.forEach((item) => {
        dispatch(deleteCartItem(item.productId, item.sku));
      })
      navigate(`/profile/order/${response.data.data._id}`)
      localStorage.removeItem('paying_products');
      localStorage.removeItem('total_paying_products');
    }


  }

  const redirectToVnPay = () => {
    window.open(vnpayLink, "_blank");
  }


  const handleChangePaymentMethod = (event, newPaymentMethod) => {
    if (newPaymentMethod !== null)
      setPaymentMethod(newPaymentMethod)
  }

  const handleAcceptedDiscount = (event) => {
    if (discount !== null)
      setAcceptedDiscount(!acceptedDiscount);
  }

  return !subTotal || !productList || productList.length === 0 ? (<LoadingPage />) : (
    <Grid
      container
      spacing={1}
      sx={{
        maxWidth: "1200px",
        display: "flex",
        margin: "auto",
      }}
    >
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography fontWeight={650}>
                  Thông tin cá nhân
                </Typography>
                <TextField value={name} onChange={handleChangeName} size="small" label="Tên người nhận" variant="outlined" sx={{ width: "100%", my: 0.5 }} />
                <TextField value={phone} onChange={handlePhoneNumberChange} size="small" label="Số điện thoại người nhận" variant="outlined" sx={{ width: "100%", my: 0.5 }} inputProps={{
                  maxLength: 10,
                  pattern: '[0-9]*',
                }} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>

                <Typography fontWeight={650}>
                  Chọn phương thức nhận hàng
                </Typography>
                <ReciveTab setIsReciveAtStore={setIsReciveAtStore} setAddress={setAddress} setNote={setNote} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>

                <Typography fontWeight={650}>
                  Nhập mã khuyến mãi
                </Typography>
                <Grid container spacing={1} justifyContent='center'>
                  {discount !== null ?
                    <Grid item xs={12}>
                      <Card>
                        <CardContent sx={{ display: "flex", alignItems: "center" }}>
                          <img src={require("../../../assets/images/logo/logo.png")} style={{ height: "100px", marginRight: "10px" }} />
                          <Box>
                            <Typography fontWeight={650}>
                              Chương trình {discount.info.name}
                            </Typography>
                            <Typography>
                              Giảm {discount.info.discount} {discount.info.discountType === "percent" ? "%" : "VNĐ"}
                            </Typography>
                            <Typography>
                              Giảm tối đa {discount.info.maximumApplied} VNĐ
                            </Typography>
                            <Typography>
                              Áp dụng với đơn hàng từ {discount.info.minimumTotal} VNĐ trở lên
                            </Typography>
                            <Typography >
                              Hóa đơn của bạn được giảm {discount.amount} VNĐ
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>

                    </Grid>
                    :
                    <Grid item>
                      <Card>
                        <CardContent sx={{ display: "flex", alignItems: "center" }}>
                          <img src={require("../../../assets/images/logo/logo.png")} style={{ height: "100px", marginRight: "10px" }} />
                          <Typography>
                            Mã khuyến mãi của bạn không tồn tài hoặc đang không trong thời gian sử dụng
                          </Typography>

                        </CardContent>
                      </Card>
                    </Grid>
                  }


                  <Grid item xs={12}>
                    <TextField value={discontCode} onChange={(event) => setDiscountCode(event.target.value)} size="small" sx={{ width: '100%' }} placeholder="Nhập mã khuyến mãi" />
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="outlined" sx={{ width: '100%' }} onClick={findDiscount}>
                      Tra cứu khuyến mãi
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" sx={{ width: '100%', backgroundColor: acceptedDiscount ? "#23ad00" : "#1976D2", '&:hover': { backgroundColor: acceptedDiscount ? "#1d9100" : "" } }} onClick={handleAcceptedDiscount}>

                      {acceptedDiscount ? <TaskAltIcon sx={{ mr: 1 }} /> : ""}
                      {acceptedDiscount ? "Đã áp dụng khuyến mãi" : "Áp dụng khuyến mãi"}
                    </Button>
                  </Grid>
                </Grid>

              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>

                <Typography fontWeight={650}>
                  Chọn phương thức thanh toán
                </Typography>
                {/* <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="cod"
                    name="radio-buttons-group"
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  >
                    <FormControlLabel value="cod" control={<Radio />} label="COD" />
                    <FormControlLabel value="vnpay" control={<Radio />} label="VNPAY" />
                  </RadioGroup>
                </FormControl> */}
                <ToggleButtonGroup
                  sx={{ width: "100%" }}
                  value={paymentMethod}
                  exclusive
                  onChange={handleChangePaymentMethod}>
                  <CustomToggleButton value="cod" sx={{ width: "100%" }}>
                    <img src="https://clipground.com/images/cash-on-delivery-png-2.png" style={{ borderRadius: "50%", backgroundColor: "white", padding: "8px", width: "auto", height: "50px", marginRight: "10px" }} />
                    {/* https://clipground.com/images/cash-on-delivery-png-2.png */}
                    Thanh toán khi nhận hàng
                  </CustomToggleButton>
                  <CustomToggleButton value="vnpay" sx={{ width: "100%" }}>
                    <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png" style={{ width: "auto", height: "30px", marginRight: "10px" }} />
                    Thanh toán qua VNPAY
                  </CustomToggleButton>
                </ToggleButtonGroup>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Button onClick={payOrder} variant="contained" sx={{ width: "100%" }}>
                  Xác nhận lưu đơn hàng
                </Button>
                {vnpayLink !== null &&
                  <Button onClick={redirectToVnPay} variant="contained" sx={{ width: "100%" }}>
                    Thanh toán đơn hàng ngay tại đây với VNPAY
                  </Button>
                }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography fontWeight={650}>
                  Tổng tiền
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Tổng tiền sản phẩm:</Typography>
                  <Typography sx={{ textAlign: "right" }}><NumberFormat number={subTotal} /> VNĐ</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Khuyến mãi:</Typography>
                  <Typography sx={{ textAlign: "right" }}><NumberFormat number={acceptedDiscount ? discount.amount : 0} /> VNĐ</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Tổng hóa đơn:</Typography>
                  <Typography sx={{ textAlign: "right" }}><NumberFormat number={acceptedDiscount ? subTotal - discount.amount : subTotal} /> VNĐ</Typography>
                </Box>
              </CardContent>
            </Card>

          </Grid>
          <Grid item xs={12}>
            <Paper style={{ maxHeight: 600, overflow: 'auto', backgroundColor: "transparent" }}>
              {productList.length >= 1 && productList.map(item => {
                return (
                  <CartItem item={item} />
                );
              })}
            </Paper>
          </Grid>
        </Grid>


      </Grid>
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

export default Payment;
