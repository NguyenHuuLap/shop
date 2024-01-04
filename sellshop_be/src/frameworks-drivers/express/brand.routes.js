import { Router } from "express";
import {
  add,
  getAll,
  getAllByAdmin,
  remove,
  update,
} from "../../interface-adapters/controllers/brand.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/by-admin", getAllByAdmin);
router.post("/", add);
router.patch("/", update);
router.delete("/:brandId", remove);

export default router;
