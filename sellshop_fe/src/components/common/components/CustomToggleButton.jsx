import { styled } from "@mui/styles";
import { ToggleButton } from "@mui/material";

export const CustomToggleButton = styled(ToggleButton)({
  margin: "auto 10px",
  backgroundColor: "#f8f9fa",
  color: "black",
  border: "1px solid #e9ecef !important",
  borderRadius: "10px !important",
  fontWeight: 600,
  padding: 7,
  [`&.Mui-selected`]: {
    backgroundColor: "#1976d2",
    borderColor: "#1976d2",
    color: "white",
  },
  [`&.Mui-selected:hover`]: {
    backgroundColor: "#0a5cad",
    borderColor: "#1976d2",
    color: "white",
  },
});
