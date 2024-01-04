import { Grid } from "@mui/material";
import * as React from "react";
import CustomCard from "../../../components/common/components/CustomCard";
import { useSelector } from "react-redux";

const ProductGrid = ({ searchUrl }) => {
  const brand = useSelector((state) => state.search.brand);
  const minPrice = useSelector((state) => state.search.minPrice);
  const maxPrice = useSelector((state) => state.search.maxPrice);
  const category = useSelector((state) => state.search.category);
  const product = useSelector((state) => state.search.searchResults);

  return !product ? (
    <>Loading</>
  ) : (
    <Grid
      container
      spacing={1}
      sx={{
        maxWidth: "1200px",
        display: "flex",
        margin: "auto",
      }}
    >
      {product.map((item, index) => {
        return (
          <Grid item xs={4} key={index}>
            <CustomCard data={item} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductGrid;
