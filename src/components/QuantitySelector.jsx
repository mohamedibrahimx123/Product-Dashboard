import { PlusIcon, MinusIcon } from "./Icons";

export default function QuantitySelector({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="inline-flex items-center bg-slate-900/90 rounded-xl border border-slate-800 p-1">
      <button
        type="button"
        onClick={onDecrease}
        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
        aria-label="Decrease quantity"
      >
        <MinusIcon className="w-3.5 h-3.5" />
      </button>

      <span className="w-10 text-center font-bold text-sm text-slate-100 select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
        aria-label="Increase quantity"
      >
        <PlusIcon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
