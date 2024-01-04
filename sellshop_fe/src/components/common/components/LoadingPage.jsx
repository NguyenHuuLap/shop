import React from "react";
import { Alert, Box, Backdrop, CircularProgress, CardMedia } from "@mui/material";

const LoadingPage = () => {
    return (
        <Backdrop
            sx={{ color: '#66E3E7', backgroundColor: "#ffffff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >

            <img width={180} src={require("../../../assets/images/logo/logo.png")}/>
            <CircularProgress color="inherit" size={250} sx={{position: "absolute"}}/>
        </Backdrop>
    );
};

export default LoadingPage;
