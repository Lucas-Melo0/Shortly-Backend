import express from "express";
import { listUrl, urlShortener } from "../controllers/urlControllers.js";
import { urlValidation } from "../middlewares/urlMiddleware.js";
const router = express.Router();

router.post("/urls/shorten", urlValidation, urlShortener);
router.get("/urls/:id", listUrl);

export default router;
