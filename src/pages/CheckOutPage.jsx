import { useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useToast } from "../context/ToastContext";
import CartSummary from "../components/CartSummary";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { createOrder } from "../Services/orderService";
import { CheckIcon, ArrowLeftIcon, ShieldCheckIcon, SparklesIcon, UserIcon, LockIcon } from "../components/Icons";

export default function CheckOutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderingComplete, setIsOrderingComplete] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitOrder();
  }

  async function submitOrder() {
    setIsSubmitting(true);
    setError("");

    const orderData = {
      customer: formData,
      items: cart,
      totalPrice: totalPrice,
    };

    try {
      const result = await createOrder(orderData);
      setOrderId(result.orderId);
      clearCart();
      setIsOrderingComplete(true);
      addToast("Order placed successfully!", "success");
    } catch (err) {
      console.error(err);
      setError("Failed to place order. Please try again.");
      addToast("Failed to place order", "danger");
    } fontally: {
      setIsSubmitting(false);
    }
  }

  if (cart.length === 0 && !isOrderingComplete) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl p-10 text-center border border-slate-800 max-w-md w-full space-y-4">
            <h1 className="text-2xl font-bold text-slate-100">Checkout</h1>
            <p className="text-slate-400 text-sm">Your shopping cart is empty.</p>
            <Link to="/cart">
              <Button variant="primary">Back to Cart</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (isOrderingComplete) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center border border-emerald-500/30 max-w-lg w-full space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce-short">
              <CheckIcon className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-white">Order Confirmed!</h1>
              <p className="text-slate-300 text-sm">
                Thank you for your purchase, <strong className="text-white">{formData.name}</strong>.
              </p>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-1">
              <span>Order Reference ID:</span>
              <p className="font-mono text-sm font-bold text-blue-400 select-all">{orderId}</p>
            </div>

            <p className="text-xs text-slate-400">
              A receipt has been sent to <strong>{formData.email}</strong>.
            </p>

            <Link to="/" className="inline-block pt-2">
              <Button variant="primary" size="lg" icon={<SparklesIcon className="w-4 h-4" />}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Checkout</h1>
            <p className="text-sm text-slate-400">Complete your shipping & billing information.</p>
          </div>

          <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center justify-between">
            <span>{error}</span>
            <Button variant="danger" size="sm" onClick={submitOrder} loading={isSubmitting}>
              Retry Order
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Customer Information Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80">
              <UserIcon className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">Customer Shipping Details</h2>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl glass-input text-sm text-white placeholder-slate-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl glass-input text-sm text-white placeholder-slate-500"
                />
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label htmlFor="address" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Delivery Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  placeholder="Street address, City, Country"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl glass-input text-sm text-white placeholder-slate-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              icon={<ShieldCheckIcon className="w-5 h-5" />}
              className="w-full shadow-lg shadow-blue-600/30"
            >
              Complete Purchase
            </Button>
          </form>

          {/* Sidebar Summary */}
          <div className="space-y-4">
            <CartSummary />
          </div>
        </div>
      </main>
    </div>
  );
}