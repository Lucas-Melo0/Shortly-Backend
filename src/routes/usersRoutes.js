import express from "express";
import { signupPost } from "../controllers/usersControllers.js";
import { signupValidation } from "../middlewares/usersMiddleware.js";

const router = express.Router();

router.post("/signup", signupValidation, signupPost);

export default router;
