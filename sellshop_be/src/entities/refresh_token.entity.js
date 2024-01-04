import mongoose from "mongoose";
import slugGenerator from "mongoose-slug-updater";

const refreshTokenSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    token: { type: String, trim: true },
    expireTime: { type: Date },
  },
  { timestamps: true, versionKey: false },
);

brandSchema.plugin(slugGenerator);

const refreshTokenModel = mongoose.model("RefreshToken", refreshTokenSchema);
export default refreshTokenModel;
