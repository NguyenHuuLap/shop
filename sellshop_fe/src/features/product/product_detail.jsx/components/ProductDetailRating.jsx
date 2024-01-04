import {
  Card,
  CardContent,
  Divider,
  LinearProgress,
  Pagination,
  Paper,
  Rating,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import * as React from "react";
import Comment from "./Comment";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

const CustomToggleButton = styled(ToggleButton)({
  margin: "auto 10px",
  backgroundColor: "#f8f9fa",
  color: "black",
  border: "1px solid #e9ecef !important",
  borderRadius: "10px !important",
  fontWeight: 600,
  padding: 7,
  [`&.Mui-selected`]: {
    backgroundColor: "#ee4d2d",
    borderColor: "#1976d2",
    color: "white",
  },
  [`&.Mui-selected:hover`]: {
    backgroundColor: "#ee4d2d",
    borderColor: "#1976d2",
    color: "white",
  },
});

const BorderLinearProgress = styled(LinearProgress)({
  height: 8,
  borderRadius: 5,
  [`&.MuiLinearProgress-colorPrimary`]: {
    backgroundColor: "#edeeef !important",
  },
  [`& .MuiLinearProgress-bar`]: {
    borderRadius: 5,
    backgroundColor: "#48bb78",
  },
});

const Item = styled(Paper)({
  width: "50%",
  boxShadow: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function ProductDetailRating({ comments, rating, productSlug }) {
  const [typeComment, setTypeComment] = React.useState("all");
  const [displayComment, setDisplayComment] = React.useState([]);
  const [filterComment, setFilterComment] = React.useState(null);

  React.useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = async (page) => {
    try {
      setDisplayComment([]);
      setFilterComment([]);
      const response = await axios.get(
        `http://localhost:3030/comment/product/${productSlug}?page=${page}&limit=10`,
      );
      const data = response.data.data;
      setDisplayComment(data);
      setFilterComment(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const changeFilterComment = (newTypeComment) => {
    if (newTypeComment === "all") setFilterComment(displayComment);
    else
      setFilterComment(
        displayComment.filter(
          (c) => parseInt(c.star) === parseInt(newTypeComment),
        ),
      );
  };

  const handleChange = async (event, newTypeComment) => {
    if (newTypeComment !== null) {
      changeFilterComment(newTypeComment);
      setTypeComment(newTypeComment);
    }
  };

  const getNumsPerStar = (star) => {
    if (comments.length === 0)
      return 0;
    let total = 0;
    for (const c of comments) if (parseInt(c.star) === star) total++;
    return total;
  };
  return !filterComment || !rating ? (
    <>Loading</>
  ) : (
    <Box>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography
            fontSize={18}
            fontWeight={700}
            sx={{ textAlign: "center", mb: 2, color: "#0037af" }}
          >
            ĐÁNH GIÁ TỪ NGƯỜI DÙNG
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack direction="row" spacing={2}>
            <Item>
              <Box sx={{ textAlign: "center" }}>
                <Typography fontSize={17} fontWeight={700} sx={{ mb: 0.5 }}>
                  Đánh giá trung bình
                </Typography>
                <Typography
                  fontSize={42}
                  fontWeight={700}
                  sx={{ mb: 0.5, color: "#d40008" }}
                >
                  {rating === -1 ? 0 : rating}/5
                </Typography>
                <Rating
                  size="small"
                  name="half-rating-read"
                  value={rating}
                  precision={0.5}
                  readOnly
                />
                <Typography>{comments.length} đánh giá</Typography>
              </Box>
            </Item>

            <Item>
              <Box sx={{ display: "block", width: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ mr: 0.2 }}>5</Typography>
                  <StarIcon fontSize="small" sx={{ color: "#faaf00", mr: 1 }} />
                  <BorderLinearProgress
                    variant="determinate"
                    sx={{ width: "60%" }}
                    value={comments.length > 0 ? (getNumsPerStar(5) / comments.length * 100) : 0}
                  />
                  <Typography sx={{ ml: 1 }}>{getNumsPerStar(5)}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ mr: 0.2 }}>4</Typography>
                  <StarIcon fontSize="small" sx={{ color: "#faaf00", mr: 1 }} />
                  <BorderLinearProgress
                    variant="determinate"
                    sx={{ width: "60%" }}
                    value={comments.length > 0 ? (getNumsPerStar(4) / comments.length * 100) : 0}
                  />
                  <Typography sx={{ ml: 1 }}>{getNumsPerStar(4)}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ mr: 0.2 }}>3</Typography>
                  <StarIcon fontSize="small" sx={{ color: "#faaf00", mr: 1 }} />
                  <BorderLinearProgress
                    variant="determinate"
                    sx={{ width: "60%" }}
                    value={comments.length > 0 ? (getNumsPerStar(3) / comments.length * 100) : 0}
                  />
                  <Typography sx={{ ml: 1 }}>{getNumsPerStar(3)}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ mr: 0.2 }}>2</Typography>
                  <StarIcon fontSize="small" sx={{ color: "#faaf00", mr: 1 }} />
                  <BorderLinearProgress
                    variant="determinate"
                    sx={{ width: "60%" }}
                    value={comments.length > 0 ? (getNumsPerStar(2) / comments.length * 100) : 0}
                  />
                  <Typography sx={{ ml: 1 }}>{getNumsPerStar(2)}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ mr: 0.2 }}>1</Typography>
                  <StarIcon fontSize="small" sx={{ color: "#faaf00", mr: 1 }} />
                  <BorderLinearProgress
                    variant="determinate"
                    sx={{ width: "60%" }}
                    value={comments.length > 0 ? (getNumsPerStar(1) / comments.length * 100) : 0}
                  />
                  <Typography sx={{ ml: 1 }}>{getNumsPerStar(1)}</Typography>
                </Box>
              </Box>
            </Item>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent sx={{ px: 7 }}>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ mr: 2 }}>Lọc theo:</Typography>
            <ToggleButtonGroup
              color="primary"
              value={typeComment}
              exclusive
              onChange={handleChange}
            >
              <CustomToggleButton value="all">
                {typeComment === "all" ? (
                  <CheckCircleIcon sx={{ fontSize: 15, mr: 0.5 }} />
                ) : (
                  ""
                )}
                Tất cả
              </CustomToggleButton>
              <CustomToggleButton value="5" >
                {typeComment === "5" ? (
                  <CheckCircleIcon sx={{ fontSize: 15, mr: 0.5 }} />
                ) : (
                  ""
                )}
                5 <StarIcon fontSize="small" sx={{ color: "#faaf00", mr: 1 }} />
              </CustomToggleButton>
              <CustomToggleButton value="4">
                {typeComment === "4" ? (
                  <CheckCircleIcon sx={{ fontSize: 15, mr: 0.5 }} />
                ) : (
                  ""
                )}
                4 <StarIcon fontSize="small" sx={{ color: "#faaf00", mr: 1 }} />
              </CustomToggleButton>
              <CustomToggleButton value="3">
                {typeComment === "3" ? (
                  <CheckCircleIcon sx={{ fontSize: 15, mr: 0.5 }} />
                ) : (
                  ""
                )}
                3 <StarIcon fontSize="small" sx={{ color: "#faaf00", mr: 1 }} />
              </CustomToggleButton>
              <CustomToggleButton value="2">
                {typeComment === "2" ? (
                  <CheckCircleIcon sx={{ fontSize: 15, mr: 0.5 }} />
                ) : (
                  ""
                )}
                2 <StarIcon fontSize="small" sx={{ color: "#faaf00", mr: 1 }} />
              </CustomToggleButton>
              <CustomToggleButton value="1">
                {typeComment === "1" ? (
                  <CheckCircleIcon sx={{ fontSize: 15, mr: 0.5 }} />
                ) : (
                  ""
                )}
                1 <StarIcon fontSize="small" sx={{ color: "#faaf00", mr: 1 }} />
              </CustomToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box>
            {filterComment.length > 0 ? (
              filterComment.map((item, index) => {
                console.log(item);
                return <Comment key={index} data={item} />;
              })
            ) : (
              <p style={{textAlign: "center"}}>Hiện chưa có lượt đánh giá nào</p>
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil(comments.length / 10)}
              variant="outlined"
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
