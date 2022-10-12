import express from "express";
import {
  listUrl,
  urlRedirect,
  urlShortener,
} from "../controllers/urlControllers.js";
import {
  shortUrlValidation,
  urlValidation,
} from "../middlewares/urlMiddleware.js";
const router = express.Router();

router.post("/urls/shorten", urlValidation, urlShortener);
router.get("/urls/:id", listUrl);
router.get("/urls/open/:shortUrl", shortUrlValidation, urlRedirect);

export default router;
