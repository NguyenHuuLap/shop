import React, { useState } from "react";

import { Grid, Typography, Box, Button } from "@mui/material";
import imgEmpty from "../../../assets/images/img_look_up_arranty.png";
import { useSelector } from "react-redux";

const dataButtons = [
  { title: "Tất cả", buttonName: "all", path: "" },
  { title: "Đã tiếp nhận", buttonName: "received", path: "" },
  { title: "Đang điều phối", buttonName: "coordinating", path: "" },
  { title: "Đang sửa", buttonName: "fixing", path: "" },
  { title: "Đã sửa xong", buttonName: "hasbeenfixed", path: "" },
  { title: "Đã trả máy", buttonName: "phonereturned", path: "" },
];
const WarrantyButtons = ({
  title,
  buttonName,
  activeButton,
  path,
  onClick,
}) => (
  <Button
    sx={{
      py: 0.5,
      marginBottom: "14px",
      minHeight: "35px",
      borderRadius: "10px",
      "--Grid-borderWidth": "1px",
      border: "var(--Grid-borderWidth) solid",
      display: "flex",
      marginLeft: "20px",
      fontSize: "16px",
      textTransform: "none",
      backgroundColor: activeButton === buttonName ? "#A2C7FF" : "inherit",
    }}
    onClick={() => onClick(buttonName, path)}
  >
    {title}
  </Button>
);
const LookUpWarranty = () => {
  const [activeButton, setActiveButton] = useState(null);
  const user = useSelector((state) => state.user.user);
  const handleButtonClick = (buttonName, path) => {
    setActiveButton((prevButton) =>
      prevButton === buttonName ? null : buttonName,
    );
  };
  return (
    <>
      <Grid
        container
        item
        sx={{ position: "relative" }}
        spacing={4}
        direction="row"
        width={950}
      >
        <Grid item sx={{ position: "relativve", alignItems: "center" }}>
          <Grid
            container
            item
            marginLeft={10}
            sx={{ position: "relative", marginTop: "14px" }}
          >
            {dataButtons.map((warrantyButtons, index) => (
              <WarrantyButtons
                key={index}
                title={warrantyButtons.title}
                buttonName={warrantyButtons.buttonName}
                path={warrantyButtons.path}
                activeButton={activeButton}
                onClick={handleButtonClick}
              />
            ))}
          </Grid>
          <Grid sx={{ marginTop: "10px", marginBottom: "500px" }}>
            <Box>
              <img src={imgEmpty} />
              <Typography>Không có phiếu bảo hành nào thỏa mãn</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default LookUpWarranty;
