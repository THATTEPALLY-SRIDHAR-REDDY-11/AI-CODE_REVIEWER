import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

export async function submitReview(code, language) {
  const { data } = await api.post("/review", { code, language });
  return data;
}

export async function fetchHistory() {
  const { data } = await api.get("/history");
  return data;
}

export async function deleteReview(id) {
  const { data } = await api.delete(`/history/${id}`);
  return data;
}
