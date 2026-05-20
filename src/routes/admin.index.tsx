import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Package2, AlertTriangle, Truck, TrendingUp, Snowflake, ArrowRight } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { useAtlas } from "@/lib/store";
import { STATUS_LABEL } from "@/lib/data";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const { orders, products, freezers } = useAtlas();

  const pending = orders.filter((o) => o.status !== "delivered").length;
  const todayUnits = orders.filter((o) => o.createdAt === new Date().toISOString().slice(0, 10)).reduce((s, o) => s + o.totalUnits, 0);
  const monthUnits = orders.reduce((s, o) => s + o.totalUnits, 0);
  const deployed = freezers.filter((f) => f.status === "deployed").length;
  const lowStock = products.filter((p) => p.stock <= p.threshold);

  const trend = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((d, i) => ({ day: d, sales: 80 + Math.round(Math.sin(i) * 30 + i * 18 + Math.random() * 20) }));
  }, []);

  const flavorChart = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach((o) => o.items.forEach((it) => { counts[it.name] = (counts[it.name] || 0) + it.qty; }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, qty]) => ({ name: name.replace(/^Bac /, "").slice(0, 14), qty }));
  }, [orders]);

  return (
    <div className="space-y-8 max-w-7xl">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-sun-yellow)] mb-1">Executive Overview</div>
          <h1 className="text-3xl font-extrabold tracking-tight">Tableau de Bord</h1>
          <p className="text-white/50 text-sm mt-1">Real-time pipeline · Northern Morocco · {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">System Live</span>
        </div>
      </header>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi icon={TrendingUp} label="Units Today" value={todayUnits} sub="Units shipped" accent="ice" />
        <Kpi icon={Package2} label="Monthly Volume" value={monthUnits} sub="Cumulative units" accent="ice" />
        <Kpi icon={Truck} label="Pending Orders" value={pending} sub={`of ${orders.length} total`} accent="sun" />
        <Kpi icon={Snowflake} label="Active Freezers" value={deployed} sub={`of ${freezers.length} fleet`} accent="ice" />
      </div>

      {/* Low stock alerts */}
      {lowStock.length > 0 && (
        <div className="glass-dark rounded-2xl p-5 border border-rose-500/30">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="size-4 text-rose-400" />
            <h3 className="font-bold text-sm">Low Stock Alerts</h3>
            <span className="text-[10px] font-mono text-white/40">({lowStock.length})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStock.map((p) => (
              <span key={p.id} className="text-xs px-3 py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-200">
                {p.name} · <span className="font-mono">{p.stock}/{p.threshold}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass-dark rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">Weekly</div>
              <h3 className="font-bold">Sales Trend</h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-400">+18.4%</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E5AA8" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#1E5AA8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="sales" stroke="#F5C518" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-dark rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">Top Movers</div>
              <h3 className="font-bold">Popular Flavors</h3>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={flavorChart} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.6)" fontSize={11} width={90} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
                <Bar dataKey="qty" radius={[0, 6, 6, 0]}>
                  {flavorChart.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? "#F5C518" : "#1E5AA8"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="glass-dark rounded-2xl p-5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">Live Pipeline</div>
            <h3 className="font-bold">Recent Orders</h3>
          </div>
          <Link to="/admin/orders" className="text-xs font-bold text-[var(--color-sun-yellow)] flex items-center gap-1">
            View Kanban <ArrowRight className="size-3" />
          </Link>
        </div>
        <div className="space-y-2">
          {orders.slice(0, 5).map((o) => (
            <div key={o.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="text-[10px] font-mono text-white/40 w-20">{o.id}</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate">{o.business}</div>
                <div className="text-[10px] text-white/40">{o.sector} · {o.totalUnits} units</div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${badgeStyle(o.status)}`}>
                {STATUS_LABEL[o.status]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, sub, accent }: { icon: any; label: string; value: number; sub: string; accent: "ice" | "sun" }) {
  return (
    <div className="glass-dark rounded-2xl p-5 relative overflow-hidden">
      <div className="flex items-start justify-between mb-3">
        <div className={`size-9 rounded-xl grid place-items-center ${accent === "sun" ? "bg-[var(--color-sun-yellow)]/15 text-[var(--color-sun-yellow)]" : "bg-[var(--color-ice-blue)]/20 text-sky-300"}`}>
          <Icon className="size-4" />
        </div>
      </div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">{label}</div>
      <div className={`text-3xl font-extrabold ${accent === "sun" ? "text-[var(--color-sun-yellow)]" : "text-white"}`}>{value}</div>
      <div className="text-[10px] text-white/40 mt-1">{sub}</div>
    </div>
  );
}

function badgeStyle(s: string) {
  switch (s) {
    case "pending": return "bg-amber-500/15 text-amber-300";
    case "approved": return "bg-sky-500/15 text-sky-300";
    case "preparation": return "bg-[var(--color-sun-yellow)]/15 text-[var(--color-sun-yellow)]";
    case "delivery": return "bg-indigo-500/15 text-indigo-300";
    case "delivered": return "bg-emerald-500/15 text-emerald-300";
    default: return "bg-white/10 text-white/60";
  }
}
