import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ShieldCheck, Snowflake, Truck, ArrowUpRight, Sparkles } from "lucide-react";
import { PublicLayout } from "@/components/site/PublicLayout";
import { useI18n } from "@/lib/i18n";
import { useAtlas } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { t } = useI18n();
  const products = useAtlas((s) => s.products);
  const [tab, setTab] = useState<"individuelle" | "professionnelle" | "equipements">("individuelle");
  const featured = products.filter((p) => p.category === tab).slice(0, 4);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="px-6 max-w-7xl mx-auto pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 animate-frost">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-soft text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-ice-blue)]">
              <span className="size-1.5 bg-[var(--color-sun-yellow)] rounded-full animate-pulse" />
              {t("hero.badge")}
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[var(--color-ice-blue)] leading-[0.95] tracking-tight text-balance">
              {t("hero.title.1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-ice-blue)] via-[var(--color-ice-deep)] to-[var(--color-sun-yellow)]">
                {t("hero.title.2")}
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">{t("hero.subtitle")}</p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/catalogue"
                className="group bg-[var(--color-ice-blue)] hover:bg-[var(--color-ice-deep)] text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-[var(--color-ice-blue)]/30 transition-all hover:scale-[1.02]"
              >
                {t("hero.cta.catalogue")}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/checkout"
                className="glass-soft hover:bg-white/70 px-6 py-3.5 rounded-xl font-bold text-[var(--color-ice-blue)] flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                {t("hero.cta.partner")}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="glass p-5 rounded-2xl">
                <div className="text-3xl font-extrabold text-[var(--color-ice-blue)]">60+</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-1">{t("hero.stat.years")}</div>
              </div>
              <div className="glass p-5 rounded-2xl">
                <div className="text-3xl font-extrabold text-[var(--color-ice-blue)]">-25°C</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-1">{t("hero.stat.cold")}</div>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative animate-frost [animation-delay:200ms]">
            <div className="absolute -inset-8 bg-[var(--color-sun-yellow)]/20 blur-3xl rounded-full" />
            <div className="absolute -inset-12 bg-[var(--color-ice-blue)]/20 blur-3xl rounded-full -z-10" />
            <div className="relative w-full aspect-[4/5] rounded-[40px] overflow-hidden glass shadow-2xl shadow-[var(--color-ice-blue)]/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ice-blue)] via-sky-400 to-[var(--color-sun-yellow)] opacity-90" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-[180px] drop-shadow-2xl animate-[float-soft_5s_ease-in-out_infinite]">🍦</div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ice-blue)] mb-1">Signature Range</div>
                <div className="text-lg font-extrabold text-[var(--color-ice-blue)]">14 Flavors · Artisanal</div>
              </div>
              <div className="absolute top-6 right-6 glass rounded-2xl px-4 py-3 flex items-center gap-2 animate-[float-soft_4s_ease-in-out_infinite]">
                <Sparkles className="size-4 text-[var(--color-sun-yellow)]" />
                <div className="text-[10px] font-bold text-[var(--color-ice-blue)] uppercase">طعم ما كيتنساش</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="px-6 max-w-7xl mx-auto pb-20">
        <div className="glass rounded-3xl p-6 md:p-8 grid sm:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, label: t("trust.experience"), sub: "Maître Glacier · Tétouan" },
            { icon: Snowflake, label: t("trust.cold"), sub: "Camions réfrigérés · -25°C" },
            { icon: Truck, label: t("trust.delivery"), sub: "Tanger → Chefchaouen" },
          ].map((it) => (
            <div key={it.label} className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-[var(--color-ice-blue)]/10 grid place-items-center text-[var(--color-ice-blue)] shrink-0">
                <it.icon className="size-5" />
              </div>
              <div>
                <div className="font-bold text-[var(--color-ice-blue)] text-sm">{it.label}</div>
                <div className="text-xs text-slate-500">{it.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Catalogue preview */}
      <section className="px-6 max-w-7xl mx-auto pb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ice-blue)]/60 mb-2">REF: 2026_CATALOGUE</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-ice-blue)] tracking-tight">{t("cat.title")}</h2>
            <p className="text-slate-500 mt-2 max-w-md">{t("cat.subtitle")}</p>
          </div>
          <Link to="/catalogue" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-ice-blue)] group">
            {t("cat.all")}
            <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {(["individuelle", "professionnelle", "equipements"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setTab(c)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                tab === c
                  ? "bg-[var(--color-ice-blue)] text-white shadow-lg shadow-[var(--color-ice-blue)]/30"
                  : "glass-soft text-[var(--color-ice-blue)] hover:bg-white"
              }`}
            >
              {t(`cat.${c}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
