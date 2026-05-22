import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    language: { type: String, required: true },
    review: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model("Review", reviewSchema);
