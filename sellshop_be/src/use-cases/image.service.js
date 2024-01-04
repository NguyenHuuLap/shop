import cloudinary from "cloudinary";
import fs from "fs-extra";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (path) => {
  try {
    const uploadImage = await cloudinary.v2.uploader.upload(path);

    return {
      url: uploadImage.url,
      public_id: uploadImage.public_id,
    };
  } catch (err) {
    throw new Error("Error when upload file: " + err.message);
  }
};

const replaceImage = async (id, path) => {
  try {
    const uploadImage = await cloudinary.v2.uploader.upload(path,  {
      public_id: id,
      overwrite: true,
    });

    return {
      url: uploadImage.url,
      public_id: uploadImage.public_id,
    };
  } catch (err) {
    throw new Error("Error when upload file: " + err.message);
  }
};

const removeImage = async (id) => {
  try {
    return await cloudinary.v2.uploader.destroy(id);
  } catch (err) {
    throw new Error("Error when upload file: " + err.message);
  }
};

const unlinkImage = async (path) => {
  try {
    return !!(await fs.unlink(path));
  } catch (err) {
    throw new Error("Can't remove temp image");
  }
};

const getImageFromURL = async (url) => {
  try {
    axios({
      url: url,
      responseType: "stream",
    }).then((response) => {
      response.data.pipe(fs.createWriteStream("./src/uploads/temp.jpg"));
    });
    return "./src/uploads/temp.jpg";
  } catch (err) {
    throw new Error("Can't get image");
  }
};

export default {
  uploadImage,
  unlinkImage,
  getImageFromURL,
  replaceImage,
  removeImage
};
