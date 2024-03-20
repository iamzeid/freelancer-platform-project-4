import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { requireVerification } from "../middleware/jwt.js";
import { verifyToken } from "../middleware/jwt.js";
import { getVerificationStatus } from "../controllers/user.controller.js";
import { verifyEmail } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/protected-route", requireVerification, (req, res) => {
  res.json({ message: "Access granted to protected route" });
});
router.get("/user/verification-status", verifyToken, getVerificationStatus);

router.get("/verify/:token", verifyEmail);

export default router;
