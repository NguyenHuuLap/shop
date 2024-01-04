import { Router } from "express";
import {
  getAll,
  getByProduct,
  getByUser,
  getOne,
  create,
  update,
  softDelete,
  remove,
  createByAdmin,
  updateByAdmin,
  removeByAdmin,
  checkComment,
  getAllByAdmin,
} from "../../interface-adapters/controllers/comment.controller.js";
import authMiddleware from "../../interface-adapters/middleware/auth.middleware.js";

const router = Router();

router.get("/order/:orderId/product/:productId", authMiddleware.isAuthorized, checkComment);
router.get("/", getAll);
router.get("/by-admin", getAllByAdmin);
router.get("/:commentId", getOne);
router.post("/by-admin", createByAdmin);
router.get("/product/:productId", getByProduct);
router.patch("/by-admin/:commentId", updateByAdmin);
router.get("/user/:userId", getByUser);
router.post("/", authMiddleware.isAuthorized, create);
router.patch("/:commentId", authMiddleware.isAuthorized, update);
router.patch(
  "/soft-delete/:commentId",
  authMiddleware.isAuthorized,
  softDelete,
);
router.delete("/:commentId", authMiddleware.isAuthorized, remove);
router.delete("/by-admin/:commentId", removeByAdmin);

export default router;
