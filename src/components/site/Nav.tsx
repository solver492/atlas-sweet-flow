import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useI18n, type Lang } from "@/lib/i18n";
import { useAtlas, cartCount } from "@/lib/store";

const LANGS: { code: Lang; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export function Nav() {
  const { t, lang, setLang } = useI18n();
  const cart = useAtlas((s) => s.cart);
  const setCartOpen = useAtlas((s) => s.setCartOpen);
  const [mobile, setMobile] = useState(false);
  const route = useRouterState({ select: (s) => s.location.pathname });
  const count = cartCount(cart);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl">
      <div className="glass rounded-2xl px-4 md:px-6 h-16 flex items-center justify-between animate-frost">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-9 bg-[var(--color-ice-blue)] rounded-xl flex items-center justify-center text-white font-extrabold shadow-lg shadow-[var(--color-ice-blue)]/30 group-hover:scale-105 transition-transform">
            A
          </div>
          <div className="hidden sm:block">
            <div className="text-[var(--color-ice-blue)] font-extrabold tracking-tight uppercase text-sm leading-none">Atlas Del Helados</div>
            <div className="text-[9px] text-slate-500 font-mono tracking-widest mt-0.5">SINCE 1955 · TETOUAN</div>
          </div>
        </Link>

        <div className="hidden lg:flex gap-7 text-[11px] font-bold uppercase tracking-widest text-[var(--color-ice-blue)]/70">
          <Link to="/" className={route === "/" ? "text-[var(--color-ice-blue)]" : "hover:text-[var(--color-ice-blue)] transition-colors"}>
            {t("nav.showroom")}
          </Link>
          <Link to="/catalogue" className={route === "/catalogue" ? "text-[var(--color-ice-blue)]" : "hover:text-[var(--color-ice-blue)] transition-colors"}>
            {t("cat.title").split(" ")[0]}
          </Link>
          <Link to="/admin" className="hover:text-[var(--color-ice-blue)] transition-colors">
            {t("nav.admin")}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-black/5 rounded-full px-2 py-1 gap-0.5 text-[10px] font-bold">
            {LANGS.map((l, i) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2 py-0.5 rounded-full transition-colors ${
                  lang === l.code ? "bg-[var(--color-ice-blue)] text-white" : "text-slate-600 hover:text-[var(--color-ice-blue)]"
                }`}
                aria-label={`Switch to ${l.label}`}
              >
                {l.label}
                {i < LANGS.length - 1 && <span className="sr-only">|</span>}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative size-9 grid place-items-center rounded-xl bg-white/60 hover:bg-white transition-colors border border-white/60"
            aria-label="Open cart"
          >
            <ShoppingCart className="size-4 text-[var(--color-ice-blue)]" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 size-4 grid place-items-center text-[9px] font-bold bg-[var(--color-sun-yellow)] text-[var(--color-ice-blue)] rounded-full shadow">
                {count}
              </span>
            )}
          </button>

          <Link
            to="/checkout"
            className="hidden sm:inline-flex bg-[var(--color-sun-yellow)] text-[var(--color-ice-blue)] px-4 py-2 rounded-xl text-xs font-extrabold shadow-lg shadow-[var(--color-sun-yellow)]/30 hover:scale-[1.03] active:scale-95 transition-transform"
          >
            {t("nav.portal")}
          </Link>

          <button className="lg:hidden size-9 grid place-items-center rounded-xl bg-white/60 border border-white/60" onClick={() => setMobile((m) => !m)} aria-label="Menu">
            {mobile ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {mobile && (
        <div className="glass rounded-2xl mt-2 p-4 flex flex-col gap-2 lg:hidden animate-frost">
          <Link to="/" onClick={() => setMobile(false)} className="px-3 py-2 rounded-lg hover:bg-white/50 text-sm font-bold text-[var(--color-ice-blue)]">{t("nav.showroom")}</Link>
          <Link to="/catalogue" onClick={() => setMobile(false)} className="px-3 py-2 rounded-lg hover:bg-white/50 text-sm font-bold text-[var(--color-ice-blue)]">Catalogue</Link>
          <Link to="/admin" onClick={() => setMobile(false)} className="px-3 py-2 rounded-lg hover:bg-white/50 text-sm font-bold text-[var(--color-ice-blue)]">{t("nav.admin")}</Link>
          <div className="flex gap-1 mt-2 bg-black/5 rounded-full p-1">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`flex-1 px-2 py-1 text-[10px] font-bold rounded-full ${lang === l.code ? "bg-[var(--color-ice-blue)] text-white" : "text-slate-600"}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
