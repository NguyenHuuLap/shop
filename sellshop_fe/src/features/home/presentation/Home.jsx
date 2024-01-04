import * as React from "react";
import { Grid } from "@mui/material";
import CategoryList from "../../../components/common/components/CategoryList.js";
import AdsFullWidth from "../../../components/common/components/AdsFullWidth.js";
import MainProduct from "../../../components/common/components/MainProduct.jsx";
import axios from "axios";
import Carosel from "../../../components/common/components/CaroselTest.jsx";
import LoadingPage from "../../../components/common/components/LoadingPage.jsx";

const Home = () => {
  const [productList, setProductList] = React.useState([]);
  const [mostViewProductList, setMostViewProductList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleLoading = () => {
    setIsLoading(false);
  };

  // React.useEffect(() => {
  //     window.addEventListener("load", handleLoading);
  //     return () => window.removeEventListener("load", handleLoading);
  // }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3030/product/").then((value) => {
          value.data.forEach((item) => {
            setProductList((productList) => [item, ...productList]);
          });
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:3030/product/newest")
          .then((value) => {
            value.data.forEach((item) => {
              setProductList((productList) => [item, ...productList]);
            });
          });
        await axios
          .get("http://localhost:3030/product/most-view")
          .then((value) => {
            value.data.forEach((item) => {
              setMostViewProductList((mostViewProductList) => [
                item,
                ...mostViewProductList,
              ]);
            });
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  return !mostViewProductList || !productList || mostViewProductList.length === 0 || productList.length === 0 ? (
    <LoadingPage />
  ) : (
    <Grid
      container
      spacing={3}
      sx={{
        maxWidth: "1200px",
        display: "flex",
        margin: "auto",
      }}
    >
      <Grid item xs={12}>
        <Carosel />
      </Grid>
      <Grid item xs={12}>
        <AdsFullWidth />
      </Grid>
      <Grid item xs={12}>
        {/* <MainSale /> */}
      </Grid>

      <Grid item xs={12}>
        <MainProduct
          title="SẢN PHẨM MỚI"
          gridRows={2}
          data={productList}
          displayVariant={false}
        />
      </Grid>

      <Grid item xs={12}>
        <MainProduct
          title="XU HƯỚNG MUA SẮM"
          gridRows={2}
          data={mostViewProductList}
          displayVariant={false}
        />
      </Grid>
    </Grid>
  );
};

export default Home;