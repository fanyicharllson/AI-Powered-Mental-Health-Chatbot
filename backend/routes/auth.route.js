import express from "express";
import { Logout, SignIn, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signup", signUp);
router.get("/signin", SignIn);
router.get("/logout", Logout);

export default router;
