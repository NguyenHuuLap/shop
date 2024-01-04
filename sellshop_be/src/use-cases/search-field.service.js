import mongoose from "mongoose";
import stringformatUtils from "../utils/stringformat.utils.js";
import { ApplicationError } from "../utils/error.util.js";
import { COMMON_ERROR } from "../constants.js";
import searchFieldModel from "../entities/search-field.entity.js";

const add = async (data) => {
  const searchField = new searchFieldModel({
    _id: new mongoose.Types.ObjectId(),
    ...data,
  });
  return searchField.save();
};

const update = async () => {};

const getAll = async () => {};

const getOne = async () => {};

export default {
  add,
};
