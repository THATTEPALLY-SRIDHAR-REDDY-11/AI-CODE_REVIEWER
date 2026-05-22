import { motion } from "framer-motion";
import Card from "./Card.jsx";
import CodeBlock from "./CodeBlock.jsx";

function ScoreRing({ score }) {
  const color =
    score >= 80 ? "text-emerald-400" : score >= 50 ? "text-amber-400" : "text-red-400";

  return (
    <div className="flex flex-col items-center">
      <div
        className={`text-5xl font-bold ${color}`}
        aria-label={`Overall score ${score} out of 100`}
      >
        {score}
      </div>
      <span className="text-gray-500 text-sm mt-1">/ 100</span>
    </div>
  );
}

function IssueList({ title, items, variant = "default" }) {
  const colors = {
    default: "text-gray-300",
    bug: "text-red-300",
    security: "text-orange-300",
    optimization: "text-cyan-300",
    practice: "text-emerald-300",
  };

  return (
    <Card className="h-full">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
        {title}
      </h3>
      {items?.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className={`text-sm ${colors[variant]} pl-3 border-l-2 border-surface-border`}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm italic">None detected</p>
      )}
    </Card>
  );
}

export default function ReviewResult({ review, language }) {
  if (!review) return null;

  const {
    overallScore,
    summary,
    bugs,
    securityIssues,
    optimizations,
    bestPractices,
    improvedCode,
    complexity,
  } = review;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 mt-8"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
            Overall Score
          </h3>
          <ScoreRing score={overallScore ?? 0} />
        </Card>
        <Card delay={0.05}>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Complexity
          </h3>
          <p className="text-gray-200">{complexity || "Not assessed"}</p>
        </Card>
      </div>

      <Card delay={0.1}>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Summary
        </h3>
        <p className="text-gray-300 leading-relaxed">{summary}</p>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <IssueList title="Bugs" items={bugs} variant="bug" />
        <IssueList title="Security Issues" items={securityIssues} variant="security" />
        <IssueList title="Optimizations" items={optimizations} variant="optimization" />
        <IssueList title="Best Practices" items={bestPractices} variant="practice" />
      </div>

      {improvedCode && (
        <Card delay={0.15}>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
            Improved Code
          </h3>
          <CodeBlock code={improvedCode} language={language} />
        </Card>
      )}
    </motion.div>
  );
}
