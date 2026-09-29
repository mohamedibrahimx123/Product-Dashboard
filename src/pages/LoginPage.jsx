import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useToast } from "../context/ToastContext";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { UserIcon, LockIcon, SparklesIcon, ShieldCheckIcon } from "../components/Icons";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleDemoFill = () => {
    setFormData({
      email: "demo@nexusstore.com",
      password: "password123",
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password);
      addToast("Successfully logged in!", "success");
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Failed to login. Please check your credentials.");
      addToast("Invalid login credentials", "danger");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 max-w-md w-full space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Welcome Back</h1>
            <p className="text-xs text-slate-400">
              Sign in to access your saved dashboard settings & protected routes.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="user@nexusstore.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl glass-input text-sm text-white placeholder-slate-500"
                />
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl glass-input text-sm text-white placeholder-slate-500"
                />
                <LockIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Quick Autofill Helper for Testing */}
            <button
              type="button"
              onClick={handleDemoFill}
              className="w-full text-xs text-blue-400 hover:text-blue-300 text-right font-medium flex items-center justify-end gap-1"
            >
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Fill Demo Credentials</span>
            </button>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              icon={<ShieldCheckIcon className="w-5 h-5" />}
              className="w-full shadow-lg shadow-blue-600/30"
            >
              Sign In
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-slate-800/80">
            <Link to="/" className="text-xs text-slate-400 hover:text-white transition-colors">
              ← Return to Product Catalog
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}