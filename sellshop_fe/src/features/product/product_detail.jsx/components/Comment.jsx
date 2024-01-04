import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/styles";
import { Avatar, Button, Link, Rating } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CircleIcon from "@mui/icons-material/Circle";

const CommentBox = styled(Box)({
  borderRadius: "20px",
  boxShadow: "none",
  backgroundColor: "#ededed",
  padding: "10px 20px",
  marginLeft: 10,
  width: "100%",
});

export default function Comment({ data }) {
  const [showReplies, setShowReplies] = React.useState(false);

  const handleClick = () => {
    setShowReplies(true);
  };

  return !data ? (
    <>Loading</>
  ) : (
    <>
      <Box sx={{ display: "flex", mb: 2 }}>
        <Avatar alt="Nguyễn Hữu Lập" src={data.userId.avatar} />
        <CommentBox>
          <Typography variant="body1" fontWeight={700} sx={{ mb: 0.5 }}>
            {data.userId.firstname + " " + data.userId.lastname}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating
              size="small"
              name="half-rating-read"
              value={data.star}
              precision={0.5}
              readOnly
            />
          </Box>

          <Typography variant="body1">{data.content}</Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ color: "#939ca3" }}>{new Date(data.createdAt).toLocaleString()}</Typography>
            <CircleIcon
              sx={{ fontSize: 5, mt: 0.7, mx: 0.8, color: "#939ca3" }}
            />
          </Box>
        </CommentBox>
      </Box>
      {data.replies.length > 0 ? (
        <>
          <Button
            onClick={handleClick}
            variant="text"
            disableRipple
            disableFocusRipple
            sx={
              !showReplies
                ? {
                    backgroundColor: "white !important",
                    ml: 8,
                    textTransform: "none",
                  }
                : { display: "none" }
            }
          >
            Xem bình luận trả lời
          </Button>
          <Box sx={showReplies ? { display: "block" } : { display: "none" }}>
            {data.replies.map((item, index) => {
              return (
                <Box sx={{ display: "flex", mb: 2, ml: 8 }} key={index}>
                  <Avatar alt="Nguyễn Hữu Lập" src={item.userId.avatar} />
                  <CommentBox>
                    <Typography
                      variant="body1"
                      fontWeight={700}
                      sx={{ mb: 0.5 }}
                    >
                      {item.userId.firstname + " " + item.userId.lastname}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ThumbUpIcon
                        sx={{ color: "#1976d2", fontSize: 15, mr: 0.5 }}
                      />
                      <Typography sx={{ color: "#1976d2", fontSize: 15 }}>
                        {item.likes}
                      </Typography>
                    </Box>

                    <Typography variant="body1">{item.content}</Typography>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography sx={{ color: "#939ca3" }}>
                        10 ngày trước
                      </Typography>
                      <CircleIcon
                        sx={{ fontSize: 5, mt: 0.7, mx: 0.8, color: "#939ca3" }}
                      />
                      <Link sx={{ cursor: "pointer" }} underline="hover">
                        Thích
                      </Link>
                      <CircleIcon
                        sx={{ fontSize: 5, mt: 0.7, mx: 0.8, color: "#939ca3" }}
                      />
                      <Link sx={{ cursor: "pointer" }} underline="hover">
                        Trả lời
                      </Link>
                    </Box>
                  </CommentBox>
                </Box>
              );
            })}
          </Box>
        </>
      ) : (
        ""
      )}
    </>
  );
}
