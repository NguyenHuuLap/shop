import { Router } from "express";
import {
  addItem,
  cleanCart,
  getCartItems,
  removeItem,
  updateItemQuantity,
} from "../../interface-adapters/controllers/cart.controller.js";

const router = Router();

router.get("/:userId", getCartItems);
router.post("/add", addItem);
router.patch("/", updateItemQuantity);
router.delete("/", removeItem);
router.delete("/:userId/clean", cleanCart);

export default router;
