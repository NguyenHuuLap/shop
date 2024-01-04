import React from "react";
import {
    AddCircle,
    CheckCircle,
    Delete,
    RemoveCircle,
} from "@mui/icons-material";
import { Checkbox, Grid, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    decreaseQuantity,
    deleteCartItem,
    increaseQuantity,
    selectProduct,
} from "../../../actions/CartAction.js";

const CartItem = (item) => {
    return (

        <Grid
            container
            sx={{
                backgroundColor: "white",
                maxWidth: "600px",
                width: "100%",
                marginTop: "10px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                alignItems: "center"
            }}
        >
            <Grid item xs={2}
            >

                <img
                    height={100}
                    width={100}
                    src={item.item.productId.variants[0].thumbnail}
                    alt={item.item.productId.name}
                />
            </Grid>
            <Grid item xs={10}>
                <Grid container>
                    <Grid item xs={9}>
                        <Typography variant="body1" fontWeight={500}>
                            {item.item.productId.name +
                                " - " +
                                item.item.productId.variants.find(
                                    (variant) => variant.sku === item.item.sku,
                                )?.variantName}
                        </Typography>
                        <Grid container>
                            <Grid item>
                                <Typography
                                    variant="body2"
                                    fontWeight={500}
                                >
                                    {
                                        item.item.productId.variants.find(
                                            (variant) => variant.sku === item.item.sku,
                                        )?.price
                                    }
                                    đ -{" "}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body2"
                                    fontWeight={500}
                                >
                                    {"  "}
                                    {
                                        item.item.productId.variants.find(
                                            (variant) => variant.sku === item.item.sku,
                                        )?.marketPrice
                                    }
                                    đ
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body2" fontWeight={500}>
                            Số lượng: {item.item.quantity}
                        </Typography>

                    </Grid>
                </Grid>

            </Grid>
        </Grid>

    );
};

export default CartItem;
