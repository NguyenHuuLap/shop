import {
  Card,
  CardContent,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import * as React from "react";
import "../../../../assets/css/styles.css";

const DiscountList = styled(List)({
  counterReset: "item",
  "& li": {
    display: "flex",
    alignItems: "start",
    borderRadius: "20px",
  },
  "& li:hover": {
    backgroundColor: "#e1e8ff",
  },
  "& li::before": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "aliceblue",
    maxWidth: "20px",
    maxHeight: "20px",
    textAlign: "center",
    padding: "10px",
    borderRadius: "50%",
    marginRight: "10px",
    marginTop: "3px",
    content: "counter(item)",
    counterIncrement: "item",
    fontSize: "14px",
    backgroundColor: "#0037af",
  },
  "& li::marker": {
    content: '"',
  },
});

const Discount = () => {
  return (
    <Card>
      <CardContent sx={{ padding: 0 }}>
        <Typography
          gutterBottom
          variant="body2"
          fontWeight={700}
          component="div"
          sx={{ backgroundColor: "#d0e1fd", padding: 1 }}
        >
          Khuyến mãi đặc biệt
        </Typography>
        <DiscountList sx={{ listStyle: "decimal", px: 1 }} disablePadding>
          <Link href="#" underline="none">
            <ListItem sx={{ display: "list-item", py: 0.8 }}>
              <Typography variant="body2" color="text.secondary">
                Thu cũ Đổi mới: Giảm đến 2 triệu (Tuỳ model máy cũ, Không kèm
                thanh toán qua cổng online, mua kèm)
              </Typography>
            </ListItem>
          </Link>

          <Link href="#" underline="none">
            <ListItem sx={{ display: "list-item", py: 0.8 }}>
              <Typography variant="body2" color="text.secondary">
                Nhập mã MMSALE100 giảm ngay 1% tối đa 100.000đ khi thanh toán
                qua MOMO
              </Typography>
            </ListItem>
          </Link>

          <Link href="#" underline="none">
            <ListItem sx={{ display: "list-item", py: 0.8 }}>
              <Typography variant="body2" color="text.secondary">
                Nhập mã VNPAYTAO giảm ngay 200K cho đơn hàng từ 15 Triệu, chỉ áp
                dụng thanh toán VNPAY-QR tại cửa hàng
              </Typography>
            </ListItem>
          </Link>
        </DiscountList>
      </CardContent>
    </Card>
  );
};

export default Discount;
