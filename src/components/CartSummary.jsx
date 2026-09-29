import useCart from "../hooks/useCart";
import formatPrice from "../utils/formatPrice";
import { ShoppingBagIcon, ShieldCheckIcon } from "./Icons";

export default function CartSummary() {
  const { cartCount, totalPrice } = useCart();
  const estimatedShipping = cartCount > 0 ? (totalPrice > 500 ? 0 : 50) : 0;
  const grandTotal = totalPrice + estimatedShipping;

  return (
    <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
        <ShoppingBagIcon className="w-5 h-5 text-blue-400" />
        <h2 className="text-lg font-bold text-slate-100">Order Summary</h2>
      </div>

      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between text-slate-400">
          <span>Total Items</span>
          <span className="font-semibold text-slate-200">{cartCount} items</span>
        </div>

        <div className="flex justify-between text-slate-400">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-200">{formatPrice(totalPrice)}</span>
        </div>

        <div className="flex justify-between text-slate-400">
          <span>Shipping</span>
          <span className="font-semibold text-emerald-400">
            {estimatedShipping === 0 ? "FREE" : formatPrice(estimatedShipping)}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
        <span className="text-base font-bold text-slate-100">Grand Total</span>
        <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
          {formatPrice(grandTotal)}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
        <ShieldCheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Secured Checkout with 256-bit Encryption</span>
      </div>
    </div>
  );
}
