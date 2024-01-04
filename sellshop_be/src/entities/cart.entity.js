import mongoose from "mongoose";
import slugGenerator from "mongoose-slug-updater";

const cartSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    userId: { type: mongoose.Types.ObjectId, require: true },
    items: {
      type: [
        {
          productId: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          sku: { type: String, trim: true, required: true },
          quantity: { type: Number, required: true, min: 1 },
          updatedAt: { type: Date, default: Date.now },
        },
      ],
      required: false,
    },
  },
  { timestamps: true, versionKey: false },
);

cartSchema.plugin(slugGenerator);

const CartModel = mongoose.model("Cart", cartSchema);
export default CartModel;
