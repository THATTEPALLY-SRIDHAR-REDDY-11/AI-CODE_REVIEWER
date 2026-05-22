import { motion } from "framer-motion";

export default function ErrorAlert({ message, onDismiss }) {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="bg-red-950/50 border border-red-800/60 text-red-200 rounded-lg px-4 py-3 text-sm flex justify-between items-start gap-3"
    >
      <span>{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-red-400 hover:text-red-200 shrink-0"
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </motion.div>
  );
}
