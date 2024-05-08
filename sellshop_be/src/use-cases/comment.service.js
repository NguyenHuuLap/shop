import mongoose from "mongoose";
import userModel from "../entities/user.entity.js";
import commentModel from "../entities/comment.entity.js";
import productModel from "../entities/product.entity.js";
import stringformatUtils from "../utils/stringformat.utils.js";
import orderModel from "../entities/order.entity.js"

const checkComment = async (userId, orderId, productId) => {
  return !!(await commentModel.findOne({ userId: userId, orderId: orderId, productId: productId }).exec())
};

const getList = async (
  userId = null,
  productId = null,
  sort = { createdAt: -1 },
  parentCommentId = null,
  currentPage = null,
  limit = null,
) => {
  return await commentModel
    .find({
      ...(productId && { productId: productId }),
      ...(userId && { userId: userId }),
      ...{ parentCommentId: parentCommentId },
      ...{ isDelete: false }
    })
    .sort(sort)
    .populate("replies userId productId")
    .skip(currentPage ? currentPage - 1 : null)
    .limit(limit)
    .lean()
    .exec();
};

const getListByAdmin = async (
  userId = null,
  productId = null,
  sort = { createdAt: -1 },
  parentCommentId = null,
  currentPage = null,
  limit = null,
) => {
  return await commentModel
    .find({
      ...(productId && { productId: productId }),
      ...(userId && { userId: userId }),
      ...{ parentCommentId: parentCommentId },
    })
    .sort(sort)
    .populate("replies userId")
    .skip(currentPage ? currentPage - 1 : null)
    .limit(limit)
    .lean()
    .exec();
};

const getAll = async (sort = null, currentPage = null, limit = null) => {
  return await getList(null, null, sort, null, currentPage, limit);
};

const getByProduct = async (
  productId,
  sort = null,
  currentPage = null,
  limit = null,
) => {
  let str;
  if (stringformatUtils.isUUID(productId)) str = { _id: productId };
  else str = { slug: productId };
  const product = await productModel.findOne(str).exec();
  if (!product) throw new Error("No product found");
  return await getList(null, product._id, sort, null, currentPage, limit);
};

const getByUser = async (
  userId,
  sort = null,
  currentPage = null,
  limit = null,
) => {
  const user = await userModel.findById(userId).exec();
  if (!user) throw new Error("No user found");
  return await getList(
    userId,
    null,
    sort,
    null,
    currentPage,
    limit,
  );
};

const getOne = async (commentId) => {
  return await commentModel
    .findOne({ _id: commentId, isDelete: false })
    .populate(`replies`)
    .lean()
    .exec();
};

const create = async (data, userId) => {
  const comment = new commentModel({
    _id: new mongoose.Types.ObjectId(),
    ...data,
  });

  const product = await productModel.findById(data.productId).exec()
  if (!product)
    throw new Error("No product found");

  const order = await orderModel.findById(data.orderId).exec()
  if (!order)
    throw new Error("No order found");

  const user = await userModel.findById(userId).exec()
  if (!user)
    throw new Error("No user found");

  if (order.userId.toString() !== user._id.toString())
    throw new Error("Order not own by this user");


  if (!order.items.some(i => i.productId.toString() === data.productId.toString()))
    throw new Error("Product does not found in order")

  Object.assign(comment, { userId: userId });

  if (data.parentCommentID) {
    if (!(await commentModel.findById(data.parentCommentId).exec()))
      throw new Error("No parrent comment found");
    await commentModel.findByIdAndUpdate(data.parentCommentId, {
      $addToSet: { replies: comment._id },
    });
  }
  let currentRates = null;
  if (!product.rates)
    currentRates = 0;
  else
    currentRates = product.rates;

  let currentRateTime = null;
  if (!product.rateTimes)
    currentRateTime = 0;
  else
    currentRateTime = product.rateTimes;

  const newRate = (currentRates * currentRateTime + data.rating) / (currentRateTime + 1)
  await productModel.findByIdAndUpdate(data.productId, { rateTimes: currentRateTime + 1, rates: newRate }).exec();

  comment.star = data.rating;
  delete data.rating;
  console.log(comment);

  return comment.save();
};

const checkOwner = async (commentId, userId) => {
  const comment = await commentModel.findById(commentId).exec();
  if (!comment) throw new Error("No comment found");
  if (comment.userId.toString() !== userId) throw new Error("Unauthorization");
};

const update = async (data, commentId, userId) => {
  await checkOwner(commentId, userId);
  if (data.productId) delete data.productId;
  if (data.userId) delete data.userId;
  return await commentModel.findByIdAndUpdate(commentId, data, { new: true });
};

const softDelete = async (commentId, userId) => {
  await checkOwner(commentId, userId);
  const comment = await commentModel.findById(commentId).exec();
  return await commentModel.findByIdAndUpdate(
    commentId,
    { isDelete: !comment.isDelete },
    { new: true },
  );
};

const remove = async (commentId, userId) => {
  await checkOwner(commentId, userId);
  return !!(await commentModel.findByIdAndDelete(commentId));
};

const removeByAdmin = async (commentId) => {
  return !!(await commentModel.findByIdAndDelete(commentId));
};

const updateByAdmin = async (data, commentId) => {
  if (data.productId) delete data.productId;
  if (data.userId) delete data.userId;
  if (data.orderId) delete data.orderId;
  return await commentModel.findByIdAndUpdate(commentId, data, { new: true });
};

const createByAdmin = async (data) => {
  console.log(data);
  const comment = new commentModel({
    _id: new mongoose.Types.ObjectId(),
    ...data,
  });

  const product = await productModel.findById(data.productId).exec()
  if (!product)
    throw new Error("No product found");

  const order = await orderModel.findById(data.orderId).exec()
  if (!order)
    throw new Error("No order found");

  const user = await userModel.findById(data.userId).exec()
  if (!user)
    throw new Error("No user found");

  if (order.userId.toString() !== user._id.toString())
    throw new Error("Order not own by this user");


  if (!order.items.some(i => i.productId.toString() === data.productId.toString()))
    throw new Error("Product does not found in order")

  if (data.parentCommentId) {
    if (!(await commentModel.findById(data.parentCommentId).exec()))
      throw new Error("No parrent comment found");
    await commentModel.findByIdAndUpdate(data.parentCommentId, {
      $addToSet: { replies: comment._id },
    });
  }

  return comment.save();
}

export default {
  getList,
  getAll,
  getByProduct,
  getByUser,
  create,
  update,
  softDelete,
  remove,
  getOne,
  createByAdmin,
  updateByAdmin,
  removeByAdmin,
  checkComment,
  getListByAdmin
};
