import mongoose from "mongoose";
import discountModel from "../entities/discount.entity.js"
import ApiErrorUtils from "../utils/ApiErrorUtils.js";
import constants from "../constants.js";
import stringformatUtils from "../utils/stringformat.utils.js";

const getAllDiscount = async () => {
    const today = new Date().toISOString();
    console.log(today)

    return discountModel.find({
        isDelete: false,
        beginDate: { $lte: today },
        endDate: { $gte: today }
    }).sort({ createAt: -1 }).lean().exec();
}

const getAllByAdmin = async () => {
    return discountModel.find().sort({ createAt: -1 }).lean().exec();
}

const addDiscount = async (data) => {
    const code = await randomCode();

    const newDiscount = new discountModel({
        _id: new mongoose.Types.ObjectId(),
        code: code,
        ...data
    })
    return await newDiscount.save();

}

const update = async (id, data) => {
    return await discountModel.findByIdAndUpdate(id, data, { new: true });
}

const remove = async (id) => {
    return !!(await discountModel.findByIdAndDelete(id));
}

const randomCode = async () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code;
    let result = '';
    do {
        for (let j = 0; j < 10; j++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        code = result;
    } while (await isCheckCodeExits(result))
    return code;
}

async function getOne(identity) {
    const filter = stringformatUtils.isUUID(identity)
        ? { _id: identity }
        : { slug: identity };
    return discountModel.findOne({ ...filter, isDelete: false }).lean().exec();
}

async function getOneByCode(code) {
    return await discountModel.findOne({ code: code, isDelete: false }).lean().exec();
}

async function calculateDiscountAmt(code, subTotal) {
    const today = new Date().toISOString();

    const filters = {
        code: code,
        $or: [{ quantity: { $gte: 0 } }, { unlimitedQty: true }],
        isDelete: false,
        beginDate: { $lte: today },
        endDate: { $gte: today }
    };

    const discount = await discountModel
        .findOne(filters)
        .select('name code unlimitedQty discount discountType minimumTotal maximumApplied')
        .lean().exec();
    if (!discount) {
        throw ApiErrorUtils.simple(`Discount ${code} not found`, 404);
    }

    if (discount.minimumTotal > subTotal) {
        throw ApiErrorUtils.simple(`Subtotal smaller than minimum total`);
    }

    let discountAmount = 0;
    if (discount.discountType === constants.DISCOUNT_CONS.TYPE.PERCENT) {
        discountAmount = (subTotal * discount.discount) / 100;
        if (discountAmount > discount.maximumApplied) {
            discountAmount = discount.maximumApplied;
        }
    } else {
        discountAmount = discount.discount;
    }
    return {
        amount: discountAmount,
        info: discount
    };
}

const isCheckCodeExits = async (code) => {
    const result = await discountModel.findOne({ code: code }).exec();
    return !!result;
}

export default { getAllDiscount, addDiscount, update, remove, getOne, getOneByCode, calculateDiscountAmt, getAllByAdmin };
