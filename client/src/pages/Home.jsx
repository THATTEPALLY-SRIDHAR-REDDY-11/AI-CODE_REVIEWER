import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";

const features = [
  { title: "Bug Detection", desc: "Logic errors and edge cases" },
  { title: "Security Scan", desc: "Vulnerabilities and unsafe patterns" },
  { title: "Performance", desc: "Optimization opportunities" },
  { title: "Best Practices", desc: "Style and maintainability" },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto pt-4 sm:pt-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          AI-Powered Code Review
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Paste or upload your code and get instant feedback on bugs, security,
          performance, and quality — powered by Groq Llama 3.3 70B.
        </p>
        <Link to="/review">
          <Button className="text-base px-8 py-3">Start Review</Button>
        </Link>
      </motion.section>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <Card key={f.title} delay={0.1 + i * 0.05}>
            <h3 className="font-semibold text-white mb-1">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </Card>
        ))}
      </div>

      <Card delay={0.3} className="text-center">
        <p className="text-gray-400 text-sm">
          Reviews are saved to your history. Reuse past submissions anytime.
        </p>
        <Link to="/history" className="text-accent hover:text-accent-hover text-sm mt-2 inline-block">
          View history →
        </Link>
      </Card>
    </div>
  );
}
