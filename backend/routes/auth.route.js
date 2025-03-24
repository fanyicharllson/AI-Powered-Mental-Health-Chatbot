import express from "express";
import { Logout, SignIn, signUp, verifyEmail, forgotPassword, resetPassword} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", SignIn);
router.post("/logout", Logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;
