import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen atlas-bg">
      <Nav />
      <CartDrawer />
      <div className="pt-24">{children}</div>
      <Footer />
    </div>
  );
}
