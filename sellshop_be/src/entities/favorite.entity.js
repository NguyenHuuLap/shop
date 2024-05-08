import mongoose from "mongoose";
import slugGenerator from "mongoose-slug-updater";

const favoriteSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // content: { type: String, trim: true, required: true },
    // star: { type: Number, default: 5, min: 1, max: 5 },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

favoriteSchema.plugin(slugGenerator);

const favoriteModel = mongoose.model("Favorite", favoriteSchema);
export default favoriteModel;
