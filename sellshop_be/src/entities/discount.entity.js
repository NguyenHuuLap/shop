import mongoose from "mongoose";
import slugGenerator from "mongoose-slug-updater";
import constants from "../constants.js";

const discountSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    name: { type: String, trim: true, required: true },
    slug: { type: String, slug: "name", slugPaddingSize: 2, unique: true },
    desc: { type: String, trim: true, required: false },
    code: { type: String, trim: true, required: true, unique: true },
    beginDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    quantity: { type: Number, required: false, default: 0 }, // số lượt dùng
    unlimitedQty: { type: Boolean, required: false, default: false }, // giới hạn số lượt dùng
    discount: { type: Number, required: true, default: 0 }, //con số giảm giá
    discountType: {
      type: String,
      trim: true,
      enum: Object.values(constants.DISCOUNT_CONS.TYPE),
      default: constants.DISCOUNT_CONS.TYPE.PERCENT,
    },
    minimumTotal: { type: Number, required: false, default: 0 },
    maximumApplied: { type: Number, required: false, default: 0 },
    image: { type: String, trim: true, required: false },
    isDelete: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, versionKey: false },
);

discountSchema.plugin(slugGenerator);

const discountModel = mongoose.model("Discount", discountSchema);
export default discountModel;
