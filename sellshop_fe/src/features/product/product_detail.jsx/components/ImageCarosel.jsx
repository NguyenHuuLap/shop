import React, { useRef, useState } from "react";
import { Box, Card, Grid } from "@mui/material";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "../../../../assets/css/swiper.css";

export default function ImageCarosel({ data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return !data ? (
    <>Loading</>
  ) : (
    <Card>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          height: "330px",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ width: "100%", my: 3 }}
              >
                <img
                  style={{
                    width: "50%",
                    minWidth: "300px",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={item}
                />
              </Grid>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        style={{
          height: "100px",
        }}
        onSwiper={setThumbsSwiper}
        spaceBetween={1}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="productDetailSwiperThumb"
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ height: "100%" }}
              >
                <Box sx={{ width: "80%", height: "80%" }}>
                  <img src={item} />
                </Box>
              </Grid>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Card>
  );
}
