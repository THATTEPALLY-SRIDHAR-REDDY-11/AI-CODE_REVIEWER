import "./config/langsmith.js";

import cors from "cors";
import express from "express";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : true;

app.use(cors({ origin: corsOrigins }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", reviewRoutes);

export default app;