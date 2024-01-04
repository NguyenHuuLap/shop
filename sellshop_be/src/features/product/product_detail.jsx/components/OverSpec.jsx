import {
  faDesktop,
  faHardDrive,
  faLaptop,
  faMemory,
  faMicrochip,
  faCheck,
  faBattery,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardContent,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import * as React from "react";
import "swiper/css";
import "swiper/css/pagination";

const OverSpecCard = styled(Card)({
  backgroundColor: "#f8f9fa",
  border: "1px solid #e9ecef",
  boxShadow: "none",
});

const GetIcon = {
  ram: { faMemory },
  cpu: { faMicrochip },
  "o-cung": { faHardDrive },
  "man-hinh": { faDesktop },
  card: { faDesktop },
};

export const GetIcons = ({ variantKey }) => {
  if (variantKey == "ram") return <FontAwesomeIcon icon={faMemory} />;
  else if (variantKey === "card") return <FontAwesomeIcon icon={faDesktop} />;
  else if (variantKey === "cpu") return <FontAwesomeIcon icon={faMicrochip} />;
  else if (variantKey === "o-cung")
    return <FontAwesomeIcon icon={faHardDrive} />;
  else if (variantKey === "man-hinh")
    return <FontAwesomeIcon icon={faLaptop} />;
  else if (variantKey === "pin") return <FontAwesomeIcon icon={faBattery} />;
  else return <FontAwesomeIcon icon={faCheck} />;
};

const OverSpec = ({ setOpen, overSpecs }) => {
  return !overSpecs ? (
    <>Loading</>
  ) : (
    <OverSpecCard>
      <CardContent>
        <List>
          {overSpecs.map((item, index) => {
            return (
              <ListItem sx={{ p: 0 }} key={index}>
                <ListItemIcon sx={{ minWidth: "0px", mr: 2 }}>
                  <GetIcons variantKey={item.key} />
                </ListItemIcon>
                <ListItemText primary={item.name + ": " + item.values[0]} />
              </ListItem>
            );
          })}
        </List>
        <Button
          variant="text"
          onClick={() => setOpen(true)}
          sx={{ width: "100%" }}
        >
          Cấu hình chi tiết
        </Button>
      </CardContent>
    </OverSpecCard>
  );
};

export default OverSpec;
