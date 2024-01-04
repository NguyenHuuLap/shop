import { Router } from "express";
import {
  add,
  getAll,
  getOne,
  remove,
  update,
  getAllByAdmin
} from "../../interface-adapters/controllers/category.controller.js";
import { isAdminOrStaff } from "../../interface-adapters/middleware/auth.middleware.js";

const router = Router();

router.get("/", getAll);
router.get("/by-admin", getAllByAdmin);
router.post("/", add);
router.patch("/:categoryId", update);
router.delete("/:categoryId", remove);

export default router;
