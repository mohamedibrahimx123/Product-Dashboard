import { Link, NavLink } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import { CartIcon, UserIcon, LogOutIcon, SparklesIcon, ShieldCheckIcon } from "./Icons";
import Button from "./Button";

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
              <SparklesIcon className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Nexus<span className="text-blue-500">Store</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-blue-400/80 -mt-1">
                Dashboard
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/protected"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`
              }
            >
              <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
              Protected Area
            </NavLink>
          </nav>

          {/* Action Controls (Cart & Auth) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart Link with Live Badge */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="View Shopping Cart"
            >
              <CartIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Button / Status */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold text-xs">
                    {user?.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                  <span className="text-sm font-medium text-slate-300 truncate max-w-[100px]">
                    {user?.name || "User"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                  icon={<LogOutIcon className="w-4 h-4" />}
                >
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<UserIcon className="w-4 h-4" />}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
