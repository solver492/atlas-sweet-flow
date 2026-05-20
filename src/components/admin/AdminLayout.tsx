import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Kanban, Users, Package, Snowflake, ArrowLeft } from "lucide-react";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/orders", label: "Orders", icon: Kanban },
  { to: "/admin/clients", label: "Clients CRM", icon: Users },
  { to: "/admin/inventory", label: "Inventory PIM", icon: Package },
  { to: "/admin/fleet", label: "UGUR Fleet", icon: Snowflake },
];

export function AdminLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Ambient glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 size-[60%] bg-[var(--color-ice-blue)]/20 blur-[140px] rounded-full" />
        <div className="absolute top-1/2 -left-1/4 size-[40%] bg-[var(--color-sun-yellow)]/10 blur-[140px] rounded-full" />
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 shrink-0 glass-dark border-r border-white/5 flex-col p-5">
          <Link to="/" className="flex items-center gap-3 mb-10 px-2 group">
            <div className="size-9 bg-[var(--color-ice-blue)] rounded-xl grid place-items-center font-extrabold shadow-lg shadow-[var(--color-ice-blue)]/30">A</div>
            <div>
              <div className="text-white font-extrabold tracking-tight text-sm leading-none">Atlas Admin</div>
              <div className="text-[9px] text-white/40 font-mono tracking-widest mt-0.5">ERP · 1955</div>
            </div>
          </Link>

          <nav className="flex flex-col gap-1">
            {NAV.map((n) => {
              const active = n.exact ? path === n.to : path.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-[var(--color-ice-blue)]/30 text-white border border-[var(--color-ice-blue)]/40 shadow-lg shadow-[var(--color-ice-blue)]/20"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <n.icon className="size-4 shrink-0" />
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/10">
            <Link to="/" className="flex items-center gap-2 text-xs text-white/50 hover:text-[var(--color-sun-yellow)] transition-colors">
              <ArrowLeft className="size-3" />
              Back to Storefront
            </Link>
          </div>
        </aside>

        {/* Mobile top tabs */}
        <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 glass-dark rounded-2xl px-2 py-2 flex gap-1 overflow-x-auto max-w-[95vw] scrollbar-hide">
          {NAV.map((n) => {
            const active = n.exact ? path === n.to : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`shrink-0 size-10 grid place-items-center rounded-xl ${active ? "bg-[var(--color-ice-blue)] text-white" : "text-white/50"}`}
              >
                <n.icon className="size-4" />
              </Link>
            );
          })}
        </div>

        {/* Main */}
        <main className="flex-1 p-5 md:p-10 max-w-full overflow-x-hidden pb-24 md:pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
