export function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-800/60 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-slate-700/20 before:to-transparent ${className}`}
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="glass-card rounded-3xl p-5 space-y-4 animate-pulse border border-slate-800/80">
      <div className="w-full aspect-square bg-slate-800/80 rounded-2xl relative overflow-hidden" />
      <div className="space-y-2">
        <div className="h-4 bg-slate-800/90 rounded-md w-3/4" />
        <div className="h-3 bg-slate-800/50 rounded-md w-full" />
        <div className="h-3 bg-slate-800/50 rounded-md w-2/3" />
      </div>
      <div className="pt-4 border-t border-slate-800/80 flex justify-between items-center">
        <div className="h-6 bg-slate-800/90 rounded-md w-24" />
        <div className="h-9 bg-slate-800 rounded-xl w-20" />
      </div>
    </div>
  );
}
