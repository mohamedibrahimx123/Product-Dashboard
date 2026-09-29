import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductList from "../components/ProductList";
import useProducts from "../hooks/useProducts";
import SortSelect from "../components/SortSelect";
import Button from "../components/Button";
import { ProductCardSkeleton } from "../components/Skeleton";
import { SparklesIcon, RefreshCw, ShoppingBagIcon } from "../components/Icons";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  const categories = [
    ...new Set(
      products.map((product) => product.category).filter(Boolean)
    ),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts];

  if (sortOption === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "name-asc") {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "rating-desc") {
    sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortOption("default");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <section className="relative glass-panel rounded-3xl p-8 sm:p-10 overflow-hidden border border-slate-800/80 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <SparklesIcon className="w-4 h-4" />
              <span>Next-Gen Product Catalog</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Explore Our <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Curated Collection</span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Browse top-tier electronics, fashion, accessories, and home goods with instant filtering, live sorting, and real-time shopping cart management.
            </p>

            {/* Quick Stats */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800">
                <ShoppingBagIcon className="w-4 h-4 text-blue-400" />
                <span><strong className="text-white font-bold">{products.length}</strong> Total Items</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800">
                <SparklesIcon className="w-4 h-4 text-indigo-400" />
                <span><strong className="text-white font-bold">{categories.length}</strong> Categories</span>
              </div>
            </div>
          </div>
        </section>

        {/* Toolbar: Search, Filters & Sorting */}
        <section className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="w-full lg:w-96">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            {/* Sorting */}
            <div className="w-full sm:w-auto self-end lg:self-center">
              <SortSelect sortOption={sortOption} setSortOption={setSortOption} />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="pt-2 border-t border-slate-800/80">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </section>

        {/* Content Area */}
        {loading ? (
          /* Loading Skeleton Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          /* Error Banner */
          <div className="glass-panel p-8 rounded-3xl border border-rose-500/30 text-center space-y-4 max-w-md mx-auto my-12">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
            <h2 className="text-lg font-bold text-white">Failed to Load Products</h2>
            <p className="text-sm text-slate-400">{error}</p>
            <Button variant="danger" onClick={() => window.location.reload()}>
              Retry Loading
            </Button>
          </div>
        ) : sortedProducts.length === 0 ? (
          /* Empty Search Results */
          <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-4 max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
              <ShoppingBagIcon className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-200">No Products Found</h2>
            <p className="text-sm text-slate-400">
              We couldn't find any products matching your search query or selected category filter.
            </p>
            <Button variant="outline" onClick={handleResetFilters} icon={<RefreshCw className="w-4 h-4" />}>
              Reset Filters
            </Button>
          </div>
        ) : (
          /* Products Grid */
          <ProductList products={sortedProducts} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-8 bg-slate-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          <p>© 2026 NexusStore. All rights reserved. Powered by React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}