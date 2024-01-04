import mongoose from "mongoose";
import categoryModel from "../entities/category.entity.js";
import stringformatUtils from "../utils/stringformat.utils.js";
import { ApplicationError } from "../utils/error.util.js";
import httpStatus from "http-status";

async function getAll() {
  return categoryModel
    .find({ parent: null, isDelete: false })
    .populate("children")
    .sort({ createAt: -1 })
    .lean({})
    .exec();
}

async function getAllByAdmin() {
  return categoryModel
    .find({ parent: null })
    .populate("children")
    .sort({ createAt: -1 })
    .lean({})
    .exec();
}

const getIdentify = async (identify) => {
  if (stringformatUtils.isUUID(identify)) return { _id: identify };
  else return { slug: identify };
};

const getOneByIdentify = async (identify) => {
  return await categoryModel
    .findOne({ $and: [await getIdentify(identify), { parent: null }] })
    .lean()
    .exec();
};

async function add(data, userId) {
  const numOrder = await categoryModel.generateOrder();

  const category = new categoryModel({
    _id: new mongoose.Types.ObjectId(),
    numOrder,
    ...data,
  });

  if (userId) {
    category.createdBy = userId;
    category.updatedBy = userId;
  } else throw new ApplicationError(`User not found!`);

  if (data.parent) {
    const parent = await getOneByIdentify(data.parent);
    if (parent)
      await categoryModel.findByIdAndUpdate(parent._id, {
        $addToSet: { children: category._id },
      });
    else
      throw new ApplicationError(`Parent category ${data.parent} not found!`);
  }

  return category.save();
}

async function update(id, data, userUpdate = null) {
  const oldCategory = await getOneByIdentify(id);

  if (data.parent && oldCategory.parent !== data.parent) {
    const parent = await getOneByIdentify(data.parent);
    if (parent) {
      await categoryModel.findByIdAndUpdate(parent._id, {
        $addToSet: { children: oldCategory._id },
      });

      await await categoryModel.findByIdAndUpdate(oldCategory.parent, {
        $pull: { children: oldCategory._id },
      });
    } else
      throw new ApplicationError(
        res,
        httpStatus.NOT_FOUND,
        `Parent category ${data.parent} not found!`,
      );
  }

  if (userUpdate) data.updatedBy = userUpdate;

    if (data.numOrder && data.numOrder !== oldCategory.numOrder) {
        await categoryModel.findOneAndUpdate({ numOrder: data.numOrder }, { $set: { numOrder: oldCategory.numOrder } });
    } else {
        delete data.order;
    }

  return await categoryModel.findByIdAndUpdate(id, data, { new: true });
}

async function remove(id) {
  return !!(await categoryModel.findOneAndDelete({ _id: id }));
}

const countProductIncrease = async (identity) => {
  await categoryModel.findOneAndUpdate(
    await getIdentify(identity),
    { $inc: { countProduct: 1 } },
    { new: true, timestamps: null },
  );
};

const countProductDecrease = async (identity) => {
  await categoryModel.findOneAndUpdate(
    await getIdentify(identity),
    { $inc: { countProduct: -1 } },
    { new: true, timestamps: null },
  );
};

const softDelete = async (identity) => {
  const category = await getIdentify(identity);
  return await findOneAndUpdate(
    category._id,
    { isDelete: !category.isDelete },
    { new: true },
  );
};

export default {
  getAll,
  add,
  update,
  remove,
  getOneByIdentify,
  countProductIncrease,
  countProductDecrease,
  softDelete,
  getAllByAdmin
};
