export type Category = "individuelle" | "professionnelle" | "equipements";

export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  packaging: string;
  flavor?: string;
  emoji: string;
  gradient: string;
  badge?: string;
  stock: number;
  threshold: number;
};

export const PRODUCTS: Product[] = [
  // Gamme Individuelle
  { id: "p-dgm", name: "Don Grande Moreno", category: "individuelle", description: "Bâtonnet enrobé chocolat & noisettes croquantes", packaging: "Box of 24 units", emoji: "🍫", gradient: "from-amber-700 to-amber-900", badge: "Best Seller", stock: 480, threshold: 100 },
  { id: "p-dgb", name: "Don Grande Blanco", category: "individuelle", description: "Chocolat blanc & framboise sauvage", packaging: "Box of 24 units", emoji: "🍦", gradient: "from-pink-200 to-rose-300", stock: 320, threshold: 100 },
  { id: "p-tn", name: "El Trio Nata", category: "individuelle", description: "Trio crème vanille fraîche", packaging: "Box of 24 units", emoji: "🍨", gradient: "from-yellow-50 to-orange-100", stock: 60, threshold: 80 },
  { id: "p-tr", name: "El Trio Rojo", category: "individuelle", description: "Yaourt grec & coulis fruits rouges", packaging: "Box of 24 units", emoji: "🍓", gradient: "from-rose-400 to-red-500", badge: "Top Seller", stock: 540, threshold: 100 },
  { id: "p-tg", name: "El Trio Galleta", category: "individuelle", description: "Cookies façon Oreo & cream", packaging: "Box of 30 units", emoji: "🍪", gradient: "from-zinc-700 to-zinc-900", stock: 220, threshold: 80 },
  { id: "p-ds", name: "Dos Sabores", category: "individuelle", description: "Duo chocolat-vanille classique", packaging: "Box of 24 units", emoji: "🍫", gradient: "from-stone-300 to-amber-800", stock: 180, threshold: 60 },
  { id: "p-bv", name: "Barquillito Vanille", category: "individuelle", description: "Cornet croustillant vanille bourbon", packaging: "Box of 36 units", emoji: "🍦", gradient: "from-amber-50 to-yellow-200", stock: 420, threshold: 100 },
  { id: "p-bc", name: "Barquillito Chocolat", category: "individuelle", description: "Cornet croustillant cacao intense", packaging: "Box of 36 units", emoji: "🍦", gradient: "from-amber-800 to-stone-900", stock: 380, threshold: 100 },
  { id: "p-bf", name: "Barquillito Fraise", category: "individuelle", description: "Cornet croustillant fraise du Loukkos", packaging: "Box of 36 units", emoji: "🍦", gradient: "from-pink-300 to-rose-500", stock: 75, threshold: 100 },

  // Gamme Professionnelle (14 flavors, 5L tubs)
  { id: "t-fraise", name: "Bac Fraise", category: "professionnelle", description: "Sorbet fraise artisanal", packaging: "Tub of 5 Liters", flavor: "Fraise", emoji: "🍓", gradient: "from-pink-400 to-rose-600", stock: 48, threshold: 20 },
  { id: "t-chocolat", name: "Bac Chocolat", category: "professionnelle", description: "Chocolat noir intense", packaging: "Tub of 5 Liters", flavor: "Chocolat", emoji: "🍫", gradient: "from-amber-800 to-zinc-900", stock: 62, threshold: 20 },
  { id: "t-vanille", name: "Bac Vanille", category: "professionnelle", description: "Vanille de Madagascar", packaging: "Tub of 5 Liters", flavor: "Vanille", emoji: "🍦", gradient: "from-amber-100 to-yellow-300", badge: "Top Seller", stock: 88, threshold: 30 },
  { id: "t-caramel", name: "Bac Caramel", category: "professionnelle", description: "Caramel beurre salé", packaging: "Tub of 5 Liters", flavor: "Caramel", emoji: "🍯", gradient: "from-amber-300 to-orange-600", stock: 42, threshold: 20 },
  { id: "t-pistache", name: "Bac Pistache", category: "professionnelle", description: "Pistache de Sicile", packaging: "Tub of 5 Liters", flavor: "Pistache", emoji: "🌰", gradient: "from-lime-300 to-green-600", stock: 36, threshold: 20 },
  { id: "t-noisette", name: "Bac Noisette (بندق أبيض)", category: "professionnelle", description: "Noisette blanche du Rif", packaging: "Tub of 5 Liters", flavor: "Noisette", emoji: "🌰", gradient: "from-amber-200 to-amber-600", stock: 28, threshold: 20 },
  { id: "t-framboise", name: "Bac Framboise", category: "professionnelle", description: "Framboise sauvage", packaging: "Tub of 5 Liters", flavor: "Framboise", emoji: "🫐", gradient: "from-pink-500 to-purple-700", stock: 14, threshold: 20 },
  { id: "t-mangue", name: "Bac Mangue", category: "professionnelle", description: "Mangue Alphonso", packaging: "Tub of 5 Liters", flavor: "Mangue", emoji: "🥭", gradient: "from-yellow-400 to-orange-500", stock: 32, threshold: 20 },
  { id: "t-ananas", name: "Bac Ananas", category: "professionnelle", description: "Ananas Victoria", packaging: "Tub of 5 Liters", flavor: "Ananas", emoji: "🍍", gradient: "from-yellow-300 to-lime-500", stock: 24, threshold: 20 },
  { id: "t-citron", name: "Bac Citron", category: "professionnelle", description: "Citron de Berkane", packaging: "Tub of 5 Liters", flavor: "Citron", emoji: "🍋", gradient: "from-yellow-200 to-yellow-500", stock: 40, threshold: 20 },
  { id: "t-nougat", name: "Bac Nougat", category: "professionnelle", description: "Nougat aux amandes", packaging: "Tub of 5 Liters", flavor: "Nougat", emoji: "🍯", gradient: "from-amber-200 to-amber-500", stock: 22, threshold: 20 },
  { id: "t-chuingum", name: "Bac Chuingum (Bleu)", category: "professionnelle", description: "Chewing-gum bleu signature", packaging: "Tub of 5 Liters", flavor: "Chuingum", emoji: "🩵", gradient: "from-cyan-300 to-sky-500", stock: 18, threshold: 20 },
  { id: "t-cookies", name: "Bac Cookies & Cream", category: "professionnelle", description: "Biscuits & crème vanille", packaging: "Tub of 5 Liters", flavor: "Cookies", emoji: "🍪", gradient: "from-zinc-200 to-zinc-700", stock: 30, threshold: 20 },
  { id: "t-banane", name: "Bac Banane", category: "professionnelle", description: "Banane caramélisée", packaging: "Tub of 5 Liters", flavor: "Banane", emoji: "🍌", gradient: "from-yellow-200 to-amber-400", stock: 26, threshold: 20 },

  // Équipements
  { id: "e-ugur-400", name: "UGUR UDD 400 BK", category: "equipements", description: "Congélateur vitrine vertical 400L", packaging: "1 unit · 2 ans garantie", emoji: "❄️", gradient: "from-slate-300 to-slate-600", stock: 12, threshold: 3 },
  { id: "e-ugur-600", name: "UGUR UDD 600 SCEB", category: "equipements", description: "Congélateur coffre 600L vitré", packaging: "1 unit · 2 ans garantie", emoji: "🧊", gradient: "from-sky-200 to-sky-500", stock: 8, threshold: 3 },
  { id: "e-granita", name: "Triple Tank Granita Dispenser", category: "equipements", description: "Distributeur jus/granita 3 cuves 12L", packaging: "1 unit · 1 an garantie", emoji: "🥤", gradient: "from-orange-300 to-pink-500", stock: 5, threshold: 2 },
];

export type ClientRecord = {
  id: string;
  business: string;
  responsible: string;
  phone: string;
  sector: string;
  type: "Café" | "Mahlaba" | "Restaurant" | "Hôtel" | "Épicerie";
  freezerIds: string[];
  createdAt: string;
};

export const SEED_CLIENTS: ClientRecord[] = [
  { id: "c-1", business: "Café Fleur", responsible: "Karim Benali", phone: "+212 661 12 34 56", sector: "Tétouan Centre", type: "Café", freezerIds: ["f-001"], createdAt: "2024-04-12" },
  { id: "c-2", business: "Mahlaba Al-Amal", responsible: "Salma Idrissi", phone: "+212 662 22 11 99", sector: "Martil", type: "Mahlaba", freezerIds: ["f-002"], createdAt: "2024-05-03" },
  { id: "c-3", business: "Hôtel Marina Smir", responsible: "Yassine El Amrani", phone: "+212 661 88 44 22", sector: "M'diq", type: "Hôtel", freezerIds: ["f-003", "f-004"], createdAt: "2023-11-21" },
  { id: "c-4", business: "Café Andalous", responsible: "Mehdi Tazi", phone: "+212 663 55 77 88", sector: "Tanger Ville", type: "Café", freezerIds: ["f-005"], createdAt: "2024-01-15" },
  { id: "c-5", business: "Pâtisserie Chefchaouen", responsible: "Najat Khalil", phone: "+212 660 11 22 33", sector: "Chefchaouen", type: "Restaurant", freezerIds: [], createdAt: "2024-06-09" },
  { id: "c-6", business: "Épicerie Fnideq", responsible: "Hamid Saidi", phone: "+212 664 33 22 11", sector: "Fnideq", type: "Épicerie", freezerIds: ["f-006"], createdAt: "2024-02-28" },
  { id: "c-7", business: "Mahlaba Larache", responsible: "Fatima Berrada", phone: "+212 665 66 77 88", sector: "Larache", type: "Mahlaba", freezerIds: [], createdAt: "2024-07-14" },
];

export type Freezer = {
  id: string;
  serial: string;
  model: string;
  status: "in_stock" | "deployed";
  clientId?: string;
  deployedAt?: string;
};

export const SEED_FREEZERS: Freezer[] = [
  { id: "f-001", serial: "UGR-2023-001", model: "UGUR UDD 400 BK", status: "deployed", clientId: "c-1", deployedAt: "2024-04-15" },
  { id: "f-002", serial: "UGR-2023-002", model: "UGUR UDD 400 BK", status: "deployed", clientId: "c-2", deployedAt: "2024-05-05" },
  { id: "f-003", serial: "UGR-2022-008", model: "UGUR UDD 600 SCEB", status: "deployed", clientId: "c-3", deployedAt: "2023-11-25" },
  { id: "f-004", serial: "UGR-2022-009", model: "UGUR UDD 600 SCEB", status: "deployed", clientId: "c-3", deployedAt: "2023-11-25" },
  { id: "f-005", serial: "UGR-2023-014", model: "UGUR UDD 400 BK", status: "deployed", clientId: "c-4", deployedAt: "2024-01-18" },
  { id: "f-006", serial: "UGR-2024-021", model: "UGUR UDD 400 BK", status: "deployed", clientId: "c-6", deployedAt: "2024-03-02" },
  { id: "f-007", serial: "UGR-2024-022", model: "UGUR UDD 400 BK", status: "in_stock" },
  { id: "f-008", serial: "UGR-2024-023", model: "UGUR UDD 600 SCEB", status: "in_stock" },
  { id: "f-009", serial: "UGR-2024-024", model: "UGUR UDD 600 SCEB", status: "in_stock" },
];

export type OrderStatus = "pending" | "approved" | "preparation" | "delivery" | "delivered";

export const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pending Review",
  approved: "Approved",
  preparation: "In Preparation",
  delivery: "Out for Delivery",
  delivered: "Delivered & Paid",
};

export const STATUS_FLOW: OrderStatus[] = ["pending", "approved", "preparation", "delivery", "delivered"];

export type OrderItem = { productId: string; name: string; packaging: string; qty: number };

export type Order = {
  id: string;
  business: string;
  responsible: string;
  phone: string;
  sector: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  totalUnits: number;
};

export const SEED_ORDERS: Order[] = [
  {
    id: "ORD-4291",
    business: "Café Fleur",
    responsible: "Karim Benali",
    phone: "+212 661 12 34 56",
    sector: "Tétouan Centre",
    items: [
      { productId: "t-vanille", name: "Bac Vanille", packaging: "Tub of 5 Liters", qty: 6 },
      { productId: "t-chocolat", name: "Bac Chocolat", packaging: "Tub of 5 Liters", qty: 4 },
    ],
    status: "preparation",
    createdAt: "2026-05-20",
    totalUnits: 10,
  },
  {
    id: "ORD-4290",
    business: "Hôtel Marina Smir",
    responsible: "Yassine El Amrani",
    phone: "+212 661 88 44 22",
    sector: "M'diq",
    items: [
      { productId: "p-dgm", name: "Don Grande Moreno", packaging: "Box of 24 units", qty: 8 },
      { productId: "p-tr", name: "El Trio Rojo", packaging: "Box of 24 units", qty: 6 },
    ],
    status: "delivery",
    createdAt: "2026-05-19",
    totalUnits: 14,
  },
  {
    id: "ORD-4289",
    business: "Mahlaba Al-Amal",
    responsible: "Salma Idrissi",
    phone: "+212 662 22 11 99",
    sector: "Martil",
    items: [
      { productId: "t-fraise", name: "Bac Fraise", packaging: "Tub of 5 Liters", qty: 4 },
      { productId: "t-citron", name: "Bac Citron", packaging: "Tub of 5 Liters", qty: 3 },
      { productId: "t-mangue", name: "Bac Mangue", packaging: "Tub of 5 Liters", qty: 3 },
    ],
    status: "approved",
    createdAt: "2026-05-20",
    totalUnits: 10,
  },
  {
    id: "ORD-4288",
    business: "Café Andalous",
    responsible: "Mehdi Tazi",
    phone: "+212 663 55 77 88",
    sector: "Tanger Ville",
    items: [{ productId: "e-ugur-400", name: "UGUR UDD 400 BK", packaging: "1 unit", qty: 1 }],
    status: "pending",
    createdAt: "2026-05-20",
    totalUnits: 1,
  },
  {
    id: "ORD-4287",
    business: "Pâtisserie Chefchaouen",
    responsible: "Najat Khalil",
    phone: "+212 660 11 22 33",
    sector: "Chefchaouen",
    items: [{ productId: "p-bv", name: "Barquillito Vanille", packaging: "Box of 36 units", qty: 5 }],
    status: "delivered",
    createdAt: "2026-05-18",
    totalUnits: 5,
  },
  {
    id: "ORD-4286",
    business: "Épicerie Fnideq",
    responsible: "Hamid Saidi",
    phone: "+212 664 33 22 11",
    sector: "Fnideq",
    items: [
      { productId: "p-bc", name: "Barquillito Chocolat", packaging: "Box of 36 units", qty: 4 },
      { productId: "p-tg", name: "El Trio Galleta", packaging: "Box of 30 units", qty: 6 },
    ],
    status: "delivered",
    createdAt: "2026-05-17",
    totalUnits: 10,
  },
];
