import { Router } from "express";
import { addDiscount, addImage, calculateDiscountAmt, getAllByAdmin, getAllDiscount, getOne, getOneByCode, remove, removeImage, update, updateImage } from "../../interface-adapters/controllers/discount.controller.js";
import tempUpload  from "../../interface-adapters/middleware/multer.middleware.js"

const router = Router();

router.get("/", getAllDiscount);
router.get("/by-admin", getAllByAdmin);
router.get("/:discountId", getOne);
router.post("/", addDiscount);
router.patch("/:discountId", update)
router.delete("/:discountId", remove)
router.get("/code/:code", getOneByCode);
router.post("/calc/:code", calculateDiscountAmt);
router.post("/image", tempUpload.single('image'), addImage);
router.patch("/image/:discountId", tempUpload.single('image'), updateImage);
router.delete("/image/:discountId", removeImage);

export default router;
