import express from "express";
import { Logout, SignIn, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", SignIn);
router.post("/logout", Logout);

export default router;
