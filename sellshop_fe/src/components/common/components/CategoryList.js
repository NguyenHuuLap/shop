import * as React from "react";
import { Grid } from "@mui/material";
import Carosel from "./CaroselTest";
import CustomMegaMenu from "./CustomMegaMenu";

const CategoryList = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          md={9}
          sx={{
            position: "relativve",
          }}
        >
          <Carosel />
        </Grid>
      </Grid>
    </>
  );
};

export default CategoryList;
