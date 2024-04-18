import mongoose from "mongoose";
import favoriteModel from "../entities/favorite.entity.js";
import userModel from "../entities/user.entity.js";
import productModel from "../entities/product.entity.js";

const getAll = async (sort = { createdAt: -1 }, currentPage = 1, limit = 10) => {
    return await favoriteModel
      .find({ isDelete: false })
      .sort(sort)
      .skip((currentPage - 1) * limit)
      .limit(limit)
      .populate("productId userId")
      .exec();
  };
  
  const getByUser = async (userId, sort = { createdAt: -1 }, currentPage = 1, limit = 10) => {
    return await favoriteModel
      .find({ userId: userId, isDelete: false })
      .sort(sort)
      .skip((currentPage - 1) * limit)
      .limit(limit)
      .populate("productId")
      .exec();
  };
  
  const getOne = async (favoriteId) => {
    return await favoriteModel
      .findOne({ _id: favoriteId, isDelete: false })
      .populate("productId userId")
      .exec();
  };
  
  const create = async (data, userId) => {
    const favorite = new favoriteModel({
      _id: new mongoose.Types.ObjectId(),
      ...data,
      userId: userId
    });
  
    const product = await productModel.findById(data.productId).exec();
    if (!product) {
      throw new Error("No product found");
    }
  
    const user = await userModel.findById(userId).exec();
    if (!user) {
      throw new Error("No user found");
    }
  
    return await favorite.save();
  };
  
  const remove = async (favoriteId, userId) => {
    const favorite = await favoriteModel.findById(favoriteId).exec();
    if (!favorite) throw new Error("No favorite found");
    if (favorite.userId.toString() !== userId) throw new Error("Unauthorized");
  
    return await favoriteModel.findByIdAndUpdate(favoriteId, { isDelete: true }, { new: true });
  };
  
  const removeByAdmin = async (favoriteId) => {
    return await favoriteModel.findByIdAndUpdate(favoriteId, { isDelete: true }, { new: true });
  };
  
  export default {
    getAll,
    getByUser,
    getOne,
    create,
    remove,
    removeByAdmin,
  };