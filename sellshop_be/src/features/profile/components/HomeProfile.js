import React from "react";
import { EventAvailable, Paid, WorkspacePremium } from "@mui/icons-material";
import { Avatar, Grid, Typography, Button, Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import img_youroffer from "../../../assets/images/gift-box.png";
import img_yourpurchase from "../../../assets/images/Shipper2.webp";
import img_yourranking from "../../../assets/images/crown.png";
import MainSale from "../../../components/common/components/MainSale";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const buttonData = [
  {
    img: img_youroffer,
    title: "Ưu đãi của bạn",
    count: "0 Ưu đãi",
    backgroundColor: "#fef5f0",
    path: "/your-offers",
  },
  {
    img: img_yourpurchase,
    title: "Đơn hàng của bạn",
    count: "0 Đơn hàng",
    backgroundColor: "#edf1fd",
    path: "/your-purchases",
  },
  {
    img: img_yourranking,
    title: "Hạng của bạn",
    count: "Bạn đang là TKNull",
    backgroundColor: "#f1f8fe",
    path: "/your-ranking",
  },
];

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

const HomeProfile = () => {
  const user = useSelector((state) => state.user.user);
  let formattedDate = "";
  if (user && user.createdAt) {
    formattedDate = format(new Date(user.createdAt), "dd/MM/yyyy");
  }
  const handleButtonClick = (path) => {
    console.log(path);
  };

  return (
    <>
      <Grid container item sx={{ position: "relative" }} spacing={2}>
        <Grid item sx={{ position: "relativve" }}>
          <Grid
            sx={{
              "--Grid-borderWidth": "1px",
              border: "var(--Grid-borderWidth) solid",
              borderColor: "divider",
              height: "auto",
              width: "450px",
              borderRadius: "10px",
            }}
          >
            <center>
              <Avatar
                src={user?.avatar}
                sx={{
                  border: "2px solid #1976d2",
                  width: 60,
                  height: 60,
                  marginTop: "8px",
                }}
              />
              <Typography variant="body1">Xin chào</Typography>
              <Typography variant="h5" fontWeight="bold" color="#1976d2">
                {user?.firstname}
              </Typography>
              <Grid
                container
                spacing={1}
                sx={{ marginTop: "8px", marginBottom: "4px" }}
              >
                <Grid item xs={4}>
                  <Typography>Ngày tham gia</Typography>
                  <EventAvailable
                    sx={{
                      width: "60px",
                      color: "#4287ED",
                      height: "60px",
                      marginTop: "4px",
                    }}
                  />
                  <Typography>{!formattedDate}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Hạng thành viên</Typography>
                  <WorkspacePremium
                    sx={{
                      width: "60px",
                      color: "#4287ED",
                      height: "60px",
                      marginTop: "4px",
                    }}
                  />
                  <Typography>TKNull</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Điểm tích lũy từ 01/01/2022</Typography>
                  <Paid
                    sx={{
                      width: "60px",
                      color: "#4287ED",
                      height: "60px",
                      marginTop: "4px",
                    }}
                  />
                  <Typography>0</Typography>
                </Grid>
              </Grid>
            </center>
          </Grid>
        </Grid>
        <Grid item sx={{ position: "relativve" }}>
          <Grid
            sx={{
              "--Grid-borderWidth": "1px",
              border: "var(--Grid-borderWidth) solid",
              borderColor: "divider",
              height: "286px",
              width: "450px",
              borderRadius: "10px",
              backgroundColor: "#fef5f0",
            }}
          >
            <center>
              <Typography
                variant="h6"
                sx={{
                  width: "260px",
                  borderRadius: "10px",
                  color: "white",
                  marginTop: "14px",
                  backgroundColor: "#4287ED",
                }}
              >
                CHƯƠNG TRÌNH NỔI BẬT
              </Typography>
              <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                <Carousel>
                  {images.map((item, index) => (
                    <img
                      key={index}
                      src={item.imgPath}
                      style={{
                        marginTop: "8px",
                        width: "100%",
                        height: "200px",
                      }}
                    />
                  ))}
                </Carousel>
              </Box>
            </center>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item sx={{ position: "relative", marginTop: "14px" }}>
        {buttonData.map((button, index) => (
          <Grid
            key={index}
            sx={{
              "--Grid-borderWidth": "1px",
              border: "var(--Grid-borderWidth) solid",
              marginLeft: index !== 0 ? "12px" : "0",
              borderColor: "divider",
              height: "286px",
              width: "297px",
              borderRadius: "10px",
              backgroundColor: button.backgroundColor,
            }}
          >
            <Avatar
              src={button.img}
              sx={{
                border: "2px solid #1976d2",
                width: 60,
                height: 60,
                marginTop: "20px",
              }}
            />
            <Typography
              sx={{ fontWeight: "bold", fontSize: "22px", marginTop: "10px" }}
            >
              {button.title}
            </Typography>
            <Typography variant="h6" sx={{ color: "#777", fontSize: "18px" }}>
              {button.count}
            </Typography>
            <Button
              onClick={() => handleButtonClick(button.path)}
              sx={{
                marginTop: "70px",
                width: "150px",
                height: "40px",
                borderRadius: "20px",

                backgroundColor: "#ffffff",
                "&:hover": {
                  backgroundColor: "#A2C7FF",
                },
              }}
            >
              Xem chi tiết
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid container item width={925} marginTop={2}>
        <MainSale />
      </Grid>
      <Typography
        sx={{
          textAlign: "left",
          fontWeight: "bold",
          marginTop: "14px",
          marginBottom: "100px",
        }}
      >
        Tin tức khuyến mãi
      </Typography>
    </>
  );
};
export default HomeProfile;
