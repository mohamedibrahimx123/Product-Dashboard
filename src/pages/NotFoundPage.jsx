import { Link } from "react-router-dom";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { ArrowLeftIcon, SparklesIcon } from "../components/Icons";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="glass-panel rounded-3xl p-10 sm:p-16 text-center border border-slate-800 max-w-lg w-full space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2">
            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 tracking-tighter">
              404
            </span>
            <h1 className="text-2xl font-extrabold text-white">Page Not Found</h1>
            <p className="text-slate-400 text-sm">
              The page or resource you are searching for does not exist or has been moved.
            </p>
          </div>

          <Link to="/" className="inline-block pt-2">
            <Button variant="primary" size="lg" icon={<ArrowLeftIcon className="w-5 h-5" />}>
              Back to Catalog
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
