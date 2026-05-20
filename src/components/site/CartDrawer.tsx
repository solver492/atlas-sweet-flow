import { X, Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { useAtlas } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, products, removeFromCart, updateQty } = useAtlas();
  const { t } = useI18n();

  const items = cart
    .map((c) => {
      const p = products.find((x) => x.id === c.productId);
      return p ? { ...p, qty: c.qty } : null;
    })
    .filter(Boolean) as (typeof products[number] & { qty: number })[];

  const totalUnits = items.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      {cartOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] animate-frost"
          onClick={() => setCartOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] z-[70] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full glass flex flex-col">
          <header className="p-6 border-b border-white/40 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ice-blue)]">B2B Quick Cart</div>
              <h2 className="text-xl font-extrabold text-[var(--color-ice-blue)]">{t("cart.title")}</h2>
            </div>
            <button onClick={() => setCartOpen(false)} className="size-9 grid place-items-center rounded-full bg-white/60 hover:bg-white" aria-label="Close">
              <X className="size-4" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {items.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-sm text-slate-500">{t("cart.empty")}</p>
              </div>
            )}
            {items.map((it) => (
              <div key={it.id} className="glass-soft rounded-2xl p-3 flex items-center gap-3">
                <div className={`size-14 rounded-xl bg-gradient-to-br ${it.gradient} grid place-items-center text-2xl shrink-0`}>{it.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-[var(--color-ice-blue)] truncate">{it.name}</div>
                  <div className="text-[10px] text-slate-500">{it.packaging}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQty(it.id, it.qty - 1)} className="size-6 grid place-items-center rounded-md bg-white border border-slate-200 hover:border-[var(--color-ice-blue)]">
                      <Minus className="size-3" />
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{it.qty}</span>
                    <button onClick={() => updateQty(it.id, it.qty + 1)} className="size-6 grid place-items-center rounded-md bg-white border border-slate-200 hover:border-[var(--color-ice-blue)]">
                      <Plus className="size-3" />
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(it.id)} className="size-8 grid place-items-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50" aria-label="Remove">
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>

          {items.length > 0 && (
            <footer className="p-6 border-t border-white/40 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Total {t("cart.units")}</span>
                <span className="font-extrabold text-[var(--color-ice-blue)] text-2xl">{totalUnits}</span>
              </div>
              <Link
                to="/checkout"
                onClick={() => setCartOpen(false)}
                className="w-full bg-[var(--color-ice-blue)] hover:bg-[var(--color-ice-deep)] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-ice-blue)]/30 transition-colors"
              >
                {t("cart.checkout")} <ArrowRight className="size-4" />
              </Link>
            </footer>
          )}
        </div>
      </aside>
    </>
  );
}
