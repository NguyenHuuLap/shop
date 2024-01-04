import { Router } from "express";
import { addImage, removeImage, updateImage } from "../../interface-adapters/controllers/image.controller.js";
import tempUpload  from "../../interface-adapters/middleware/multer.middleware.js"

const router = Router();

router.post("/", tempUpload.single('image'), addImage);
router.patch("/:id", tempUpload.single('image'), updateImage);
router.delete("/:id", tempUpload.single('image'), removeImage);

export default router;
