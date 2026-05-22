let appPromise;

module.exports = async (req, res) => {
  try {
    if (!appPromise) {
      appPromise = (async () => {
        const [{ default: app }, { connectDB }] = await Promise.all([
          import("../server/app.js"),
          import("../server/config/db.js"),
        ]);

        try {
          await connectDB();
        } catch (err) {
          console.warn("MongoDB unavailable:", err.message);
        }

        return app;
      })();
    }

    const app = await appPromise;
    return app(req, res);
  } catch (err) {
    console.error("Vercel handler error:", err.message);
    return res.status(500).json({ error: "Server initialization failed" });
  }
};