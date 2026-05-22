import { traceable } from "langsmith/traceable";
import groq from "../config/groq.js";

const REVIEW_SCHEMA = `{
  "overallScore": 0,
  "summary": "",
  "bugs": [],
  "securityIssues": [],
  "optimizations": [],
  "bestPractices": [],
  "improvedCode": "",
  "complexity": ""
}`;

function buildPrompt(code, language) {
  return `You are a senior software engineer.

Review the submitted code.

Detect:
- bugs
- security issues
- performance improvements
- best practices
- complexity

Language: ${language}

Code:
\`\`\`${language}
${code}
\`\`\`

Return ONLY valid JSON (no markdown fences):

${REVIEW_SCHEMA}

Rules:
- overallScore: integer 0-100
- bugs, securityIssues, optimizations, bestPractices: arrays of strings
- improvedCode: full improved version as a string (escape newlines properly for JSON)
- complexity: brief assessment (e.g. "Low", "Medium", "High" with one sentence why)`;
}

function parseReviewJson(raw) {
  let text = raw.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }
  return JSON.parse(text);
}

async function callGroq(prompt) {
  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
    });
    return response.choices[0]?.message?.content ?? "";
  } catch (e) {
    console.error("callGroq error:", e?.stack || e?.message || e);
    throw new Error(`LLM connection error: ${e?.message || e}`);
  }
}

export const generateReview = traceable(
  async (code, language) => {
    const prompt = buildPrompt(code, language);
    const content = await callGroq(prompt);
    return parseReviewJson(content);
  },
  { name: "groq-code-review", run_type: "llm" }
);
