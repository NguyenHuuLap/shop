import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Comment from "./Comment";
import ProductDetailRating from "./ProductDetailRating";
import { Card, CardContent } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DescriptionAndRating({
  desc,
  rating,
  comments,
  productSlug,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return !desc || !rating || !comments ? (
    <>Loading</>
  ) : (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Mô tả sản phẩm" {...a11yProps(0)} />
          <Tab label="Đánh giá và nhận xét" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Card>
          <CardContent>{desc}</CardContent>
        </Card>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ProductDetailRating
          comments={comments}
          rating={rating}
          productSlug={productSlug}
        />
      </CustomTabPanel>
    </Box>
  );
}
