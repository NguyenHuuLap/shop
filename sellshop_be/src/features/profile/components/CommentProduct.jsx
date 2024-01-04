import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Typography, Rating, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoadingPage from "../../../components/common/components/LoadingPage";

export default function CommentProduct({ data }) {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [rating, setRating] = React.useState(5);
    const [content, setContent] = React.useState("");
    const [check, setCheck] = React.useState(null);

    React.useEffect(() => {
        const checkComment = async () => {
            try {
                const token = Cookies.get("token");
                const response = await axios.get(`http://localhost:3030/comment/order/${orderId}/product/${data.productId._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },)

                const orderResponse = await axios.get(`http://localhost:3030/order/owner/${orderId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },)
                if (orderResponse.data.status === 200) {
                    setOrder(orderResponse.data?.data)
                }
                setCheck(response.data?.data);
            } catch (err) {
                console.log(err);
            }
        }
        checkComment();
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addComment = async () => {
        if (!content || content.trim() === "") {

        } else if (!rating || rating <= 0 || rating > 5) {

        } else {
            const addComment = {
                "orderId": orderId,
                "productId": data.productId._id,
                "content": content,
                "rating": parseInt(rating),
            }
            console.log(addComment);
            const token = Cookies.get("token");
            const response = await axios.post("http://localhost:3030/comment/", addComment, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },).then(setOpen(false))

            navigate(`/product-detail/${data.productId.slug}/${data.sku}`);
        }
    }
    return !order || check === null ? (<LoadingPage />) : (
        <React.Fragment>
            {!check && order.status === "completed" ?
                <Button variant="outlined" onClick={handleClickOpen}
                    sx={{
                        fontSize: "12px",
                        textTransform: "none",
                        color: "#609af8",
                        width: "100%",
                        mr: 1,
                        mb: 1
                    }}>
                    Đánh giá sản phẩm
                </Button>
                :
                <Button variant="contained" color='success' disabled
                    sx={{
                        fontSize: "12px",
                        textTransform: "none",
                        width: "100%",
                        mr: 1,
                        mb: 1
                    }}>
                    Đánh giá sản phẩm
                </Button>
            }
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Đánh giá sản phẩm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid
                            container
                            sx={{ width: "100%", display: "flex", alignItems: "center" }}
                            spacing={1}
                        >
                            <Grid item lg={4} md={5} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img src={data.thumbnail} height={100} width={100} style={{ margin: 10 }} />
                            </Grid>
                            <Grid
                                item
                                lg={8}
                                md={7}

                            >
                                <Typography fontWeight={650} sx={{ color: "black" }}>{data.productId.name} {data.variantName} </Typography>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                    <Typography sx={{ my: 2, textAlign: "center" }}>Hãy cho chúng tôi biết cảm nhận của bạn</Typography>
                    <Grid container>
                        <Grid item xs={6}>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                {rating === 5 && <Typography textAlign="center" sx={{ backgroundColor: "#26B43A", px: 1, color: "white", borderRadius: "10px" }}>
                                    {/* Tuyệt vời */}
                                </Typography>}

                                {rating === 4 && <Typography textAlign="center" sx={{ backgroundColor: "#87D44A", px: 1, color: "white", borderRadius: "10px" }}>
                                    {/* Tốt */}
                                </Typography>}

                                {rating === 3 && <Typography textAlign="center" sx={{ backgroundColor: "#FFAF3A", px: 1, color: "white", borderRadius: "10px" }}>
                                    {/* Bình thường */}
                                </Typography>}

                                {rating === 2 && <Typography textAlign="center" sx={{ backgroundColor: "#FA6636", px: 1, color: "white", borderRadius: "10px" }}>
                                    {/* Tệ */}
                                </Typography>}

                                {rating === 1 && <Typography textAlign="center" sx={{ backgroundColor: "#EC2329", px: 1, color: "white", borderRadius: "10px" }}>
                                    {/* Rất tệ */}
                                </Typography>}

                                {rating === 0 && <Typography textAlign="center" sx={{ backgroundColor: "#6B6B6B", px: 1, color: "white", borderRadius: "10px" }}>
                                    {/* Chưa đánh giá */}
                                </Typography>}
                            </Box>


                        </Grid>
                        <Grid item xs={6}>
                            <Rating
                                value={rating}
                                onChange={(event, newRating) => {
                                    console.log(newRating);
                                    if (newRating !== null)
                                        setRating(newRating);
                                }}
                            />
                        </Grid>
                    </Grid>

                    <TextField
                        autoFocus
                        id="name"
                        placeholder='Nhận xét & Đánh giá'
                        type="email"
                        multiline
                        fullWidth
                        rows={4}
                        variant="outlined"
                        onChange={(event) => setContent(event.target.value)}
                        value={content}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={addComment}>Đánh giá</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}