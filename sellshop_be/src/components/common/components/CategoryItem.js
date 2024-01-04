import * as React from "react";
import {
  Stack,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const CategoryItem = () => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        <List
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          sx={{
            width: "100%",
            position: "absolute",
            zIndex: "500",
            backgroundColor: "white",
            display: "none",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: "100%",
            }}
          >
            <ListItem>
              <Box>
                <Typography
                  sx={{ mt: 2, textAlign: "center", fontWeight: 600 }}
                  variant="h6"
                  component="div"
                >
                  Hãng
                </Typography>
                <List>
                  <ListItem
                    sx={{
                      py: "0px",
                    }}
                  >
                    <ListItemText primary="Dell" />
                  </ListItem>

                  <ListItem
                    sx={{
                      py: "0px",
                    }}
                  >
                    <ListItemText primary="Asus" />
                  </ListItem>

                  <ListItem
                    sx={{
                      py: "0px",
                    }}
                  >
                    <ListItemText primary="Acer" />
                  </ListItem>
                </List>
              </Box>
            </ListItem>

            <ListItem>
              <Box>
                <Typography
                  sx={{ mt: 2, textAlign: "center", fontWeight: 600 }}
                  variant="h6"
                  component="div"
                >
                  Hãng
                </Typography>
                <List>
                  <ListItem
                    sx={{
                      py: "0px",
                    }}
                  >
                    <ListItemText primary="Dell" />
                  </ListItem>

                  <ListItem
                    sx={{
                      py: "0px",
                    }}
                  >
                    <ListItemText primary="Asus" />
                  </ListItem>

                  <ListItem
                    sx={{
                      py: "0px",
                    }}
                  >
                    <ListItemText primary="Acer" />
                  </ListItem>
                </List>
              </Box>
            </ListItem>

            <ListItem>
              <Box>
                <Typography
                  sx={{ mt: 2, textAlign: "center", fontWeight: 600 }}
                  variant="h6"
                  component="div"
                >
                  Hãng
                </Typography>
                <List>
                  <ListItem
                    sx={{
                      py: "0px",
                    }}
                  >
                    <ListItemText primary="Dell" />
                  </ListItem>

                  <ListItem
                    sx={{
                      py: "0px",
                    }}
                  >
                    <ListItemText primary="Asus" />
                  </ListItem>

                  <ListItem
                    sx={{
                      py: "0px",
                    }}
                  >
                    <ListItemText primary="Acer" />
                  </ListItem>
                </List>
              </Box>
            </ListItem>
          </Stack>
        </List>
      </Box>
    </>
  );
};

export default CategoryItem;
