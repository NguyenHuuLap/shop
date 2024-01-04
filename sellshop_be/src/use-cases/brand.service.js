import mongoose from "mongoose";
import brandModel from "../entities/brand.entity.js";

const getAll = async () => {
  return brandModel.find({isDelete: false}).sort({ createdAt: -1 }).lean({}).exec();
};

const getAllByAdmin = async () => {
  return brandModel.find().sort({ createdAt: -1 }).lean({}).exec();
};

const getId = async (id) => {
  const result = brandModel.findById(id).lean().exec();
  return result ? result._id : null;
};

const add = async (data) => {
  const brand = new brandModel({
    _id: new mongoose.Types.ObjectId(),
    ...data,
  });
  return brand.save();
};

const update = async (data) => {
  return brandModel.findByIdAndUpdate(data._id, data, { new: true });
};

const remove = async (id) => {
  console.log(id);
  return !!(await brandModel.findOneAndDelete({ _id: id }));
};

export default { getAll, add, update, remove, getId, getAllByAdmin };
