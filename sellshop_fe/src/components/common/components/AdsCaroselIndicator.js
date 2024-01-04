import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const AdsCaroselIndicator = ({ content }) => {
  return (

    <Card
      sx={{
        height: "70px",
        width: "99.5%",
      }}
    >
      <CardContent
        sx={{
          py: "5px !important",
          display: "flex",
          alignItems: "center",
          height: "100%",
          width: "100%"
        }}
      >
        <Typography
          sx={{ fontSize: "18px", fontWeight: "bold", width: "100%" }}
          textAlign="center"
        >
          {content}
        </Typography>
      </CardContent>
    </Card>

  );
};

export default AdsCaroselIndicator;
