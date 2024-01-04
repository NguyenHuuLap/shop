import mongoose from "mongoose";
import productModel from "../entities/product.entity.js";
import { ApplicationError } from "../utils/error.util.js";
import orderModel from "../entities/order.entity.js";
import discountModel from "../entities/discount.entity.js";
import httpStatus from "http-status";
import constants from "../constants.js";
import stringformatUtils from "../utils/stringformat.utils.js";
import userModel from "../entities/user.entity.js";
import ApiErrorUtils from "../utils/ApiErrorUtils.js";
import discountService from "./discount.service.js";
import cartModel from "../entities/cart.entity.js";


const getIdentity = async (identity) => {
  if (stringformatUtils.isUUID(identity)) return { _id: identity };
  // TEST
  else return null;
};

const calcOrderSubTotal = async (items) => {
  return items.reduce((total, item) => {
    return total + item.quantity * item.pricePerUnit;
  }, 0);
};

//not yet
const calcOrderShippingFee = async () => {
  return 0;
};

const transaction = async (data) => {
  const session = await mongoose.startSession();

    let listItem = [];
    try {
        await session.startTransaction();
        for (const item of data.items) {
            const product = await productModel.findOne({ _id: item.productId }).lean().exec();
            if (!product || product.variants.length === 0)
                throw new ApiErrorUtils({
                    message: `Product not found!`,
                    status: 404
                });

      const variant = product.variants.find(
        (variant) => (variant.sku = item.sku),
      );

            if (!variant)
                throw new ApiErrorUtils({
                    message: `Variant not found!`,
                    status: 404
                });

            if (variant.sold + item.quantity > variant.quantity)
                throw new ApiErrorUtils({
                    message: `Not enough quantity!`,
                    status: 404
                });

      await productModel.findOneAndUpdate(
        { _id: item.productId, "variants.sku": item.sku },
        { $inc: { "variants.$.sold": item.quantity } },
        { session },
      );

            listItem.push({
                productId: item.productId,
                sku: product.variants[0].sku,
                productname: product.name,
                variantName: variant.variantName,
                thumbnail: variant.thumbnail,
                marketPrice: variant.marketPrice,
                pricePerUnit: variant.price,
                quantity: item.quantity
            })
            const userCart = await cartModel.findOne({userId: data.userId});
            await cartModel.findByIdAndUpdate(userCart._id, { $pull: { items: { productId: item.productId, sku: item.sku } } }, { new: true });

        }
        data.items = listItem;

        const subTotal = await calcOrderSubTotal(listItem);

        let discount = 0;
        if (data.discountCode) {
            const { amount: discountAmount, info: discountInfo } = await discountService.calculateDiscountAmt(data.discountCode, subTotal);
            console.log(discountAmount);
            discount = discountAmount;
            if (!(discountInfo?.unlimitedQty || false)) {
                await discountModel.findByIdAndUpdate(
                    discountInfo._id,
                    { $inc: { 'quantity': -1 } },
                    { session }
                );
            }
        }

        const shippingFee = await calcOrderShippingFee();


        data.shippingFee = shippingFee;
        data.total = subTotal + shippingFee - discount;
        data.discount = discount;
        data.subTotal = subTotal;
        data.status = constants.ORDER.STATUS.PENDING;
        data.paymentStatus = constants.ORDER.PAYMENT_STATUS.PENDING;

        if (data.isReceiveAtStore === true)
            data.address = null;

        const order = new orderModel({
            _id: new mongoose.Types.ObjectId(),
            ...data
        });
        await order.save({ session });
        await session.commitTransaction();
        await session.endSession();

        return order;

    } catch (err) {
        await session.abortTransaction();
        await session.endSession();

        console.log(err);
        throw new Error(err);
    }
  };

const getList = async (userId = null, search = null, status = null, paymentStatus = null, sort = { createdAt: -1 }) => {
    return await orderModel.find({
        ...(userId && { userId: userId }),
        ...(status && status !== 'all' && { status: status }),
        ...(paymentStatus && paymentStatus !== 'all' && { paymentStatus: paymentStatus }),
        ...(search && {
            $or: [
                { 'customer.name': { $regex: search, $options: 'i' } },
                { 'customer.phone': { $regex: search, $options: 'i' } }
            ]
        })
    }).populate('items.productId').sort(sort).lean().exec();
}

const getAll = async (sort = null) => {
  return await getList(null, null, null, null, sort);
};

const getOne = async (identity) => {
  return await orderModel
    .findOne(await getIdentity(identity))
    .lean()
    .exec();
};

const getOneByOwner = async (orderId, userId) => {
  const order = await orderModel.findById(orderId).exec();
  if (!order) throw new Error("Order not found");
  const user = await userModel.findById(userId).exec();
  if (!user) throw new Error("User not found");

  checkOwner(orderId, userId);
  return await orderModel
    .findById(orderId)
    .populate('items.productId')
    .lean()
    .exec();
};

const checkOwner = async (orderId, userId) => {
  const order = await orderModel.findById(orderId).exec();
  if (!order) throw new Error("No order found");
  if (order.userId.toString() !== userId) throw new Error("Unauthorization");
};

const create = async (usermail, data) => {
    const user = await userModel.findOne({ email: usermail }).exec();
    if (!user)
        throw new Error("User not found");
    Object.assign(data, { createdBy: user._id, userId: user._id });
    return await transaction(data);
}

const update = async (orderId, data, userId) => {
  const order = await orderModel.findById(orderId).exec();
  if (!order) throw new Error("Order not found");
  const user = await userModel.findById(userId).exec();
  if (!user) throw new Error("User not found");

  checkOwner(orderId, userId);

  data.updatedBy = userId;

  if (data.status === order.status)
    throw new Error(`Order has been ${data.status.toLowerCase()}`);

  return orderModel
    .findByIdAndUpdate(orderId, data, { new: true })
    .lean()
    .exec();
};

const updateByAdmin = async (orderId, data) => {
  const order = await orderModel.findById(orderId).exec();
  if (!order) throw new Error("Order not found");

  return orderModel
    .findByIdAndUpdate(orderId, data, { new: true })
    .lean()
    .exec();
};

const checkOrderHasDiscount = async (userId, discountCode) => {
  const user = await userModel.findById(userId).exec();
  if (!user) throw new Error("User not found");

  const list =  await getList(userId, null, null, null, null);
  return list.some(i => i.discountCode && i.discountCode == discountCode);
};

export default {
  transaction,
  getList,
  getOne,
  create,
  update,
  getAll,
  getOneByOwner,
  updateByAdmin,
  checkOrderHasDiscount
};
