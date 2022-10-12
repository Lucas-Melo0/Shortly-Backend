import express from "express";
import {
  listUrl,
  urlDeletion,
  urlRedirect,
  urlShortener,
} from "../controllers/urlControllers.js";

import {
  deletionValidation,
  shortUrlValidation,
  urlValidation,
} from "../middlewares/urlMiddleware.js";
const router = express.Router();

router.post("/urls/shorten", urlValidation, urlShortener);
router.get("/urls/:id", listUrl);
router.get("/urls/open/:shortUrl", shortUrlValidation, urlRedirect);
router.delete("/urls/:id", deletionValidation, urlDeletion);

export default router;
