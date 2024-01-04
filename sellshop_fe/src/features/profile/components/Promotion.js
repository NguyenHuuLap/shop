import { Avatar, Box, Grid, Typography, Button } from "@mui/material";
import React, { useState } from "react";

import imgLogo from "../../../assets/images/img_logo_50px.png";
import { useSelector } from "react-redux";

const dataButtons = [
  { title: "Ưu đãi TKMember", buttonName: "t", path: "" },
  { title: "Quà của bạn", buttonName: "a", path: "" },
];

const dataMemberButtons = [
  { title: "TK-Null", buttonName: "tknull", path: "" },
  { title: "TK-New", buttonName: "tknew", path: "" },
  { title: "TK-Mem", buttonName: "tkmem", path: "" },
  { title: "TK-Vip", buttonName: "tkvip", path: "" },
];

const PromotionButtons = ({
  title,
  buttonName,
  activeButton,
  path,
  onClick,
}) => (
  <Button
    sx={{
      py: 0.5,
      textTransform: "none",
      margin: "4px",
      width: "440px",
      backgroundColor: activeButton === buttonName ? "white" : null,
    }}
    onClick={() => onClick(buttonName, path)}
  >
    {title}
  </Button>
);

const TkMemberButtons = ({
  title,
  buttonName,
  activeButton,
  path,
  onClick,
}) => (
  <Box sx={{ textAlign: "center", marginRight: "100px" }}>
    <Avatar
      src={imgLogo}
      title={title}
      sx={{
        borderRadius: "100%",
        "--Grid-borderWidth": "2px",
        border: "var(--Grid-borderWidth) solid",
        borderColor: activeButton === buttonName ? "#A2C7FF" : "divider",
        width: "50px",
        height: "50px",
        textTransform: "none",
        backgroundColor: activeButton === buttonName ? "#7676801f" : "white",
      }}
      onClick={() => onClick(buttonName, path)}
    ></Avatar>
    <Typography>{title}</Typography>
  </Box>
);

const Promotion = () => {
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
        spacing={3}
        direction="row"
      >
        <Grid item sx={{ position: "relative", alignItems: "center" }}>
          <Box
            sx={{
              width: "900px",
              backgroundColor: "#7676801f",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            {dataButtons.map((promotionButtons, index) => (
              <PromotionButtons
                key={index}
                title={promotionButtons.title}
                buttonName={promotionButtons.buttonName}
                path={promotionButtons.path}
                activeButton={activeButton}
                onClick={handleButtonClick}
              />
            ))}
          </Box>
          <Box sx={{ width: "930px", marginBottom: "500px" }}>
            <Grid container justifyContent="center" spacing={2}>
              {dataMemberButtons.map((tkMemberButtons, index) => (
                <Grid item key={index}>
                  <TkMemberButtons
                    title={tkMemberButtons.title}
                    buttonName={tkMemberButtons.buttonName}
                    path={tkMemberButtons.path}
                    activeButton={activeButton}
                    onClick={handleButtonClick}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Promotion;
