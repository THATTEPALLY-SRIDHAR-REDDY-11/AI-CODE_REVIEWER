import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";
const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
  } catch (err) {
    console.warn("MongoDB unavailable:", err.message);
    console.warn("API will run; reviews/history need MongoDB once connected.");
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
