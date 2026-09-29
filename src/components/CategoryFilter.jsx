import { FilterIcon } from "./Icons";

export default function CategoryFilter({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) {
  const formatCategory = (cat) => {
    if (!cat) return "";
    return cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ");
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1 shrink-0">
        <FilterIcon className="w-4 h-4 text-blue-400" />
        <span>Categories:</span>
      </div>

      {/* All Category Pill */}
      <button
        type="button"
        onClick={() => setSelectedCategory("all")}
        className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all duration-200 shrink-0 ${
          selectedCategory === "all"
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/30"
            : "bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
        }`}
      >
        All Products
      </button>

      {/* Category Pills */}
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all duration-200 shrink-0 ${
            selectedCategory === category
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/30"
              : "bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
          }`}
        >
          {formatCategory(category)}
        </button>
      ))}
    </div>
  );
}