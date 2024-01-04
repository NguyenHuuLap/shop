import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const AdsCaroselIndicator = () => {
  return (
    <>
      <Card
        sx={{
          height: "70px",
          width: "99.5%",
        }}
      >
        <CardContent
          sx={{
            py: "5px !important",
          }}
        >
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </CardContent>
      </Card>
    </>
  );
};

export default AdsCaroselIndicator;
