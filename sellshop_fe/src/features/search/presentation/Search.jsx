import { Grid, Pagination, Box, ToggleButtonGroup } from "@mui/material";
import * as React from "react";
import ProductGrid from "../components/ProductGrid";
import Filter from "../components/Filter";
import { CustomToggleButton } from "../../../components/common/components/CustomToggleButton";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { searchProducts, setCategory, setPage } from "../../../actions/SearchAction";
import LoadingPage from "../../../components/common/components/LoadingPage";

const Search = () => {
    const brand = useSelector((state) => state.search.brand);
    const minPrice = useSelector((state) => state.search.minPrice);
    const maxPrice = useSelector((state) => state.search.maxPrice);
    const category = useSelector((state) => state.search.category);
    const keyword = useSelector((state) => state.search.keyword);
    const page = useSelector((state) => state.search.page);
    const amount = useSelector((state) => state.search.amount);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [displayCategory, setDisplayCategory] = React.useState(null);
    const [displayCategoryList, setDisplayCategoryList] = React.useState([]);
  
    const handleChange = async (event, newDisplayCategory) => {
        if (newDisplayCategory !== null) {
          dispatch(setCategory(newDisplayCategory));
          dispatch(
            searchProducts(minPrice, maxPrice, newDisplayCategory, brand, keyword),
          );
          setDisplayCategory(newDisplayCategory);
          navigate(
            `/search?category=${newDisplayCategory}&minPrice=${minPrice}&maxPrice=${maxPrice}&brand=${brand}&keyword=${encodeURIComponent(
              keyword,
            )}`,
          );
        }
      };

      React.useEffect(() => {
        const fetchData = async () => {
          try {
            setDisplayCategoryList([]);
            const response = await axios.get(`http://localhost:3030/category/`);
            const data = response.data;
            const searchParams = new URLSearchParams(location.search);
            if (
              searchParams.get("category") === "" ||
              (searchParams.get("category") &&
                data.find((value) => value.slug === searchParams.get("category")))
            ) {
              dispatch(setCategory(searchParams.get("category")));
              setDisplayCategory(searchParams.get("category"));
            }
            setDisplayCategoryList(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
        dispatch(
          searchProducts(minPrice, maxPrice, category, brand, keyword, page),
        );
      }, []);

      React.useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:3030/category/`);
            const data = response.data;
            const searchParams = new URLSearchParams(location.search);
            if (
              searchParams.get("category") &&
              data.find((value) => value.slug === searchParams.get("category"))
            ) {
              dispatch(setCategory(searchParams.get("category")));
              setDisplayCategory(searchParams.get("category"));
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
        dispatch(
          searchProducts(minPrice, maxPrice, category, brand, keyword, page),
        );
      }, [category, dispatch]);
    
      const handlePaginator = (event, value) => {
        dispatch(setPage(value));
        dispatch(
          searchProducts(minPrice, maxPrice, category, brand, keyword, value),
        );
      };

      return !displayCategoryList ? (
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
            <Grid container spacing={3}>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <ToggleButtonGroup
                  color="primary"
                  value={displayCategory}
                  exclusive
                  onChange={handleChange}
                >
                  <CustomToggleButton value={""}>Tất cả</CustomToggleButton>
                  {displayCategoryList
                    .sort((a, b) => a.numOrder - b.numOrder)
                    .map((item, index) => {
                      return (
                        <CustomToggleButton value={item.slug}>
                          {item.name}
                        </CustomToggleButton>
                      );
                    })}
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
    
          <Grid item xs={5} sm={4} md={3}>
            <Filter />
          </Grid>
    
          <Grid item xs={7} sm={8} md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ProductGrid />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Pagination
                    page={page}
                    onChange={handlePaginator}
                    count={Math.round(amount / 9)}
                    variant="outlined"
                    color="primary"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    };
    
    export default Search;