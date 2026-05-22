import { motion } from "framer-motion";

export default function LoadingSpinner({ message = "Analyzing code..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <motion.div
        className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
}
