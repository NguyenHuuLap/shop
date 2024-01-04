import { Router } from "express";
import {
  add,
  getFullAll,
  getMostViewProduct,
  getNewestProduct,
  getOneProduct,
  remove,
  searchProduct,
  update,
  updateProductVariant,
  visitProduct,
} from "../../interface-adapters/controllers/product.controller.js";

const router = Router();

router.get("/search", searchProduct);
router.get("/newest", getNewestProduct);
router.get("/most-view", getMostViewProduct);
router.get("/visit-product/:productId", visitProduct);
router.get("/", getFullAll);
router.get("/:productId", getOneProduct);
router.get("/by-admin", getFullAll);
router.post("/", add);
router.patch("/:productId", update);
router.delete("/:productId", remove);
router.patch("/:productId/variants/:sku", updateProductVariant);

export default router;
