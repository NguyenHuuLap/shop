import { Router } from "express";
import {
  getAllFavorites,
  getFavoritesByUser,
  createFavorite,
  removeFavorite,
  removeFavoriteByAdmin,
} from "../../interface-adapters/controllers/favorite.controller.js";
import authMiddleware from "../../interface-adapters/middleware/auth.middleware.js";

const router = Router();

// Route lấy danh sách tất cả sản phẩm yêu thích
router.get("/", authMiddleware.isAuthorized, getAllFavorites);

// Route lấy danh sách sản phẩm yêu thích của một người dùng cụ thể
router.get("/user/:userId", authMiddleware.isAuthorized, getFavoritesByUser);

// Route tạo sản phẩm yêu thích mới
router.post("/", authMiddleware.isAuthorized, createFavorite);

// Route xóa một sản phẩm yêu thích cụ thể bởi người dùng
router.delete("/:favoriteId", authMiddleware.isAuthorized, removeFavorite);

// Route xóa một sản phẩm yêu thích bởi admin
router.delete("/by-admin/:favoriteId", authMiddleware.isAuthorized, removeFavoriteByAdmin);

export default router;
