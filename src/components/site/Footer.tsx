import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/40 bg-white/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 bg-[var(--color-ice-blue)] rounded-xl flex items-center justify-center text-white font-extrabold shadow-lg">A</div>
            <div>
              <div className="text-[var(--color-ice-blue)] font-extrabold tracking-tight uppercase">Atlas Del Helados</div>
              <div className="text-[10px] text-slate-500 font-mono tracking-widest">المثلجات أطلس · SINCE 1955</div>
            </div>
          </div>
          <p className="text-sm text-slate-600 max-w-md leading-relaxed">
            L'art de la glace au service des professionnels du Nord du Maroc depuis plus de 60 ans. Créateur de bonheur — طعم ما كيتنساش.
          </p>
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ice-blue)] mb-4">Contact</div>
          <div className="text-sm text-slate-600 space-y-2">
            <p>Route de Sebta, Km 2<br />Tétouan, Maroc</p>
            <p>+212 539 96 00 00</p>
            <p>contact@atlasdelhelados.ma</p>
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ice-blue)] mb-4">Navigation</div>
          <div className="text-sm text-slate-600 space-y-2">
            <Link to="/catalogue" className="block hover:text-[var(--color-ice-blue)]">Catalogue</Link>
            <Link to="/checkout" className="block hover:text-[var(--color-ice-blue)]">Devenir partenaire</Link>
            <Link to="/admin" className="block hover:text-[var(--color-ice-blue)]">Espace Admin</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/40 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-slate-500">
          <span>© 1955 – 2026 Atlas Del Helados S.A.R.L.</span>
          <span>Qualité Certifiée · Chaîne du froid -25°C</span>
        </div>
      </div>
    </footer>
  );
}
