import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, ChevronRight, Filter } from "lucide-react";
import { useAtlas } from "@/lib/store";
import { STATUS_FLOW, STATUS_LABEL, type OrderStatus } from "@/lib/data";
import { SECTOR_LIST } from "@/lib/i18n";
import { generateDeliveryNote } from "@/lib/pdf";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/orders")({
  component: Orders,
});

const COLUMN_COLOR: Record<OrderStatus, string> = {
  pending: "bg-amber-400",
  approved: "bg-sky-400",
  preparation: "bg-[var(--color-sun-yellow)]",
  delivery: "bg-indigo-400",
  delivered: "bg-emerald-400",
};

function Orders() {
  const { orders, updateOrderStatus } = useAtlas();
  const [sector, setSector] = useState<string>("all");

  const filtered = sector === "all" ? orders : orders.filter((o) => o.sector === sector);

  return (
    <div className="space-y-6 max-w-full">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-sun-yellow)] mb-1">Wholesale Pipeline</div>
          <h1 className="text-3xl font-extrabold tracking-tight">Order Management</h1>
          <p className="text-white/50 text-sm mt-1">Drag through stages · Generate BL for drivers</p>
        </div>
        <div className="glass-dark rounded-xl p-1 flex gap-1 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setSector("all")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${sector === "all" ? "bg-white text-slate-900" : "text-white/60"}`}
          >
            <Filter className="size-3 inline mr-1" /> All Sectors
          </button>
          {SECTOR_LIST.map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${sector === s ? "bg-[var(--color-ice-blue)] text-white" : "text-white/60 hover:text-white"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </header>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
        {STATUS_FLOW.map((status) => {
          const col = filtered.filter((o) => o.status === status);
          return (
            <div key={status} className="w-80 shrink-0">
              <div className="flex items-center gap-2 mb-3 px-2">
                <span className={`size-2 rounded-full ${COLUMN_COLOR[status]}`} />
                <h3 className="text-xs font-bold uppercase tracking-widest">{STATUS_LABEL[status]}</h3>
                <span className="text-[10px] font-mono text-white/40">({col.length})</span>
              </div>
              <div className="space-y-3 min-h-[200px]">
                {col.map((o) => {
                  const nextStatus = STATUS_FLOW[STATUS_FLOW.indexOf(status) + 1];
                  return (
                    <div key={o.id} className="glass-dark rounded-xl p-4 group hover:border-[var(--color-ice-blue)]/40 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold">{o.business}</span>
                        <span className="text-[9px] font-mono text-white/40">{o.id}</span>
                      </div>
                      <div className="text-[10px] text-white/50 mb-2">
                        <span className="text-[var(--color-sun-yellow)] font-bold">{o.sector}</span> · {o.totalUnits} units
                      </div>
                      <div className="text-[10px] text-white/40 mb-3 italic line-clamp-2">
                        {o.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => { generateDeliveryNote(o); toast.success(`BL-${o.id}.pdf generated`); }}
                          className="flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg bg-white/5 hover:bg-white/10 text-white/80 flex items-center justify-center gap-1"
                        >
                          <FileText className="size-3" /> BL PDF
                        </button>
                        {nextStatus && (
                          <button
                            onClick={() => { updateOrderStatus(o.id, nextStatus); toast(`→ ${STATUS_LABEL[nextStatus]}`); }}
                            className="flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg bg-[var(--color-ice-blue)] hover:bg-[var(--color-ice-deep)] text-white flex items-center justify-center gap-1"
                          >
                            Next <ChevronRight className="size-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                {col.length === 0 && <div className="text-[10px] text-white/30 text-center py-8 border border-dashed border-white/10 rounded-xl">Empty</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
