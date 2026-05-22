import { Router } from "express";
import {
  createReview,
  deleteReview,
  getHistory,
} from "../controllers/reviewController.js";

const router = Router();

router.post("/review", createReview);
router.get("/history", getHistory);
router.delete("/history/:id", deleteReview);

export default router;
