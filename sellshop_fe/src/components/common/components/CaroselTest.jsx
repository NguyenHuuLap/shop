import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import "../../assets/css/swiper.css"

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import AdsCaroselIndicator from "./AdsCaroselIndicator";
import { Card, CardMedia, formGroupClasses } from "@mui/material";
import { useEffect } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom'
import LoadingPage from "./LoadingPage";

export default function Carosel() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [discounts, setDiscounts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/discount/`)
        setDiscounts(response.data?.data)
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [])

  return !discounts ? (<></>) : (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        autoHeight={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {discounts.map((item, index) => {
          return (
            <SwiperSlide key={item.code}>
              <Card component={Link} to={`./discount/${item._id}`} >
                <CardMedia
                  component="img"
                  image={item.image}
                  sx={{ maxHeight: "512px", objectFit: "contain" }}
                />
              </Card>
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
        slidesPerView={discounts.length < 5 ? discounts.length : 5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="adsCaroselThumb"
      >
        {discounts.map((item, index) => {
          return (
            <SwiperSlide key={item.code}>
              <AdsCaroselIndicator content={item.name} />
            </SwiperSlide>
          );
        })}

      </Swiper>
    </>
  );
}
