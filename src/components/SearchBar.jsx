import { SearchIcon, XIcon } from "./Icons";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <SearchIcon className="w-5 h-5" />
      </div>
      <input
        type="text"
        placeholder="Search products by name or keyword..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-11 pr-10 py-3 rounded-2xl glass-input text-sm text-slate-100 placeholder-slate-500 border border-slate-800 focus:border-blue-500/80 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => setSearchTerm("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
          aria-label="Clear search"
        >
          <XIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
