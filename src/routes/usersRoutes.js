import express from "express";
import {
  getUserData,
  signinPost,
  signupPost,
} from "../controllers/usersControllers.js";
import {
  signinValidation,
  signupValidation,
  userValidation,
} from "../middlewares/usersMiddleware.js";

const router = express.Router();

router.post("/signup", signupValidation, signupPost);
router.post("/signin", signinValidation, signinPost);
router.get("/users/me", userValidation, getUserData);

export default router;
