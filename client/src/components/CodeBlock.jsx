import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getHighlightLanguage } from "../services/languages.js";

export default function CodeBlock({ code, language = "javascript" }) {
  if (!code?.trim()) {
    return (
      <p className="text-gray-500 text-sm italic py-4">No code to display.</p>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-surface-border text-sm">
      <SyntaxHighlighter
        language={getHighlightLanguage(language)}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "#0d1117",
          fontSize: "0.8rem",
        }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
