import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useToast } from "../context/ToastContext";
import formatPrice from "../utils/formatPrice";
import Button from "./Button";
import { StarIcon, CartIcon, EyeIcon } from "./Icons";

export default function ProductCart({ product }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const imageSrc =
    product?.thumbnail ||
    (product?.images && product.images[0]) ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60";

  const handleAddToCart = () => {
    addToCart(product);
    addToast(`Added "${product.title}" to cart!`, "success");
  };

  return (
    <article className="group glass-card rounded-3xl p-5 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500 pointer-events-none" />

      <div>
        {/* Card Header Media & Badges */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-900/80 mb-4 border border-slate-800/80 flex items-center justify-center p-4">
          <img
            src={imageSrc}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Rating Badge */}
          {product.rating && (
            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-800/80 flex items-center gap-1.5 text-xs font-semibold text-amber-400">
              <StarIcon className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{Number(product.rating).toFixed(1)}</span>
            </div>
          )}

          {/* Category Tag */}
          {product.category && (
            <div className="absolute top-3 right-3 bg-blue-500/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-blue-500/30 text-[10px] font-bold uppercase tracking-wider text-blue-300">
              {product.category}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-2 mb-4">
          <h2 className="text-base font-bold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-1">
            {product.title}
          </h2>

          {product.description && (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>
      </div>

      {/* Price & Action CTA */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-3 mt-auto">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Price
          </span>
          <span className="text-lg font-extrabold text-white tracking-tight">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Details Link */}
          <Link
            to={`/products/${product.id}`}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all duration-200"
            title="View Details"
          >
            <EyeIcon className="w-4 h-4" />
          </Link>

          {/* Add to Cart Button */}
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            icon={<CartIcon className="w-4 h-4" />}
            className="shadow-md shadow-blue-600/20"
          >
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}
