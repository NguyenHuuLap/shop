import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Slider,
  Divider,
  Input,
  Button,  // Add this line to import the Button component
} from "@mui/material";
import * as React from "react";
import { NumericFormat } from "react-number-format";
import { useLocation, useNavigate } from "react-router-dom";
import SelectBox from "./SelectBox";
import { useDispatch, useSelector } from "react-redux";
import {
  searchProducts,
  setMaxPrice,
  setMinPrice,
} from "../../../actions/SearchAction";

const testList = [
  { checked: false, name: "Dell", key: "dell" },
  { checked: false, name: "ASUS", key: "asus" },
];

const Filter = () => {
  const dispatch = useDispatch();
  const brand = useSelector((state) => state.search.brand);
  const minPrice = useSelector((state) => state.search.minPrice);
  const maxPrice = useSelector((state) => state.search.maxPrice);
  const category = useSelector((state) => state.search.category);
  const keyword = useSelector((state) => state.search.keyword);
  const [brandList, setBrandList] = React.useState();
  const location = useLocation();
  const [value, setValue] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const initalPrice = () => {
      const searchParams = new URLSearchParams(location.search);
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      setValue([minPrice, maxPrice]);
      dispatch(setMinPrice(minPrice));
      dispatch(setMaxPrice(maxPrice));
    };
    initalPrice();
    dispatch(searchProducts(minPrice, maxPrice, category, brand, keyword));
  }, [category]);

  const handlePriceChange = (event, newValue) => {
    setValue(newValue);
  };


  // const handlePriceChangeWhenMouseRelease = (event, newValue) => {
  //   setValue(newValue);
  //   dispatch(setMinPrice(newValue[0]));
  //   dispatch(setMaxPrice(newValue[1]));
  //   dispatch(searchProducts(newValue[0], newValue[1], category, brand, keyword));
  //   navigate(`/search?category=${category}&minPrice=${newValue[0]}&maxPrice=${newValue[1]}&brand=${brand}&keyword=${encodeURIComponent(keyword)}&page=1`)
  // };
  const handleSearchButtonClick = () => {
    // Dispatch the search action based on the current values
    dispatch(searchProducts(value[0], value[1], category, brand, keyword));
    // Add any additional logic or redirection if needed
  };

  return !value ? (<>Loading</>) : (
    <Card>
      <CardContent>
        <Grid container spacing={3}
          sx={{
            maxWidth: "1200px",
            display: "flex",

          }}
        >
          {/* <Grid item xs={12}>
            <SelectBox title="Thương hiệu" searchText="brand" data={testList} color="#ee4d2d" background-color="#ee4d2d" />
          </Grid> */}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#ee4d2d", mb: 1 }}>
            Giá
            </Typography>
            <Box>
              <NumericFormat
                value={value[0]}
                thousandSeparator=","
                endAdornment="đ"
                prefix=""
                customInput={Input}
                readOnly
                sx={{ color: "#ee4d2d", fontWeight: 600 }}
              />
              <NumericFormat
                value={value[1]}
                thousandSeparator=","
                prefix=""
                endAdornment="đ"
                customInput={Input}
                readOnly
                sx={{ color: "#ee4d2d", fontWeight: 600 }}
              />
            </Box>
            <Box>
              <Slider getAriaLabel={() => 'Price range'}
                max={30000000}
                min={0}
                step={100000}
                value={value}
                //onChangeCommitted={handlePriceChangeWhenMouseRelease}
                onChange={handlePriceChange} 
                sx={{ color: "#ee4d2d"}}
                />
              <Button
                variant="contained"
                sx={{ marginLeft: '10px', color: "#ee4d2d", backgroundColor: "rgba(255,87,34,.1)"}}
                onClick={handleSearchButtonClick}
                
              >
                Tìm kiếm
              </Button>
            </Box>
          </Grid>       
        </Grid >
      </CardContent>
    </Card>
  );
}



export default Filter;
