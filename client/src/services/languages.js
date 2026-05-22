export const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "plaintext", label: "Plain Text" },
];

export function getHighlightLanguage(lang) {
  const map = {
    javascript: "javascript",
    typescript: "typescript",
    python: "python",
    java: "java",
    go: "go",
    rust: "rust",
    cpp: "cpp",
    csharp: "csharp",
    php: "php",
    ruby: "ruby",
    sql: "sql",
    html: "xml",
    css: "css",
    json: "json",
    plaintext: "text",
  };
  return map[lang] || "text";
}
