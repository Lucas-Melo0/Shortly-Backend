import express from "express";
import { signinPost, signupPost } from "../controllers/usersControllers.js";
import {
  signinValidation,
  signupValidation,
} from "../middlewares/usersMiddleware.js";

const router = express.Router();

router.post("/signup", signupValidation, signupPost);
router.post("/signin", signinValidation, signinPost);

export default router;
