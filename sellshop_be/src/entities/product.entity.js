import mongoose from "mongoose";

import sanitizeHtml from "sanitize-html";
import slugGenerator from "mongoose-slug-updater";
// import removeMultiSpace from './plugins/remove-multi-space.js';
// import configs from '../configs.js';

const { Schema } = mongoose;

const specificationSchema = new Schema(
  {
    name: { type: String, trim: true, required: true }, // tên phần cứng
    key: { type: String, slug: "name", required: false },
    values: [{ type: String, trim: true, required: true }], // thông số
  },
  { timestamps: false, versionKey: false, id: false, _id: false },
);

const specificationDetailSchema = new Schema(
  {
    groupName: { type: String, trim: true, required: true }, //tên thông số chi tiết phần cứng
    groupKey: { type: String, slug: "groupName", required: false },
    groupItems: [specificationSchema], //overspecs
  },
  { timestamps: false, versionKey: false, id: false, _id: false },
);

const productVariantSchema = new Schema(
  {
    sku: { type: String, trim: true, required: false }, //
    variantName: { type: String, trim: true }, //màu sắc
    slug: { type: String, slug: "variantName", unique: false },

    price: { type: Number, required: true }, //giá khuyến mãi
    marketPrice: { type: Number, required: true }, //gốc
    quantity: { type: Number, min: 0, required: true }, // số lượng
    sold: { type: Number, min: 0, default: 0 }, //đã bán
    addOverSpecs: [specificationSchema], //thông số đặc biệt
    addDetailSpecs: [specificationDetailSchema], //thông số chi tiết đặc biệt
    thumbnail: { type: String, trim: true, required: false }, //hình ảnh thu nhỏ
    pictures: [{ type: String, trim: true }], // hình ảnh
  },
  { timestamps: true, versionKey: false },
);

const productSchema = new Schema(
  {
    _id: mongoose.Types.ObjectId,

    name: {
      type: String,
      trim: true,
      required: true,
      minLength: 6,
      maxLength: 255,
    }, //tên sp
    slug: { type: String, slug: "name", slugPaddingSize: 2, unique: true },

    desc: { type: String, required: false }, // mô tả
    video: { type: String, trim: true, required: false }, // nếu có

    overSpecs: [specificationSchema], // lên trên
    detailSpecs: [specificationDetailSchema], // lên trên
    specPicture: { type: String, trim: true }, //hình phần cứng

    warrantyPeriod: { type: Number, min: 0, default: 12 }, // in months thời gian bảo hành

    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    categorySub1Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    categorySub2Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    categorySub3Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    views: { type: Number, default: 0, min: 0 }, // views of product
    rates: { type: Number, default: 0, min: 0 },
    rateTimes: { type: Number, default: 0, min: 0 },

    policies: [{ type: String, trim: true }], //chính sách
    hightLightPics: [{ type: String, trim: true }], //

    variants: [productVariantSchema],
    minPrice: { type: Number, min: 1000 }, //giá nhỏ nhắt
    maxPrice: { type: Number, min: 1000 }, //giá lớn nhắt

    isDelete: { type: Boolean, default: false },
    isOutOfStock: { type: Boolean, default: false }, //hết hàng hay chưa?

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, versionKey: false },
);

[
  specificationSchema,
  specificationDetailSchema,
  productVariantSchema,
  productSchema,
].forEach((s) => {
  s.plugin(slugGenerator);
});

productSchema.index(
  {
    name: "text",
    desc: "text",
    "variants.variantName": "text",
    "overSpecs.name": "text",
    "overSpecs.values": "text",
    "detailSpecs.groupName": "text",
    "detailSpecs.groupItems.name": "text",
    "detailSpecs.groupItems.values": "text",
  },
  {
    weights: {
      name: 20,
      "variants.variantName": 5,
      desc: 1,
      "overSpecs.name": 1,
      "overSpecs.values": 2,
      "detailSpecs.groupName": 1,
      "detailSpecs.groupItems.name": 1,
      "detailSpecs.groupItems.values": 2,
    },
    name: "searchIndex",
  },
);

productSchema.pre('save', function (next) {
  const product = this;
  product.variants.forEach(async (variant) => {
    if (!variant.slug) {
      variant.slug = await slugGenerator(variant.variantName);
    }
  });
  product.overSpecs.forEach(async (overSpec) => {
    if (!overSpec.key) {
      overSpec.key = await slugGenerator(overSpec.name);
    }
  });
  product.detailSpecs.forEach(async (detailSpec) => {
    if (!detailSpec.groupKey) {
      detailSpec.groupKey = await slugGenerator(detailSpec.groupName);
    }
    detailSpec.groupItems.forEach(async (item) => {
      if (!item.key) {
        item.key = await slugGenerator(item.name);
      }
    });
  });

  next();
});

productSchema.pre("validate", function (next) {
  if (!this.isModified("desc")) {
    return next();
  }

  // if (!configs.isDev) {
  //   this.desc = sanitizeHtml(this.desc);
  // }

  next();
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;
