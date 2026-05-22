export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  type = "button",
}) {
  const variants = {
    primary:
      "bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/25",
    secondary:
      "bg-surface-border/50 hover:bg-surface-border text-gray-200",
    danger: "bg-red-600/80 hover:bg-red-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
