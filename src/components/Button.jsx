export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  className = "",
  loading = false,
  disabled = false,
  icon = null,
  ...rest
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25 border border-blue-400/30 focus:ring-blue-500",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/80 focus:ring-slate-500",
    danger:
      "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-lg shadow-rose-600/20 border border-rose-400/30 focus:ring-rose-500",
    outline:
      "bg-slate-900/50 hover:bg-blue-600/10 text-blue-400 hover:text-blue-300 border border-blue-500/40 hover:border-blue-400/80 focus:ring-blue-500",
    ghost:
      "bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white focus:ring-slate-500",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="flex items-center">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}