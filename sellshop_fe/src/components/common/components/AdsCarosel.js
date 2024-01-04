import React from "react";
import Carousel from "react-material-ui-carousel";
import {
  Paper,
  Button,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Box,
} from "@mui/material";
import AdsCaroselIndicator from "./AdsCaroselIndicator";
import { BorderLeft } from "@mui/icons-material";

function AdsCarosel(props) {
  var items = [
    {
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:80/plain/https://dashboard.cellphones.com.vn/storage/Sliding%20iPhone%2015.png",
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:80/plain/https://dashboard.cellphones.com.vn/storage/sliding-fold-th9-ver1.png",
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];

  return (
    <Carousel
      animation="slide"
      autoPlay="true"
      stopAutoPlayOnHover="true"
      IndicatorIcon={<AdsCaroselIndicator />}
      indicatorIconButtonProps={{
        style: {
          width: "50%",
          borderRadius: "0px",
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          borderBottom: "3px solid red",
        },
      }}
      indicatorContainerProps={{
        style: {
          zIndex: 400,
          position: "absolute",
          bottom: "0px", // 5
        },
      }}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Card>
      <CardMedia
        component="img"
        sx={{ height: 345 }}
        image={props.item.image}
      />

      <CardContent>
        <Box
          sx={{
            width: "100%",
            height: "30px",
          }}
        ></Box>
      </CardContent>
    </Card>
  );
}

export default AdsCarosel;
