import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Review from "./pages/Review.jsx";
import History from "./pages/History.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Layout>
  );
}
