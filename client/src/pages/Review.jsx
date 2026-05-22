import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { submitReview } from "../services/api.js";
import { LANGUAGES } from "../services/languages.js";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";
import ReviewResult from "../components/ReviewResult.jsx";

export default function Review() {
  const location = useLocation();
  const reused = location.state?.reuse;

  const [code, setCode] = useState(reused?.code ?? "");
  const [language, setLanguage] = useState(reused?.language ?? "javascript");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setCode(ev.target?.result ?? "");
      const ext = file.name.split(".").pop()?.toLowerCase();
      const extMap = {
        js: "javascript",
        jsx: "javascript",
        ts: "typescript",
        tsx: "typescript",
        py: "python",
        java: "java",
        go: "go",
        rs: "rust",
        cpp: "cpp",
        cs: "csharp",
        php: "php",
        rb: "ruby",
        sql: "sql",
        html: "html",
        css: "css",
        json: "json",
      };
      if (ext && extMap[ext]) setLanguage(extMap[ext]);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleSubmit = async () => {
    setError("");
    setResult(null);

    if (!code.trim()) {
      setError("Please paste or upload some code first.");
      return;
    }

    setLoading(true);
    try {
      const data = await submitReview(code, language);
      setResult(data);
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.message ||
        "Review failed. Check your API keys and connection.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold text-white mb-6"
      >
        Code Review
      </motion.h1>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-surface border border-surface-border rounded-lg px-3 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".js,.jsx,.ts,.tsx,.py,.java,.go,.rs,.cpp,.cs,.php,.rb,.sql,.html,.css,.json,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload File
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Reviewing..." : "Run Review"}
            </Button>
          </div>
        </div>

        <label className="block text-sm text-gray-400 mb-2">Your Code</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          rows={14}
          className="w-full font-mono text-sm bg-surface border border-surface-border rounded-lg px-4 py-3 text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 resize-y min-h-[200px]"
          spellCheck={false}
        />
      </Card>

      <div className="mt-4">
        <ErrorAlert message={error} onDismiss={() => setError("")} />
      </div>

      {loading && <LoadingSpinner />}

      {result && !loading && (
        <ReviewResult review={result.review} language={result.language} />
      )}
    </div>
  );
}
