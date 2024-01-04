import mongoose from "mongoose";
import slugGenerator from "mongoose-slug-updater";

const commentSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true, required: true },
    star: { type: Number, default: 5, min: 1, max: 5 },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: { type: Number, default: 0 },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

commentSchema.plugin(slugGenerator);

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;
