import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  searchProducts,
  setBrand,
  setCategory,
  setKeyword,
  setMaxPrice,
  setMinPrice,
  setPage,
} from "../../../actions/SearchAction";
import { useEffect, useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "630px",
  [theme.breakpoints.up("xs")]: {
    marginLeft: theme.spacing(1),
    width: "630px",
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    textAlign: 'left',
    [theme.breakpoints.up('md')]: {
      width: '100ch',
      '&:focus': {
        width: '65ch',
      },
    },
  },
}));
const SearchButton = () => {
  const location = useLocation();
  const currentURL = location.pathname;
  const [searchKeyword, setSearchKeyword] = useState()
  const brand = useSelector((state) => state.search.brand);
  const minPrice = useSelector((state) => state.search.minPrice);
  const maxPrice = useSelector((state) => state.search.maxPrice);
  const category = useSelector((state) => state.search.category);
  const keyword = useSelector((state) => state.search.keyword);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (currentURL !== "/search") {
        dispatch(setCategory(""));
        dispatch(setBrand(""));
        dispatch(setMinPrice(0));
        dispatch(setMaxPrice(30000000));
        dispatch(searchProducts(0, 30000000, "", "", searchKeyword.trim(), 1));
        navigate(
          `/search?category=&minPrice=0&maxPrice=30000000&brand=&keyword=${encodeURIComponent(
            searchKeyword,
          )}&page=1`,
        );
      } else {
        dispatch(
          searchProducts(
            minPrice,
            maxPrice,
            category,
            brand,
            searchKeyword.trim(),
            1,
          ),
        );
        navigate(
          `/search?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&brand=${brand}&keyword=${encodeURIComponent(
            searchKeyword,
          )}&page=1`,
        );
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
    dispatch(setKeyword(event.target.value));
    if (currentURL !== "/search") {
      dispatch(setCategory(""));
      dispatch(setBrand(""));
      dispatch(setMinPrice(0));
      dispatch(setMaxPrice(30000000));
      dispatch(
        searchProducts(0, 30000000, "", "", event.target.value.trim(), 1),
      );
      // navigate(`/search?category=&minPrice=0&maxPrice=100000000&brand=&keyword=${encodeURIComponent(event.target.value)}&page=1`);
    } else {
      dispatch(
        searchProducts(
          minPrice,
          maxPrice,
          category,
          brand,
          event.target.value.trim(),
          1,
        ),
      );
      navigate(
        `/search?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&brand=${brand}&keyword=${encodeURIComponent(
          event.target.value,
        )}&page=1`,
      );
    }
  };

  useEffect(() => {
    if (currentURL === "/search") {
      setSearchKeyword(keyword);
    } else {
      setSearchKeyword("");
    }
  }, [currentURL])

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        sx={{ alignItems: "left" }}
        value={searchKeyword}
        onKeyDown={handleKeyDown}
        onChange={handleSearchChange}
      />
    </Search>
  );
};
export default SearchButton;
