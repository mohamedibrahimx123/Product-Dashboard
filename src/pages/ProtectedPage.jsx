import { useState } from "react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { getProtectedData } from "../Services/protectedService";
import { ShieldCheckIcon, UserIcon, SparklesIcon, LockIcon } from "../components/Icons";

export default function ProtectedPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLoadData() {
    setLoading(true);
    setError("");

    try {
      const result = await getProtectedData();
      setData(result);
    } catch (err) {
      console.error(err);
      setError("Failed to load protected data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 space-y-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <ShieldCheckIcon className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-emerald-400">
                Authenticated Zone
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Protected API Verification
              </h1>
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed">
            This endpoint requires a valid JWT session token attached to request headers. Click below to initiate an authenticated request.
          </p>

          <Button
            onClick={handleLoadData}
            loading={loading}
            variant="primary"
            size="lg"
            icon={<LockIcon className="w-5 h-5" />}
            className="shadow-lg shadow-blue-600/30"
          >
            Fetch Protected User Data
          </Button>

          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
              {error}
            </div>
          )}

          {data && (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 animate-fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                <SparklesIcon className="w-4 h-4" />
                <span>Protected Payload Response</span>
              </div>
              <div className="space-y-1 text-sm">
                <p><strong className="text-slate-300">Name:</strong> {data.name}</p>
                <p><strong className="text-slate-300">Email:</strong> {data.email}</p>
                <p><strong className="text-slate-300">Server Message:</strong> {data.message}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}