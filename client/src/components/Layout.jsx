import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/review", label: "Review" },
  { path: "/history", label: "History" },
];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-surface-border bg-surface-card/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              AI Code Reviewer
            </span>
          </Link>
          <nav className="flex gap-1 sm:gap-2">
            {navItems.map(({ path, label }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`relative px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-accent/20 border border-accent/40 rounded-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  );
}
