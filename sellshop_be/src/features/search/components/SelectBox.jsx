import {
    AccordionDetails,
    AccordionSummary,
    Accordion,
    Typography,
    Box,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormControl,
  } from "@mui/material";
  import * as React from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { searchProducts, setBrand } from "../../../actions/SearchAction";
  import axios from "axios";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  
  const SelectBox = ({ title, searchText, data }) => {
    const brand = useSelector((state) => state.search.brand);
    const minPrice = useSelector((state) => state.search.minPrice);
    const maxPrice = useSelector((state) => state.search.maxPrice);
    const category = useSelector((state) => state.search.category);
    const keyword = useSelector((state) => state.search.keyword);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [listBrand, setListBrand] = React.useState(null);
    const location = useLocation();
  
    React.useEffect(() => {
      const fecthData = async () => {
        try {
          setListBrand(null);
          const response = await axios.get(`http://localhost:3030/brand/`);
          const data1 = response.data.map((item) => ({
            ...item,
            checked: false,
          }));
          setListBrand(data1);
          console.log(data1);
  
          const searchParams = new URLSearchParams(location.search);
          if (searchParams.get(searchText)) {
            dispatch(setBrand(searchParams.get(searchText)));
          } else {
            dispatch(setBrand(""));
          }
  
          let searchValue = [];
          if (searchParams.get(searchText))
            searchValue = searchParams.get(searchText).split(",");
  
          const tempList = [...listBrand];
          const updateValue = tempList.map((item) => ({
            ...item,
            checked: searchValue.includes(item.key),
          }));
          setListBrand(updateValue);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fecthData();
    }, []);
  
    const handleChange = (event) => {
      const tempList = [...listBrand];
      const updateValue = tempList.map((item) => ({
        ...item,
        checked:
          event.target.name === item.slug ? event.target.checked : item.checked,
      }));
      console.log(updateValue);
      setListBrand(updateValue);
  
      const textParams = updateValue
        .filter((item) => item.checked)
        .map((item) => item.slug)
        .join(",");
  
      dispatch(setBrand(textParams));
  
      dispatch(searchProducts(minPrice, maxPrice, category, textParams, keyword));
      navigate(
        `/search?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&brand=${textParams}&keyword=${encodeURIComponent(
          keyword,
        )}&page=1`,
      );
    };
  
    return !listBrand ? (
      <>Loading</>
    ) : (
      <Box>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontSize: 16, fontWeight: 600, color: "black" }}>
              {title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx>
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                {listBrand.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          sx={{ py: 0 }}
                          checked={item.checked}
                          onChange={handleChange}
                          name={item.slug}
                        />
                      }
                      label={item.name}
                      sx={{ my: 0, py: 0 }}
                    />
                  );
                })}
              </FormGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  };
  
  export default SelectBox;
  