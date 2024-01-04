import * as React from "react";
import {
  Card,
  CardContent,
  Stack,
  CardMedia,
  Typography,
  Box,
  Paper,
  Rating,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import NumberFormat from "../../../utils/NumberFormat";
import axios from "axios";

const TitleTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  fontSize: "16px",
  fontWeight: "bold",
  lineHeight: 1.2,
  height: 60,
  overflow: "hidden",
  whiteSpace: "pre-wrap",
  color: "black",
  ":hover": {
    color: "blue",
  },
});

const CustomCard = ({ data, variant }) => {
  return !data ? (
    <></>
  ) : (
    <Card>
      <CardMedia
        component="img"
        height="200px"
        image={data.specPicture}
        sx={{ padding: "auto", pt: 3, objectFit: "contain" }}
      />
      <CardContent sx={{ pb: 0, pt: 0.5 }}>
        <Link
          to={
            `/product-detail/${data.slug ? data.slug : data._id}` +
            `${variant ? "/" + variant.sku : "/" + data.variants[0].sku}`
          }
        >
          <Box sx={{ overflow: "hidden" }} underline="none">
            <TitleTypography variant="h6">{data.name}</TitleTypography>
          </Box>
        </Link>

        <Paper
          sx={{
            p: 1,
            boxShadow: 0,
            backgroundColor: "#F3F4F6",
            mt: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            {variant ? variant.variantName : "Tất cả các dòng"}
          </Typography>
        </Paper>

        {variant ? (
          <Stack mt={2} direction="row" spacing={1} sx={{ width: "100%" }}>
            <Typography
              variant="body1"
              sx={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              <NumberFormat number={variant.price} />₫
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textDecoration: "line-through",
                pt: 0.5,
                fontWeight: "bold",
              }}
            >
              <NumberFormat number={variant.marketPrice} />₫
            </Typography>
          </Stack>
        ) : (
          <Stack mt={2} direction="row" spacing={1} justifyContent="center">
            <Typography
              variant="body1"
              sx={{
                color: "#1976d2",
                fontWeight: "bold",
              }}
            >
              <NumberFormat number={data.minPrice} />₫
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#1976d2",
                fontWeight: "bold",
              }}
            >
              -
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#1976d2",
                fontWeight: "bold",
              }}
            >
              <NumberFormat number={data.maxPrice} />₫
            </Typography>
          </Stack>
        )}
        <Rating readOnly value={data.rates} />
      </CardContent>
    </Card>
  );
};

export default CustomCard;
