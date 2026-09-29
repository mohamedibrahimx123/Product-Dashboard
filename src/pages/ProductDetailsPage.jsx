import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../Services/ProductService";
import useCart from "../hooks/useCart";
import { useToast } from "../context/ToastContext";
import formatPrice from "../utils/formatPrice";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import QuantitySelector from "../components/QuantitySelector";
import { ArrowLeftIcon, StarIcon, CartIcon, ShieldCheckIcon, SparklesIcon } from "../components/Icons";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data);
        if (data?.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        } else if (data?.thumbnail) {
          setSelectedImage(data.thumbnail);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    addToast(`Added ${quantity} x "${product.title}" to cart!`, "success");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Products</span>
        </Link>

        {loading ? (
          /* Loading Skeleton */
          <div className="glass-panel rounded-3xl p-8 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
            <div className="w-full aspect-square bg-slate-800/60 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-8 bg-slate-800/80 rounded-md w-3/4" />
              <div className="h-5 bg-slate-800/60 rounded-md w-1/4" />
              <div className="h-24 bg-slate-800/40 rounded-xl" />
              <div className="h-12 bg-slate-800 rounded-xl w-1/2" />
            </div>
          </div>
        ) : error || !product ? (
          /* Error State */
          <div className="glass-panel rounded-3xl p-12 text-center border border-rose-500/30 max-w-md mx-auto space-y-4">
            <h2 className="text-xl font-bold text-slate-100">Product Not Found</h2>
            <p className="text-sm text-slate-400">{error || "Unable to locate requested product."}</p>
            <Link to="/">
              <Button variant="primary">Return to Catalog</Button>
            </Link>
          </div>
        ) : (
          /* Product Details Card */
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Left Column: Image Gallery */}
            <div className="space-y-4">
              <div className="relative w-full aspect-square rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedImage || product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-contain max-h-[400px] transition-all duration-300"
                />
                {product.category && (
                  <span className="absolute top-4 left-4 bg-blue-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-blue-500/30 text-xs font-bold uppercase text-blue-300">
                    {product.category}
                  </span>
                )}
              </div>

              {/* Thumbnails list if multiple images exist */}
              {product.images && product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl bg-slate-900 border p-1 shrink-0 overflow-hidden transition-all ${
                        selectedImage === img
                          ? "border-blue-500 ring-2 ring-blue-500/30 scale-105"
                          : "border-slate-800 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Metadata & Actions */}
            <div className="space-y-6">
              <div className="space-y-2">
                {product.brand && (
                  <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
                    {product.brand}
                  </span>
                )}
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  {product.title}
                </h1>

                {/* Rating & Stock Status */}
                <div className="flex items-center gap-4 text-sm pt-1">
                  {product.rating && (
                    <div className="flex items-center gap-1 text-amber-400 font-semibold bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                      <StarIcon className="w-4 h-4 fill-amber-400" />
                      <span>{Number(product.rating).toFixed(1)} Rating</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>In Stock ({product.stock || 25} available)</span>
                  </div>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-white">
                  {formatPrice(product.price)}
                </span>
                {product.discountPercentage && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md border border-emerald-400/20">
                    -{Math.round(product.discountPercentage)}% OFF
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Description
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                    Quantity:
                  </span>
                  <QuantitySelector
                    quantity={quantity}
                    onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                    onIncrease={() => setQuantity((q) => q + 1)}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddToCart}
                    icon={<CartIcon className="w-5 h-5" />}
                    className="w-full sm:flex-1 shadow-lg shadow-blue-600/30"
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/60 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-4 h-4 text-blue-400" />
                  <span>2 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <SparklesIcon className="w-4 h-4 text-indigo-400" />
                  <span>Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
