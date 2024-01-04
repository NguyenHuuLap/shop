import mongoose from "mongoose";
import slugGenerator from "mongoose-slug-updater";

const categorySchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    numOrder: { type: Number, require: true },

    name: { type: String, trim: true, required: true },
    slug: { type: String, slug: "name", slugPaddingSize: 2, unique: true },
    desc: { type: String, trim: true, required: false },
    image: { type: String, trim: true, required: false },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    isDelete: { type: Boolean, required: true, default: false },
    numOfProduct: { type: Number, required: true, default: 0, min: 0 },

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

categorySchema.plugin(slugGenerator);

categorySchema.statics.generateOrder = async function () {
  const item = await this.findOne()
    .select("numOrder")
    .sort("-numOrder")
    .lean()
    .exec();
  const order = parseInt(item?.numOrder, 10) || 0;
  return order + 1;
};

const categoryModel = mongoose.model("Category", categorySchema);
export default categoryModel;
