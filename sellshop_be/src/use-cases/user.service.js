import User from "../entities/user.entity.js";
import mongoose from "mongoose";
import stringformatUtils from "../utils/stringformat.utils.js";
import { ApplicationError } from "../utils/error.util.js";
import { COMMON_ERROR } from "../constants.js";
import encodedUtil from "../utils/encoded.util.js";
import ApiErrorUtils from "../utils/ApiErrorUtils.js";

const getIdentity = async (identity) => {
  if (stringformatUtils.isUUID(identity)) return { _id: identity };
  else if (stringformatUtils.isEmail(identity)) return { email: identity };
  else if (stringformatUtils.isPhone(identity)) return { phone: identity };
  else throw ApiErrorUtils.simple("Không tồn tại email/Số điện thoại");
};

const getAll = async () => {
  return User.find().sort({ createdAt: -1 }).lean().exec();
};

async function add(data) {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    ...data,
  });
  return user.save();
}

const getByRole = async (role) => {
  return User.find({ role }).sort({ createdAt: -1 }).lean().exec();
};

const getOneByIdentity = async (identity) => {
  return User.findOne(await getIdentity(identity))
    .lean()
    .exec();
};

const isExistEmail = async (email) => {
  return !!(await User.findOne({ email }).select("_id"));
};

const isExistPhone = async (phone) => {
  return !!(await User.findOne({ phone }).select("_id"));
};

const update = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true }).lean();
};

const checkPassword = async (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  if (passwordRegex.test(password)) {
    return true;
  }
  return false;
};
const checkName = async (firstname, lastname) => {
  const nameRegex = /^[a-zA-Z\sÀ-Ỹà-ỹ]+$/u;
  if (!firstname || !lastname) {
    throw ApiErrorUtils.simple("Họ tên không được bỏ trống");
  }
  if (nameRegex.test(firstname) && nameRegex.test(lastname)) {
    return true;
  } else {
    return false;
  }
};

const remove = async (identity) => {
  return !!(await User.findOneAndDelete(await getIdentity(identity)));
};

const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await getOneByIdentity(userId);
  if (!user) {
    throw ApiErrorUtils.simple("Người dùng không tồn tại", 404);
  }
  if (!(await encodedUtil.comparePassword(oldPassword, user.hashpassword))) {
    throw ApiErrorUtils.simple("Mật khẩu cũ không đúng", 400);
  }

  if (oldPassword === newPassword) {
    throw ApiErrorUtils.simple("Mật khẩu cũ trùng mật khẩu mới", 400);
  }
  return await update(userId, {
    hashpassword: await encodedUtil.encodedPassword(newPassword),
  });
};

export default {
  getIdentity,
  getAll,
  add,
  getByRole,
  getOneByIdentity,
  isExistEmail,
  isExistPhone,
  checkPassword,
  checkName,
  update,
  remove,
  changePassword,
};
