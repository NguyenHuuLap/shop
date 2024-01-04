import React, { useEffect, useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  searchProducts,
  setBrand,
  setCategory,
  setMaxPrice,
  setMinPrice,
} from "../../../actions/SearchAction";

const CategoryBar = () => {
  const [cateogryList, setCategoryList] = useState(null);
  const brand = useSelector((state) => state.search.brand);
  const minPrice = useSelector((state) => state.search.minPrice);
  const maxPrice = useSelector((state) => state.search.maxPrice);
  const category = useSelector((state) => state.search.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async (page) => {
      try {
        setCategoryList([]);
        const response = await axios.get(`http://localhost:3030/category/`);
        const data = response.data;
        setCategoryList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (slug) => {
    dispatch(setCategory(slug));
    dispatch(setMinPrice(0));
    dispatch(setMaxPrice(30000000));
    dispatch(setBrand(""));
    dispatch(searchProducts(0, 30000000, slug, ""));
    navigate(
      `/search?category=${slug}&minPrice=${0}&maxPrice=${30000000}&brand=`,
    );
  };

  return !cateogryList ? (
    <></>
  ) : (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        backgroundColor: "#242424",
        justifyContent: "center",
      }}
    >
      <Grid container sx={{ maxWidth: "1200px" }}>
        {cateogryList
          .sort((a, b) => a.numOrder - b.numOrder)
          .map((item, index) => {
            return (
              <Grid key={index} item xs={12 / cateogryList.length}>
                <Button
                  onClick={(e) => handleCategoryClick(item.slug)}
                  sx={{ color: "white", width: "100%" }}
                >
                  {item.name}
                </Button>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default CategoryBar;
