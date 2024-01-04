import React from "react";
import { Alert, Snackbar } from "@mui/material";

const ShowSnackbar = ({ snackbarMessage }) => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [messageToShow, setMessageToShow] = React.useState("");
  React.useEffect(() => {
    if (snackbarMessage && snackbarMessage !== messageToShow) {
      setMessageToShow(snackbarMessage);
      setOpenSnackbar(true);
    }
  }, [snackbarMessage, messageToShow]);
  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={messageToShow.includes("thành công") ? "success" : "error"}
          sx={{ width: "350px" }}
        >
          {messageToShow}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShowSnackbar;
