// LangSmith SDK reads these automatically when tracing is enabled
process.env.LANGCHAIN_TRACING_V2 = process.env.LANGCHAIN_TRACING_V2 || "true";
process.env.LANGCHAIN_PROJECT =
  process.env.LANGCHAIN_PROJECT || "AI-Code-Reviewer";

export const isTracingEnabled = process.env.LANGCHAIN_TRACING_V2 === "true";
