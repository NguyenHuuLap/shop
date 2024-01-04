import { Container, Card, CardMedia } from "@mui/material";
import React from "react";

const AdsFullWidth = () => {
  return (
    <>
      <Card
        sx={{
          width: "100%",
          margin: "auto",
          boxShadow: 5,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "100%" }}
          image="https://cdn.tgdd.vn/2023/11/banner/IP15-1200-300-1200x300-1.png"
        />
      </Card>
    </>
  );
};

export default AdsFullWidth;
