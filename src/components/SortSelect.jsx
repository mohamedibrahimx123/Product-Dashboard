import { SortIcon } from "./Icons";

export default function SortSelect({ sortOption, setSortOption }) {
  return (
    <div className="relative inline-flex items-center w-full sm:w-auto">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <SortIcon className="w-4 h-4 text-indigo-400" />
      </div>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="w-full sm:w-auto pl-10 pr-9 py-2.5 rounded-2xl glass-input text-xs font-semibold text-slate-200 border border-slate-800 focus:border-indigo-500/80 focus:ring-4 focus:ring-indigo-500/20 appearance-none cursor-pointer transition-all duration-200 bg-slate-900"
      >
        <option value="default" className="bg-slate-900 text-slate-200">
          Sort by: Default
        </option>
        <option value="price-asc" className="bg-slate-900 text-slate-200">
          Price: Low to High
        </option>
        <option value="price-desc" className="bg-slate-900 text-slate-200">
          Price: High to Low
        </option>
        <option value="name-asc" className="bg-slate-900 text-slate-200">
          Name: A to Z
        </option>
        <option value="rating-desc" className="bg-slate-900 text-slate-200">
          Highest Rated
        </option>
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}