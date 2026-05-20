import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MapPin, Snowflake } from "lucide-react";
import { useAtlas } from "@/lib/store";
import { SECTOR_LIST } from "@/lib/i18n";

export const Route = createFileRoute("/admin/clients")({
  component: Clients,
});

function Clients() {
  const { clients, orders, freezers } = useAtlas();
  const [sector, setSector] = useState<string>("all");
  const [q, setQ] = useState("");

  const list = clients.filter((c) => (sector === "all" || c.sector === sector) && (q === "" || c.business.toLowerCase().includes(q.toLowerCase())));

  return (
    <div className="space-y-6 max-w-7xl">
      <header>
        <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-sun-yellow)] mb-1">CRM · Sector Segmentation</div>
        <h1 className="text-3xl font-extrabold tracking-tight">Clients Database</h1>
        <p className="text-white/50 text-sm mt-1">{clients.length} active partners across Northern Morocco</p>
      </header>

      <div className="glass-dark rounded-2xl p-4 flex flex-col md:flex-row gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search business name..."
          className="md:w-72 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-ice-blue)]"
        />
        <div className="flex gap-1 overflow-x-auto scrollbar-hide flex-1">
          <button onClick={() => setSector("all")} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase whitespace-nowrap ${sector === "all" ? "bg-white text-slate-900" : "text-white/60 hover:text-white"}`}>All</button>
          {SECTOR_LIST.map((s) => (
            <button key={s} onClick={() => setSector(s)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase whitespace-nowrap ${sector === s ? "bg-[var(--color-ice-blue)] text-white" : "text-white/60 hover:text-white"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((c) => {
          const orderCount = orders.filter((o) => o.business === c.business).length;
          const freezerCount = freezers.filter((f) => f.clientId === c.id).length;
          return (
            <div key={c.id} className="glass-dark rounded-2xl p-5 group hover:border-[var(--color-ice-blue)]/40 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-sun-yellow)] mb-1">{c.type}</div>
                  <h3 className="font-bold text-lg leading-tight">{c.business}</h3>
                  <p className="text-xs text-white/40 mt-0.5">{c.responsible}</p>
                </div>
                <span className="text-[10px] font-bold text-white/60 bg-white/5 px-2 py-1 rounded">#{c.id.slice(-3)}</span>
              </div>
              <div className="space-y-2 text-xs text-white/70 mb-4">
                <div className="flex items-center gap-2"><Phone className="size-3 text-white/40" /> {c.phone}</div>
                <div className="flex items-center gap-2"><MapPin className="size-3 text-white/40" /> {c.sector}</div>
                <div className="flex items-center gap-2"><Snowflake className="size-3 text-white/40" /> {freezerCount} UGUR deployed</div>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest text-white/40">Orders</span>
                <span className="font-extrabold text-[var(--color-sun-yellow)]">{orderCount}</span>
              </div>
            </div>
          );
        })}
      </div>
      {list.length === 0 && <div className="text-center text-white/40 py-16">No clients match.</div>}
    </div>
  );
}
