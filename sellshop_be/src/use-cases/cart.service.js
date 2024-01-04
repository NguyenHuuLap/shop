import productService from "./product.service.js";
import cartModel from "../entities/cart.entity.js";
import mongoose from "mongoose";
import ApiErrorUtils from "../utils/ApiErrorUtils.js";

const SELECTED_FIELDS =
  "name variants.name variants.sku variants.variantName variants.price variants.marketPrice variants.thumbnail variants.sold variants.quantity";

const formatResult = (product, sku, quantity) => {
  if (!product) return null;
  const { variants, _id: uuId, ...otherProductInfo } = product;
  const variantInfo = variants.find((v) => v.sku === sku);
  if (variantInfo) {
    return {
      productId: uuId,
      sku,
      quantity,
      ...otherProductInfo,
      ...variantInfo,
    };
  }
  return null;
};

const getProductInfo = async (productId, sku, notClean = true) => {
  const product = await productService.getOneProduct(productId);
  if (!product) {
    throw ApiErrorUtils.simple(`Product ${productId} not found`, 404);
  }
  const variant = product?.variants.find((v) => v.sku === sku);
  if (!variant) {
    throw ApiErrorUtils.simple(
      `Variant sku=${sku} of product ${productId} not found`,
      404,
    );
  }
  return { product, variant };
};

const getCartItemsFromData = async (items) => {
  const filter = { _id: { $in: items.map((i) => i.productId) } };

  const { list: products } = await productService.getAll({
    fields: SELECTED_FIELDS,
    filter,
  });

  let result = [];
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    const currentProduct = products.find(
      (p) => p._id.toString() === element.productId.toString(),
    );
    result.push(formatResult(currentProduct, element.sku, element.qty));
  }

  return result.filter((i) => i);
};

const getCartItemsByUser = async (userId) => {
  const populateOpts = [
    {
      path: "items.productId",
      select: SELECTED_FIELDS,
      model: "Product",
    },
  ];
  return cartModel.findOne(userId).populate(populateOpts).lean().exec();
};

const addItems = async (userId, productId, sku, quantity = 1) => {
    try {
        const { product, variant } = await getProductInfo(productId, sku, false);

        let userCart = await cartModel.findOne({ userId });
        if (!userCart) {
            const newCart = new cartModel({
                _id: new mongoose.Types.ObjectId(),
                userId,
                items: [{ productId, sku, quantity }]
            });
            userCart = await newCart.save();
        } else {

            const itemInCart = userCart.items.find(i => i.productId.toString() === productId &&
                i.sku !== undefined && i.sku === sku);
            if (itemInCart) {
                itemInCart.quantity += quantity;
                quantity = itemInCart.quantity;
            } else {
                userCart.items.push({ productId, sku, quantity });
            }

            userCart = await userCart.save();
        }
        return formatResult(product, variant.sku, quantity);
    } catch (error) {
        console.log(error);
    }
}

const updateItemQuantity = async (userId, productId, sku, delta) => {
  await getProductInfo(productId, sku);
  const userCart = await cartModel.findOne({ userId });
  const item = await userCart?.items?.find(
    (i) => i.productId.toString() === productId && i.sku === sku,
  );
  if (!userId || !item) {
    throw ApiErrorUtils.simple(`This is not exits in your cart`, 404);
  }
  item.quantity += parseInt(delta);
  if (item.quantity <= 0) {
    return cartModel.findByIdAndUpdate(
      userCart._id,
      { $pull: { items: { productId, sku } } },
      { new: true },
    );
  } else {
    return userCart.save();
  }
};

const removeItem = async (userId, productId, sku) => {
  await getProductInfo(productId, sku);
  const userCart = await cartModel.findOne({ userId });
  const item = userCart?.items?.find(
    (i) => i.productId.toString() === productId && i.sku === sku,
  );
  if (!userId || !item) {
    throw ApiErrorUtils.simple(`this item is not exits in your cart `, 404);
  }
  return cartModel.findByIdAndUpdate(
    userCart._id,
    { $pull: { items: { productId, sku } } },
    { new: true },
  );
};

const cleanCart = async (userId) => {
  const result = await cartModel.deleteOne({ userId });
  return !!result.deletedCount;
};
export default {
  getCartItemsFromData,
  getCartItemsByUser,
  updateItemQuantity,
  addItems,
  removeItem,
  cleanCart,
};
