import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit3 } from "lucide-react";
import { useAtlas } from "@/lib/store";
import type { Category } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/inventory")({
  component: Inventory,
});

function Inventory() {
  const { products, updateProduct } = useAtlas();
  const [cat, setCat] = useState<Category | "all">("all");
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<{ stock: number; threshold: number; packaging: string }>({ stock: 0, threshold: 0, packaging: "" });

  const list = cat === "all" ? products : products.filter((p) => p.category === cat);

  const startEdit = (id: string) => {
    const p = products.find((x) => x.id === id)!;
    setEditing(id);
    setDraft({ stock: p.stock, threshold: p.threshold, packaging: p.packaging });
  };
  const save = (id: string) => { updateProduct(id, draft); setEditing(null); toast.success("Product updated"); };

  return (
    <div className="space-y-6 max-w-7xl">
      <header>
        <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-sun-yellow)] mb-1">PIM · Product Information</div>
        <h1 className="text-3xl font-extrabold tracking-tight">Inventory & Catalogue</h1>
        <p className="text-white/50 text-sm mt-1">{products.length} SKUs · Manage stock, packaging, availability</p>
      </header>

      <div className="flex flex-wrap gap-2">
        {(["all", "individuelle", "professionnelle", "equipements"] as const).map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase ${cat === c ? "bg-[var(--color-ice-blue)] text-white" : "bg-white/5 text-white/60 hover:text-white"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="glass-dark rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-white/40">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3 hidden md:table-cell">Packaging</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 hidden md:table-cell">Threshold</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => {
              const low = p.stock <= p.threshold;
              const isEdit = editing === p.id;
              return (
                <tr key={p.id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-lg bg-gradient-to-br ${p.gradient} grid place-items-center text-xl shrink-0`}>{p.emoji}</div>
                      <div>
                        <div className="font-bold">{p.name}</div>
                        <div className="text-[10px] text-white/40 capitalize">{p.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-white/70 text-xs">
                    {isEdit ? (
                      <input value={draft.packaging} onChange={(e) => setDraft({ ...draft, packaging: e.target.value })} className="px-2 py-1 rounded bg-white/10 w-32 text-xs" />
                    ) : p.packaging}
                  </td>
                  <td className="px-4 py-3">
                    {isEdit ? (
                      <input type="number" value={draft.stock} onChange={(e) => setDraft({ ...draft, stock: +e.target.value })} className="px-2 py-1 rounded bg-white/10 w-20 text-xs" />
                    ) : (
                      <span className={`font-extrabold ${low ? "text-rose-400" : "text-white"}`}>{p.stock}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {isEdit ? (
                      <input type="number" value={draft.threshold} onChange={(e) => setDraft({ ...draft, threshold: +e.target.value })} className="px-2 py-1 rounded bg-white/10 w-20 text-xs" />
                    ) : (
                      <span className="text-white/50 font-mono text-xs">{p.threshold}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {isEdit ? (
                      <div className="flex gap-1 justify-end">
                        <button onClick={() => save(p.id)} className="px-3 py-1 rounded bg-[var(--color-sun-yellow)] text-slate-900 text-[10px] font-bold uppercase">Save</button>
                        <button onClick={() => setEditing(null)} className="px-3 py-1 rounded bg-white/10 text-white/70 text-[10px] font-bold uppercase">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => startEdit(p.id)} className="size-8 grid place-items-center rounded-lg bg-white/5 hover:bg-white/10 text-white/70 ml-auto">
                        <Edit3 className="size-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
