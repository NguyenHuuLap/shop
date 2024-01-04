import {
  CheckCircleOutlineRounded,
  ErrorOutlineRounded,
} from "@mui/icons-material";
import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ConfirmAccount = () => {
  const { userId, tokenconfirm } = useParams();
  const [confirmSuccess, setConfirmSuccess] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("1");
        const response = await axios.get(
          `http://localhost:3030/auth/confirm/${userId}/${tokenconfirm}`,
        );
        console.log(response);
        if (response.status === 200) {
          setConfirmSuccess(true);
        }
      } catch (Err) {
        console.log(Err);
      }
    };
    fetchData();
  }, [userId, tokenconfirm]);

  return (
    <>
      <center>
        <Container sx={{ width: "1200px", marginTop: "15px" }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            spacing={2}
          >
            {confirmSuccess ? (
              <>
                <Grid item>
                  <CheckCircleOutlineRounded
                    color="success"
                    sx={{ fontSize: 80 }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h5" fontWeight={500} align="center">
                    Email đã được xác thực thành công!
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <ErrorOutlineRounded color="error" sx={{ fontSize: 80 }} />
                </Grid>
                <Grid item>
                  <Typography variant="h5" fontWeight={500} align="center">
                    Xác thực email không thành công. Vui lòng kiểm tra lại đường
                    dẫn.
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      </center>
    </>
  );
};

export default ConfirmAccount;
