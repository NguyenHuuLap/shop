import BlockMenu from "../components/BlockMenu";
import { Grid } from "@mui/material";

const Profile = () => {
  return (
    <>
      <Grid
        container
        sx={{
          maxWidth: "1200px",
          display: "flex",
          margin: "auto",
          marginTop: "10px",
          borderRadius: "10px",
        }}
      >
        <BlockMenu />
      </Grid>
    </>
  );
};
export default Profile;
