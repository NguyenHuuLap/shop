import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const fileExtension = path.extname(file.originalname).toLowerCase();
  const isImage = allowedTypes.test(fileExtension);

  if (isImage) {
    cb(null, true);
  } else {
    cb(new Error("File is not image"), false);
  }
};

const tempUpload = multer({ storage: storage, fileFilter: fileFilter });

export default tempUpload;
