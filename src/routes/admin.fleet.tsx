import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Snowflake, MapPin, Plus } from "lucide-react";
import { useAtlas } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/fleet")({
  component: Fleet,
});

function Fleet() {
  const { freezers, clients, updateFreezer, addFreezer } = useAtlas();
  const [filter, setFilter] = useState<"all" | "in_stock" | "deployed">("all");
  const [showAdd, setShowAdd] = useState(false);
  const [newF, setNewF] = useState({ serial: "", model: "UGUR UDD 400 BK" });

  const list = filter === "all" ? freezers : freezers.filter((f) => f.status === filter);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newF.serial.trim()) return;
    addFreezer({ serial: newF.serial, model: newF.model, status: "in_stock" });
    toast.success("Freezer added to fleet");
    setNewF({ serial: "", model: "UGUR UDD 400 BK" });
    setShowAdd(false);
  };

  const deploy = (id: string, clientId: string) => {
    updateFreezer(id, { status: "deployed", clientId, deployedAt: new Date().toISOString().slice(0, 10) });
    toast.success("Deployed to client");
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-sun-yellow)] mb-1">Hardware Fleet Registry</div>
          <h1 className="text-3xl font-extrabold tracking-tight">UGUR Freezers</h1>
          <p className="text-white/50 text-sm mt-1">{freezers.filter((f) => f.status === "deployed").length} deployed · {freezers.filter((f) => f.status === "in_stock").length} in stock</p>
        </div>
        <button onClick={() => setShowAdd((s) => !s)} className="bg-[var(--color-sun-yellow)] text-slate-900 px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[var(--color-sun-yellow)]/20">
          <Plus className="size-4" /> Register Freezer
        </button>
      </header>

      {showAdd && (
        <form onSubmit={submit} className="glass-dark rounded-2xl p-5 flex flex-col md:flex-row gap-3">
          <input value={newF.serial} onChange={(e) => setNewF({ ...newF, serial: e.target.value })} placeholder="Serial No. (e.g. UGR-2026-001)" className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-ice-blue)]" />
          <select value={newF.model} onChange={(e) => setNewF({ ...newF, model: e.target.value })} className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white">
            <option>UGUR UDD 400 BK</option>
            <option>UGUR UDD 600 SCEB</option>
          </select>
          <button type="submit" className="px-5 py-2.5 rounded-xl bg-[var(--color-ice-blue)] text-white text-xs font-bold uppercase">Add</button>
        </form>
      )}

      <div className="flex gap-2">
        {(["all", "in_stock", "deployed"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase ${filter === f ? "bg-[var(--color-ice-blue)] text-white" : "bg-white/5 text-white/60 hover:text-white"}`}>
            {f.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((f) => {
          const client = f.clientId ? clients.find((c) => c.id === f.clientId) : null;
          const deployed = f.status === "deployed";
          return (
            <div key={f.id} className="glass-dark rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`size-10 rounded-xl grid place-items-center ${deployed ? "bg-emerald-500/15 text-emerald-300" : "bg-[var(--color-sun-yellow)]/15 text-[var(--color-sun-yellow)]"}`}>
                  <Snowflake className="size-5" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${deployed ? "bg-emerald-500/15 text-emerald-300" : "bg-[var(--color-sun-yellow)]/15 text-[var(--color-sun-yellow)]"}`}>
                  {deployed ? "Deployed" : "In Stock"}
                </span>
              </div>
              <div className="text-[10px] font-mono text-white/40 mb-1">{f.serial}</div>
              <h3 className="font-bold mb-3">{f.model}</h3>
              {client && (
                <div className="text-xs text-white/70 space-y-1 pt-3 border-t border-white/10">
                  <div className="font-bold text-white">{client.business}</div>
                  <div className="flex items-center gap-2 text-white/50"><MapPin className="size-3" /> {client.sector}</div>
                  <div className="text-[10px] text-white/40">Since {f.deployedAt}</div>
                </div>
              )}
              {!deployed && (
                <div className="pt-3 border-t border-white/10">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1 block">Assign to client</label>
                  <select onChange={(e) => e.target.value && deploy(f.id, e.target.value)} className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white">
                    <option value="">— Select client —</option>
                    {clients.map((c) => <option key={c.id} value={c.id}>{c.business} · {c.sector}</option>)}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
