import { Router } from "express";
import {
  getAll,
  add,
  getByRole,
  update,
  getOneByIdentity,
  remove,
  getOneByOwner,
} from "../../interface-adapters/controllers/user.controller.js";
import authMiddleware from "../../interface-adapters/middleware/auth.middleware.js";

const router = Router();

router.get("/", getAll);
router.post("/", add);
router.get("/role", getByRole);
router.patch("/:userId", authMiddleware.isAuthorized, update);
router.get("/owner", authMiddleware.isAuthorized, getOneByOwner);
router.delete("/:identity", remove);

export default router;
