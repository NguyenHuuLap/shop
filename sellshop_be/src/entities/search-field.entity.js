import mongoose from "mongoose";
import slugGenerator from "mongoose-slug-updater";

const searchFieldSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    numOrder: { type: Number, require: true },

    title: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    slug: { type: String, slug: "name", unique: false },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    value: [{ type: String, trim: true, required: true }],

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

searchFieldSchema.plugin(slugGenerator);

searchFieldSchema.statics.generateOrder = async function () {
  const item = await this.findOne({ categoryId: this.categoryId })
    .select("numOrder")
    .sort("-numOrder")
    .lean()
    .exec();
  const order = parseInt(item?.numOrder, 10) || 0;
  return order + 1;
};

const searchFieldModel = mongoose.model("Category", searchFieldSchema);
export default searchFieldModel;
