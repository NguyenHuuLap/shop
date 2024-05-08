import mongoose from "mongoose";
import slugGenerator from "mongoose-slug-updater";
import constants from "../constants.js";
import encodedUtil from "../utils/encoded.util.js";

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    slug: { type: String, slug: "email", slugPaddingSize: 2, unique: true },
    firstname: {
      type: String,
      trim: true,
      require: [true, "Vui lòng nhập đầy đủ họ và tên"],
      minLength: 1,
      maxLength: 50,
    },
    lastname: {
      type: String,
      trim: true,
      require: [true, "Vui lòng nhập đầy đủ họ và tên"],
      minLength: 1,
      maxLength: 50,
    },
    email: {
      type: String,
      match: [constants.REGEX.EMAIL, "Vui lòng nhập địa chỉ email hợp lệ"],
      trim: true,
      require: true,
      index: {
        unique: true,
        partialFilterExpression: { email: { $type: "string" } },
      },
    },
    googleId: {
      type: String,
    },
    hashpassword: {
      type: String,
      trim: true,
    },
    tokenactive: {
      type: String,
      trim: true,
      require: true,
    },
    phone: {
      type: String,
      match: [constants.REGEX.PHONE, "Vui lòng nhập số điện thoại hợp lệ"],
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { phone: { $type: "string" } },
      },
    },
    role: {
      type: String,
      enum: Object.values(constants.USER.ROLE),
      default: constants.USER.ROLE.CUSTOMER,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(constants.USER.STATUS),
      default: constants.USER.STATUS.INACTIVE,
      required: true,
    },
    avatar: {
      type: {
        _id: false,
        url: { type: String, trim: true, required: true },
        public_id: { type: String, trim: true, required: true },
      },
      required: false,
    },
    birth: {
      type: Date,
      trim: true,
      required: false,
    },
    sex: {
      type: Number,
      enum: [0, 1, -1], // 0: male, 1: female, -1: other
      trim: true,
      required: false,
    },
    resetPasswordToken: {
      type: String,
      trim: true,
    },
    resetPasswordExpires: {
      type: Date,
    },
    address: [
      {
        type: {
          customer: {
            name: String,
            phone: String,
          },
          street: {
            type: String,
            trim: true,
            required: [true, "Please fill a street"],
          },
          ward: {
            type: String,
            trim: true,
            required: [true, "Please fill a ward"],
          },
          district: {
            type: String,
            trim: true,
            required: [true, "Please fill a district"],
          },
          province: {
            type: String,
            trim: true,
            required: [true, "Please fill a city"],
          },
        },
        trim: true,
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

userSchema.plugin(slugGenerator);

userSchema.pre("save", async function (next) {
  if (!this.isModified("hashpassword")) {
    next();
  }
  this.hashpassword = encodedUtil.encodedPassword(this.hashpassword);
  next();
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
