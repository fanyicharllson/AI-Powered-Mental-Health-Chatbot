import express from "express";
import { Logout, SignIn, signUp, verifyEmail, forgotPassword, resetPassword, checkAuth, resentVerificationCode} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signUp);
router.post("/signin", SignIn);
router.post("/logout", Logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/resend-verifcationCode", resentVerificationCode);

router.post("/reset-password/:token", resetPassword);

export default router;
