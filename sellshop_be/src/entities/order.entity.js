import mongoose from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import constants from "../constants.js";

const orderSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    customer: {
      _id: false,
      type: {
        name: { type: String, trim: true, required: true },
        phone: { type: String, trim: true, required: true },
      },
      required: true,
    },
    address: {
      _id: false,
      type: {
        street: { type: String, trim: true, required: [true, 'Please fill a street'] },
        ward: { type: String, trim: true, required: [true, 'Please fill a ward'] },
        district: { type: String, trim: true, required: [true, 'Please fill a district'] },
        province: { type: String, trim: true, required: [true, 'Please fill a city'] }
      },
    },
    note: { type: String, trim: true, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isReceiveAtStore: { type: Boolean, default: false },
    status: {
      type: String,
      enum: Object.values(constants.ORDER.STATUS),
      default: constants.ORDER.STATUS.PENDING,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(constants.ORDER.PAYMENT_METHOD),
      default: constants.ORDER.PAYMENT_METHOD.COD,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: Object.values(constants.ORDER.PAYMENT_STATUS),
      default: constants.ORDER.PAYMENT_STATUS.PENDING,
      required: true,
    },
    paidDate: { type: Date, default: Date.now, required: false },
    items: [{
      _id: false,
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', require: true },
      sku: { type: String, required: true },
      productName: { type: String, required: false },
      variantName: { type: String, required: false },
      thumbnail: { type: String, required: false },
      marketPrice: { type: Number, required: false },
      pricePerUnit: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }],
    subTotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    discount: { type: Number, required: true }, 
    discountCode: { type: String, require: false},
    total: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { _id: true, id: false, timestamps: true, versionKey: false },
);


orderSchema.pre('save', async function (next) {

  if (!this?.customer && !this?.userId) {
    return next(new Error('Invalid customer or user'));
  }

  if (this.isReceiveAtStore) {
    this.address = null;
  }
  next();
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
