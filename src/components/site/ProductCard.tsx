import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { useAtlas } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/lib/data";
import { toast } from "sonner";

export function ProductCard({ p }: { p: Product }) {
  const add = useAtlas((s) => s.addToCart);
  const { t } = useI18n();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(p.id);
    setAdded(true);
    toast.success(`${p.name} — ${t("cat.added")}`);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="group relative p-3 glass-soft rounded-3xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--color-ice-blue)]/10">
      <div className={`relative w-full aspect-square bg-gradient-to-br ${p.gradient} rounded-2xl mb-4 overflow-hidden grid place-items-center shadow-inner`}>
        <span className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-500">{p.emoji}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        {p.badge && (
          <span className="absolute top-3 left-3 bg-[var(--color-sun-yellow)] text-[var(--color-ice-blue)] text-[9px] font-extrabold px-2 py-1 rounded-md uppercase tracking-wider shadow">
            {p.badge}
          </span>
        )}
        {p.stock <= p.threshold && (
          <span className="absolute top-3 right-3 bg-rose-500 text-white text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow animate-pulse">
            Low Stock
          </span>
        )}
      </div>
      <div className="px-2 pb-2">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-bold text-[var(--color-ice-blue)] text-sm leading-tight">{p.name}</h3>
        </div>
        <p className="text-xs text-slate-500 leading-snug mb-3 line-clamp-2 min-h-[2rem]">{p.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-600 bg-white/60 px-2 py-1 rounded">{p.packaging}</span>
          <button
            onClick={onAdd}
            className={`size-9 rounded-full grid place-items-center transition-all ${
              added
                ? "bg-emerald-500 text-white scale-110"
                : "bg-[var(--color-ice-blue)] text-white hover:bg-[var(--color-ice-deep)] hover:scale-110 shadow-md shadow-[var(--color-ice-blue)]/30"
            }`}
            aria-label={t("cat.add")}
          >
            {added ? <Check className="size-4" /> : <Plus className="size-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
