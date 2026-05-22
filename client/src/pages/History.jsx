import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchHistory, deleteReview } from "../services/api.js";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function History() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const load = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await fetchHistory();
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteReview(id);
      setItems((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  const handleReuse = (item) => {
    navigate("/review", {
      state: {
        reuse: { code: item.code, language: item.language },
      },
    });
  };

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold text-white mb-6"
      >
        Review History
      </motion.h1>

      <ErrorAlert message={error} onDismiss={() => setError("")} />

      {loading && <LoadingSpinner message="Loading history..." />}

      {!loading && items.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-400">No reviews yet.</p>
          <Button
            className="mt-4"
            onClick={() => navigate("/review")}
          >
            Create your first review
          </Button>
        </Card>
      )}

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-accent/20 text-accent">
                        {item.language}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(item.createdAt)}
                      </span>
                      {item.review?.overallScore != null && (
                        <span className="text-xs text-gray-400">
                          Score: {item.review.overallScore}/100
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                      {item.review?.summary || "No summary"}
                    </p>
                    <pre className="font-mono text-xs text-gray-500 bg-surface rounded p-2 overflow-x-auto max-h-24">
                      {item.code.slice(0, 200)}
                      {item.code.length > 200 ? "…" : ""}
                    </pre>
                  </div>
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <Button variant="secondary" onClick={() => handleReuse(item)}>
                      Reuse
                    </Button>
                    <Button
                      variant="danger"
                      disabled={deletingId === item.id}
                      onClick={() => handleDelete(item.id)}
                    >
                      {deletingId === item.id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
