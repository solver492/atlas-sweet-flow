import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { PublicLayout } from "@/components/site/PublicLayout";
import { useAtlas } from "@/lib/store";
import { useI18n, SECTOR_LIST } from "@/lib/i18n";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  const { t } = useI18n();
  
  const { cart, products, createOrder } = useAtlas();
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [form, setForm] = useState({ business: "", responsible: "", phone: "", sector: SECTOR_LIST[0] });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const items = cart
    .map((c) => {
      const p = products.find((x) => x.id === c.productId);
      return p ? { ...p, qty: c.qty } : null;
    })
    .filter(Boolean) as (typeof products[number] & { qty: number })[];
  const total = items.reduce((s, i) => s + i.qty, 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (form.business.trim().length < 2) newErrors.business = "Required";
    if (form.responsible.trim().length < 2) newErrors.responsible = "Required";
    if (!/^[+\d\s()-]{8,}$/.test(form.phone)) newErrors.phone = "Invalid phone";
    if (items.length === 0) newErrors.cart = "Cart is empty";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    const order = createOrder(form);
    setSubmitted(order.id);
  };

  if (submitted) {
    return (
      <PublicLayout>
        <section className="px-6 max-w-2xl mx-auto pt-16 pb-32">
          <div className="glass rounded-3xl p-10 text-center animate-frost">
            <div className="size-20 mx-auto rounded-full bg-emerald-100 grid place-items-center mb-6">
              <CheckCircle2 className="size-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-[var(--color-ice-blue)] mb-3">{t("checkout.success.title")}</h1>
            <p className="text-slate-600 mb-6 leading-relaxed">{t("checkout.success.msg")}</p>
            <div className="inline-flex items-center gap-3 glass-soft rounded-xl px-5 py-3 mb-8">
              <span className="text-xs font-mono text-slate-500">Order ID</span>
              <span className="font-extrabold text-[var(--color-ice-blue)]">{submitted}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/" className="px-6 py-3 rounded-xl bg-[var(--color-ice-blue)] text-white font-bold shadow-lg shadow-[var(--color-ice-blue)]/30">Back to Home</Link>
              <Link to="/admin/orders" className="px-6 py-3 rounded-xl glass-soft font-bold text-[var(--color-ice-blue)]">View in Admin</Link>
            </div>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="px-6 max-w-6xl mx-auto pt-8 pb-20">
        <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ice-blue)]/60 mb-2">B2B CHECKOUT</div>
        <h1 className="text-4xl font-extrabold text-[var(--color-ice-blue)] mb-10">{t("checkout.title")}</h1>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          <form onSubmit={submit} className="glass rounded-3xl p-6 md:p-8 space-y-5">
            <Field label={t("checkout.business")} error={errors.business}>
              <input
                type="text"
                value={form.business}
                onChange={(e) => setForm({ ...form, business: e.target.value })}
                maxLength={100}
                placeholder="Café Fleur, Mahlaba Al-Amal..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-ice-blue)]/30"
              />
            </Field>
            <Field label={t("checkout.responsible")} error={errors.responsible}>
              <input
                type="text"
                value={form.responsible}
                onChange={(e) => setForm({ ...form, responsible: e.target.value })}
                maxLength={100}
                placeholder="Karim Benali"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-ice-blue)]/30"
              />
            </Field>
            <Field label={t("checkout.phone")} error={errors.phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                maxLength={30}
                placeholder="+212 661 12 34 56"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-ice-blue)]/30"
              />
            </Field>
            <Field label={t("checkout.sector")}>
              <select
                value={form.sector}
                onChange={(e) => setForm({ ...form, sector: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-ice-blue)]/30"
              >
                {SECTOR_LIST.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>

            {errors.cart && <div className="text-rose-600 text-sm">{errors.cart}</div>}

            <button
              type="submit"
              disabled={items.length === 0}
              className="w-full py-4 rounded-xl bg-[var(--color-ice-blue)] hover:bg-[var(--color-ice-deep)] text-white font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-[var(--color-ice-blue)]/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {t("checkout.submit")} <ArrowRight className="size-4" />
            </button>
          </form>

          <aside className="glass rounded-3xl p-6 h-fit">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ice-blue)]/60 mb-1">Summary</div>
            <h2 className="font-extrabold text-[var(--color-ice-blue)] mb-4">{t("cart.title")}</h2>
            {items.length === 0 && <p className="text-slate-500 text-sm py-4">{t("cart.empty")}</p>}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-3 glass-soft p-2 rounded-xl">
                  <div className={`size-10 rounded-lg bg-gradient-to-br ${it.gradient} grid place-items-center text-lg shrink-0`}>{it.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[var(--color-ice-blue)] truncate">{it.name}</div>
                    <div className="text-[10px] text-slate-500">{it.packaging}</div>
                  </div>
                  <div className="text-sm font-extrabold text-[var(--color-ice-blue)]">×{it.qty}</div>
                </div>
              ))}
            </div>
            {items.length > 0 && (
              <div className="border-t border-white/40 mt-4 pt-4 flex justify-between items-center">
                <span className="text-xs text-slate-500 uppercase tracking-wider">Total {t("cart.units")}</span>
                <span className="text-2xl font-extrabold text-[var(--color-ice-blue)]">{total}</span>
              </div>
            )}
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2 block">{label}</label>
      {children}
      {error && <div className="text-rose-600 text-xs mt-1">{error}</div>}
    </div>
  );
}
