import {
  Grid,
  Container,
  Toolbar,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from 'react-router-dom'
import axios from 'axios'
import LoadingPage from "../../../components/common/components/LoadingPage";
import NumberFormat from "../../../utils/NumberFormat";

const Discountt = () => {
  const { discountId } = useParams();
  const [discount, setDiscount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/discount/${discountId}`)
        setDiscount(response.data?.data)
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [])

  return !discount ? (<LoadingPage />) : (

    <Grid
      container
      sx={{
        maxWidth: "1250px",
        backgroundColor: "#eeebeb",
        display: "flex",
        margin: "auto",
        marginTop: "8px",
      }}
    >
      <Grid item xs={12}>
        <Toolbar
          sx={{
            flexDirection: "column",
            margin: "10px",
            backgroundColor: "#eeebeb",
            borderRadius: "10px",
            boxShadow: (theme) => theme.shadows[3],
            display: "flex",
          }}
        >

          <div className="ql-editor">
            <p className="ql-align-center" style={{ color: "black", fontSize: 40 }}>
              <strong>{discount.name}</strong>
            </p>
            <Typography>
              <Box>
                <strong>Mã Khuyến Mãi:</strong> {discount.code}
              </Box>
              <Box>
                <strong>Thời gian:</strong> {new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(new Date(discount.beginDate))} - {new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(new Date(discount.endDate))}
              </Box>
              <Box>
                <strong>Khuyến mãi:</strong> {discount.discountType === 'percent' ? discount.discount :  <NumberFormat number={discount.discount} />} {discount.discountType === 'percent' ? '%' : 'VNĐ'}
              </Box>
              <Box>
                <strong>Áp dụng cho đơn hàng từ:</strong> {discount.minimumTotal}
              </Box>
              <Box>
                <strong>Khuyến mãi tối đa:</strong> <NumberFormat number={discount.maximumApplied} /> VNĐ
              </Box>
            </Typography>

            <Card sx={{ my: 3 }}>
              <CardMedia
                component="img"
                image={discount.image}
                sx={{ maxHeight: "512px", objectFit: "contain" }}
              />
            </Card>
            <div dangerouslySetInnerHTML={{ __html: discount.desc }} />
          </div>

        </Toolbar>
      </Grid>
    </Grid>

  );
};

export default Discountt;
