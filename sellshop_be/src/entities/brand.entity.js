import mongoose from "mongoose";
import slugGenerator from "mongoose-slug-updater";

const brandSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    name: { type: String, trim: true, required: true },
    slug: { type: String, slug: "name", slugPaddingSize: 2, unique: true },
    desc: { type: String, trim: true, required: false },
    image: { type: String, trim: true, required: false },
    isDelete: { type: Boolean, required: true, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

brandSchema.plugin(slugGenerator);

const brandModel = mongoose.model("Brand", brandSchema);
export default brandModel;
