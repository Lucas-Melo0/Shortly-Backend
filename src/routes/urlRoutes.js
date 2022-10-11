import express from "express";
import { urlShortener } from "../controllers/urlControllers.js";
import { urlValidation } from "../middlewares/urlMiddleware.js";
const router = express.Router();

router.post("/urls/shorten", urlValidation, urlShortener);

export default router;
