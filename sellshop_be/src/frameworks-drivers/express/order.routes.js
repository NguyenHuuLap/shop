import { Router } from "express";
import { create, getAll, getOne, update, getByUser, getVnpayResult, getOneByOwner, repay, getListByOwner, updateByAdmin, checkOrderHasDiscount } from "../../interface-adapters/controllers/order.controller.js";
import authMiddleware from "../../interface-adapters/middleware/auth.middleware.js";

const router = Router();


router.get("/", getAll);
router.post("/", authMiddleware.isAuthorized, create);
router.get("/owner/status/:status", authMiddleware.isAuthorized, getListByOwner);
router.get("/owner", authMiddleware.isAuthorized, getByUser);
router.get("/owner/:orderId", authMiddleware.isAuthorized, getOneByOwner);
router.get("/:orderId", getOne);
router.get("/repay/:orderId", authMiddleware.isAuthorized, repay);
router.patch("/:orderId", authMiddleware.isAuthorized, update);
router.patch("/by-admin/:orderId", updateByAdmin);
router.route('/api/v1/payment/vnpay/callback').get(getVnpayResult);
router.get("/check-discount/:discountCode", authMiddleware.isAuthorized, checkOrderHasDiscount);


export default router;
