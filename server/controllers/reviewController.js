import Review from "../models/Review.js";
import { generateReview } from "../services/reviewService.js";

export async function createReview(req, res) {
  try {
    const { code, language } = req.body;

    if (!code?.trim()) {
      return res.status(400).json({ error: "Code is required" });
    }
    if (!language?.trim()) {
      return res.status(400).json({ error: "Language is required" });
    }

    const review = await generateReview(code, language);

    const saved = await Review.create({
      code,
      language,
      review,
    });

    res.status(201).json({
      id: saved._id,
      code: saved.code,
      language: saved.language,
      review: saved.review,
      createdAt: saved.createdAt,
    });
  } catch (err) {
    console.error("createReview error:", err?.stack || err?.message || err);
    res.status(500).json({
      error: err.message || "Failed to generate review",
    });
  }
}

export async function getHistory(req, res) {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .select("code language review createdAt")
      .lean();

    res.json(
      reviews.map((r) => ({
        id: r._id,
        code: r.code,
        language: r.language,
        review: r.review,
        createdAt: r.createdAt,
      }))
    );
  } catch (err) {
    console.error("getHistory:", err.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
}

export async function deleteReview(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Review.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json({ message: "Review deleted" });
  } catch (err) {
    console.error("deleteReview:", err.message);
    res.status(500).json({ error: "Failed to delete review" });
  }
}
