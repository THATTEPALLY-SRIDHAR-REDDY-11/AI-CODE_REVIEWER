import { motion } from "framer-motion";

export default function Card({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className={`bg-surface-card border border-surface-border rounded-xl p-5 sm:p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
