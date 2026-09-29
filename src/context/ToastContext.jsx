import { createContext, useState, useContext, useCallback } from "react";
import { CheckIcon, XIcon, SparklesIcon } from "../components/Icons";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Render Portal */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border glass-panel shadow-2xl backdrop-blur-xl transform transition-all duration-300 animate-bounce-short ${
              toast.type === "success"
                ? "border-emerald-500/30 bg-slate-900/90 text-emerald-300"
                : toast.type === "danger"
                ? "border-rose-500/30 bg-slate-900/90 text-rose-300"
                : "border-blue-500/30 bg-slate-900/90 text-blue-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  toast.type === "success"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : toast.type === "danger"
                    ? "bg-rose-500/20 text-rose-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {toast.type === "success" ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  <SparklesIcon className="w-5 h-5" />
                )}
              </div>
              <p className="text-sm font-medium text-slate-100">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-200 transition-colors p-1"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
