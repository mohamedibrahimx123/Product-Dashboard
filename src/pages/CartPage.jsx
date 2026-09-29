import { useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useToast } from "../context/ToastContext";
import CartSummary from "../components/CartSummary";
import formatPrice from "../utils/formatPrice";
import QuantitySelector from "../components/QuantitySelector";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { TrashIcon, ShoppingBagIcon, ArrowLeftIcon, CheckIcon, SparklesIcon } from "../components/Icons";

export default function CartPage() {
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { addToast } = useToast();

  const handleRemove = (item) => {
    removeFromCart(item.id);
    addToast(`Removed "${item.title}" from cart`, "danger");
  };

  const handleClearCart = () => {
    clearCart();
    setIsConfirmingClear(false);
    addToast("Shopping cart cleared", "danger");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Shopping Cart
            </h1>
            <p className="text-sm text-slate-400">
              Manage your selected items before proceeding to secure checkout.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 max-w-md mx-auto my-12 space-y-4">
            <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 text-blue-400 flex items-center justify-center mx-auto">
              <ShoppingBagIcon className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-slate-200">Your Cart is Empty</h2>
            <p className="text-sm text-slate-400">
              Looks like you haven't added any items to your shopping cart yet.
            </p>
            <Link to="/" className="inline-block pt-2">
              <Button variant="primary" icon={<SparklesIcon className="w-4 h-4" />}>
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          /* Cart Items & Summary Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Item Details ({cart.length} unique)
                </span>

                {isConfirmingClear ? (
                  <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-rose-500/40">
                    <span className="text-xs text-rose-300 px-2 font-medium">Clear all?</span>
                    <Button variant="danger" size="sm" onClick={handleClearCart}>
                      Yes
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setIsConfirmingClear(false)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsConfirmingClear(true)}
                    icon={<TrashIcon className="w-3.5 h-3.5" />}
                    className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                  >
                    Clear Cart
                  </Button>
                )}
              </div>

              {cart.map((item) => {
                const imageSrc =
                  item.thumbnail ||
                  (item.images && item.images[0]) ||
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=60";

                return (
                  <article
                    key={item.id}
                    className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 border border-slate-800/80 transition-all hover:border-slate-700"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-900 border border-slate-800 p-2 shrink-0 flex items-center justify-center">
                      <img
                        src={imageSrc}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 space-y-1 text-center sm:text-left min-w-0">
                      <Link
                        to={`/products/${item.id}`}
                        className="text-base font-bold text-slate-100 hover:text-blue-400 transition-colors line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-slate-400">
                        Unit Price: {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-4">
                      <QuantitySelector
                        quantity={item.quantity}
                        onDecrease={() => decreaseQuantity(item.id)}
                        onIncrease={() => increaseQuantity(item.id)}
                      />

                      {/* Item Subtotal */}
                      <div className="text-right min-w-[90px]">
                        <span className="text-xs text-slate-400 uppercase font-bold block">Subtotal</span>
                        <span className="text-sm font-extrabold text-white">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemove(item)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Remove item"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Sidebar Summary & Checkout */}
            <div className="space-y-4">
              <CartSummary />

              <Link to="/checkout" className="block">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full shadow-lg shadow-blue-600/30"
                  icon={<CheckIcon className="w-5 h-5" />}
                >
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}