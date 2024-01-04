import { Router } from "express";
import {
  changePassword,
  confirmActive,
  login,
  loginWithGoogle,
  register,
  updateProfile,
} from "../../interface-adapters/controllers/auth.controller.js";
import passport from "passport";
import { passportConfig } from "../../data-access/passport.js";
import authMiddleware from "../../interface-adapters/middleware/auth.middleware.js";

const router = Router();
passportConfig(passport);

router.post("/login", login);
router.patch("/:userId", authMiddleware.isAuthorized, updateProfile);

router.get("/google", [
  passport.authenticate("google", { scope: ["profile", "email"] }),
]);

router.get(
  "/google/callback",
  [passport.authenticate("google", { failureRedirect: "/", session: false })],
  loginWithGoogle,
);

router.post("/register", register);
router.post("/changepassword", changePassword);
router.get("/confirm/:userId/:tokenactive", confirmActive)
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default router;
