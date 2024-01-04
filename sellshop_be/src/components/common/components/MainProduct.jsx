import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import * as React from "react";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "../../../assets/css/swiper.css";
import { Autoplay, Grid, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTheme } from "@mui/system";
import CustomCard from "./CustomCard";

const MainProduct = ({ title, gridRows, data, displayVariant }) => {
  const swiperRef = useRef();
  const theme = useTheme();
  const media = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Card
      sx={{
        position: "relative",
        boxShadow: 0,
        border: 0,
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          component="div"
          sx={{ fontSize: "23px", fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <Swiper
          spaceBetween={10}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={media ? 3 : 4}
          grid={{
            rows: gridRows,
            fill: "row",
          }}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay, Grid]}
          className="main-product-swiper"
        >
          {!displayVariant
            ? data.map((item) => {
                return (
                  <SwiperSlide>
                    <CustomCard data={item} />
                  </SwiperSlide>
                );
              })
            : data.map((item) =>
                item.variants.map((i) => {
                  return (
                    <SwiperSlide key={i.sku}>
                      <CustomCard data={item} variant={i} />
                    </SwiperSlide>
                  );
                }),
              )}
        </Swiper>

        <IconButton
          onClick={() => swiperRef.current.slidePrev()}
          sx={{
            color: "black",
            position: "absolute",
            top: "50%",
            left: "8px",
            zIndex: 10000,
            backgroundColor: "#dedede !important",
            opacity: "70%",
            boxShadow: 4,
          }}
        >
          <ArrowBackIosRounded
            sx={{
              fontSize: "30px",
            }}
          />
        </IconButton>
        <IconButton
          onClick={() => swiperRef.current.slideNext()}
          sx={{
            color: "black",
            position: "absolute",
            top: "50%",
            right: "8px",
            zIndex: 10000,
            backgroundColor: "#dedede !important",
            opacity: "70%",
            boxShadow: 10,
          }}
        >
          <ArrowForwardIosRounded
            sx={{
              fontSize: "30px",
            }}
          />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default MainProduct;
