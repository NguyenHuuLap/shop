import * as React from "react";
import { useRef } from "react";
import {
  styled,
  Button,
  Card,
  CardContent,
  Stack,
  IconButton,
} from "@mui/material";
import {
  ArrowForwardIosRounded,
  ArrowBackIosRounded,
} from "@mui/icons-material";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";

import CustomCard from "./CustomCard";

const CustomButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "white",
  borderColor: "black",
  color: "black",
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
    color: "white",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    color: "white",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    color: "white",
  },
});

const MainSale = () => {
  const swiperRef = useRef();
  return (
    <>
      <Card
        sx={{
          background: "linear-gradient(red, black)",
          position: "relative",
        }}
      >
        <CardContent>
          <Stack spacing={2} my={2} direction="row">
            <CustomButton variant="contained">Laptop</CustomButton>
            <CustomButton variant="contained">Phụ kiện</CustomButton>
            <CustomButton variant="contained">Điện thoại</CustomButton>
          </Stack>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={4}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
          >
            <SwiperSlide>
              <CustomCard />
            </SwiperSlide>
            <SwiperSlide>
              <CustomCard />
            </SwiperSlide>
            <SwiperSlide>
              <CustomCard />
            </SwiperSlide>
            <SwiperSlide>
              <CustomCard />
            </SwiperSlide>
            <SwiperSlide>
              <CustomCard />
            </SwiperSlide>
            <SwiperSlide>
              <CustomCard />
            </SwiperSlide>
            <SwiperSlide>
              <CustomCard />
            </SwiperSlide>
            <SwiperSlide>
              <CustomCard />
            </SwiperSlide>
            <SwiperSlide>
              <CustomCard />
            </SwiperSlide>
          </Swiper>

          <IconButton
            onClick={() => swiperRef.current.slidePrev()}
            color="primary"
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
            color="primary"
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
    </>
  );
};

export default MainSale;
