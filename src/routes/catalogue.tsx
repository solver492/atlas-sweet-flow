import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/site/PublicLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { useAtlas } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import type { Category } from "@/lib/data";

export const Route = createFileRoute("/catalogue")({
  component: Catalogue,
});

function Catalogue() {
  const { t } = useI18n();
  const products = useAtlas((s) => s.products);
  const [cat, setCat] = useState<Category | "all">("all");
  const [q, setQ] = useState("");

  const filtered = products.filter((p) => {
    if (cat !== "all" && p.category !== cat) return false;
    if (q && !p.name.toLowerCase().includes(q.toLowerCase()) && !p.description.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <PublicLayout>
      <section className="px-6 max-w-7xl mx-auto pt-8 pb-16">
        <div className="mb-10">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ice-blue)]/60 mb-2">SHOWROOM · 2026</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-ice-blue)] tracking-tight mb-4">{t("cat.title")}</h1>
          <p className="text-slate-600 max-w-2xl">{t("cat.subtitle")}</p>
        </div>

        <div className="glass rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="flex flex-wrap gap-2 flex-1">
            {(["all", "individuelle", "professionnelle", "equipements"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  cat === c
                    ? "bg-[var(--color-ice-blue)] text-white shadow-lg shadow-[var(--color-ice-blue)]/30"
                    : "bg-white/60 text-[var(--color-ice-blue)] hover:bg-white"
                }`}
              >
                {c === "all" ? t("cat.all") : t(`cat.${c}`)}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="md:w-64 px-4 py-2.5 rounded-xl bg-white/80 border border-white/60 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-ice-blue)]/30"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500">No products match your filters.</div>
        )}
      </section>
    </PublicLayout>
  );
}
