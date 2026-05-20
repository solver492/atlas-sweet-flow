import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  PRODUCTS,
  SEED_CLIENTS,
  SEED_FREEZERS,
  SEED_ORDERS,
  type ClientRecord,
  type Freezer,
  type Order,
  type OrderItem,
  type OrderStatus,
  type Product,
} from "./data";

type CartItem = { productId: string; qty: number };

type AtlasState = {
  products: Product[];
  clients: ClientRecord[];
  freezers: Freezer[];
  orders: Order[];
  cart: CartItem[];
  cartOpen: boolean;
  // cart actions
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  setCartOpen: (v: boolean) => void;
  // orders
  createOrder: (data: { business: string; responsible: string; phone: string; sector: string }) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  // products
  updateProduct: (id: string, patch: Partial<Product>) => void;
  // freezers
  updateFreezer: (id: string, patch: Partial<Freezer>) => void;
  addFreezer: (f: Omit<Freezer, "id">) => void;
};

export const useAtlas = create<AtlasState>()(
  persist(
    (set, get) => ({
      products: PRODUCTS,
      clients: SEED_CLIENTS,
      freezers: SEED_FREEZERS,
      orders: SEED_ORDERS,
      cart: [],
      cartOpen: false,

      addToCart: (id, qty = 1) =>
        set((s) => {
          const existing = s.cart.find((c) => c.productId === id);
          if (existing) {
            return { cart: s.cart.map((c) => (c.productId === id ? { ...c, qty: c.qty + qty } : c)) };
          }
          return { cart: [...s.cart, { productId: id, qty }] };
        }),
      removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((c) => c.productId !== id) })),
      updateQty: (id, qty) =>
        set((s) => ({
          cart: qty <= 0 ? s.cart.filter((c) => c.productId !== id) : s.cart.map((c) => (c.productId === id ? { ...c, qty } : c)),
        })),
      clearCart: () => set({ cart: [] }),
      setCartOpen: (v) => set({ cartOpen: v }),

      createOrder: (data) => {
        const { cart, products, orders } = get();
        const items: OrderItem[] = cart.map((c) => {
          const p = products.find((x) => x.id === c.productId)!;
          return { productId: p.id, name: p.name, packaging: p.packaging, qty: c.qty };
        });
        const totalUnits = items.reduce((s, i) => s + i.qty, 0);
        const order: Order = {
          id: `ORD-${4300 + orders.length}`,
          business: data.business,
          responsible: data.responsible,
          phone: data.phone,
          sector: data.sector,
          items,
          status: "pending",
          createdAt: new Date().toISOString().slice(0, 10),
          totalUnits,
        };
        set({ orders: [order, ...orders], cart: [] });
        return order;
      },

      updateOrderStatus: (id, status) =>
        set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)) })),

      updateProduct: (id, patch) =>
        set((s) => ({ products: s.products.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),

      updateFreezer: (id, patch) =>
        set((s) => ({ freezers: s.freezers.map((f) => (f.id === id ? { ...f, ...patch } : f)) })),

      addFreezer: (f) =>
        set((s) => ({ freezers: [...s.freezers, { ...f, id: `f-${String(s.freezers.length + 1).padStart(3, "0")}` }] })),
    }),
    {
      name: "atlas-helados-store",
      partialize: (s) => ({
        products: s.products,
        clients: s.clients,
        freezers: s.freezers,
        orders: s.orders,
        cart: s.cart,
      }),
    },
  ),
);

export const cartCount = (cart: CartItem[]) => cart.reduce((s, c) => s + c.qty, 0);
