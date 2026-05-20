import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "ar" | "en" | "es";

type Dict = Record<string, Record<Lang, string>>;

export const dict: Dict = {
  "nav.showroom": { fr: "Showroom", ar: "المعرض", en: "Showroom", es: "Showroom" },
  "nav.heritage": { fr: "Héritage", ar: "تراث", en: "Heritage", es: "Herencia" },
  "nav.distribution": { fr: "Distribution", ar: "التوزيع", en: "Distribution", es: "Distribución" },
  "nav.portal": { fr: "Portail B2B", ar: "بوابة B2B", en: "B2B Portal", es: "Portal B2B" },
  "nav.admin": { fr: "Admin", ar: "الإدارة", en: "Admin", es: "Admin" },

  "hero.badge": { fr: "Depuis 1955 · Tétouan", ar: "منذ 1955 · تطوان", en: "Since 1955 · Tetouan", es: "Desde 1955 · Tetuán" },
  "hero.title.1": { fr: "Créateur de", ar: "صانع", en: "Creator of", es: "Creador de" },
  "hero.title.2": { fr: "bonheur.", ar: "السعادة.", en: "happiness.", es: "felicidad." },
  "hero.subtitle": {
    fr: "Le partenaire premium de la chaîne du froid pour la restauration et le commerce du Nord du Maroc.",
    ar: "الشريك الأول لسلسلة التبريد لقطاع المطاعم والتجارة في شمال المغرب.",
    en: "The Mediterranean's premier frozen logistics partner. 60+ years of cold-chain excellence across Northern Morocco.",
    es: "El socio principal de logística congelada del Mediterráneo. Más de 60 años de excelencia en cadena de frío.",
  },
  "hero.cta.catalogue": { fr: "Voir le catalogue", ar: "عرض الكتالوج", en: "View Catalogue", es: "Ver catálogo" },
  "hero.cta.partner": { fr: "Devenir partenaire", ar: "كن شريكاً", en: "Become a Partner", es: "Hazte socio" },
  "hero.stat.years": { fr: "Années d'héritage", ar: "سنة من التراث", en: "Years Heritage", es: "Años de herencia" },
  "hero.stat.cold": { fr: "Précision du froid", ar: "دقة التبريد", en: "Cold Precision", es: "Precisión del frío" },

  "trust.experience": { fr: "60+ ans d'expérience", ar: "+60 سنة من الخبرة", en: "60+ Years Experience", es: "+60 años de experiencia" },
  "trust.cold": { fr: "Chaîne du froid stricte", ar: "سلسلة تبريد صارمة", en: "Strict Cold Chain", es: "Cadena de frío estricta" },
  "trust.delivery": { fr: "Livraison rapide Nord Maroc", ar: "توصيل سريع شمال المغرب", en: "Fast Northern Morocco Delivery", es: "Entrega rápida Norte de Marruecos" },

  "cat.title": { fr: "Catalogue B2B Exclusif", ar: "كتالوج B2B الحصري", en: "Exclusive B2B Range", es: "Gama B2B Exclusiva" },
  "cat.subtitle": { fr: "Découvrez notre sélection premium pour les professionnels.", ar: "اكتشف اختيارنا الفاخر للمحترفين.", en: "Discover our premium selection for professionals.", es: "Descubre nuestra selección premium para profesionales." },
  "cat.individuelle": { fr: "Gamme Individuelle", ar: "الفئة الفردية", en: "Individual Range", es: "Gama Individual" },
  "cat.professionnelle": { fr: "Gamme Professionnelle", ar: "الفئة المهنية", en: "Professional Range", es: "Gama Profesional" },
  "cat.equipements": { fr: "Équipements", ar: "المعدات", en: "Equipment", es: "Equipos" },
  "cat.all": { fr: "Tous les produits", ar: "كل المنتجات", en: "All Products", es: "Todos los productos" },
  "cat.add": { fr: "Ajouter", ar: "أضف", en: "Add", es: "Añadir" },
  "cat.added": { fr: "Ajouté au panier", ar: "تمت الإضافة", en: "Added to cart", es: "Añadido al carrito" },

  "cart.title": { fr: "Votre commande", ar: "طلبك", en: "Your Order", es: "Tu pedido" },
  "cart.empty": { fr: "Panier vide. Ajoutez des produits depuis le catalogue.", ar: "السلة فارغة.", en: "Cart is empty.", es: "Carrito vacío." },
  "cart.checkout": { fr: "Passer commande", ar: "إتمام الطلب", en: "Checkout", es: "Finalizar pedido" },
  "cart.units": { fr: "unités", ar: "وحدة", en: "units", es: "unidades" },

  "checkout.title": { fr: "Finaliser votre commande B2B", ar: "إنهاء طلب الجملة", en: "Complete your B2B Order", es: "Completar pedido B2B" },
  "checkout.business": { fr: "Nom de l'établissement", ar: "اسم المؤسسة", en: "Business Name", es: "Nombre del negocio" },
  "checkout.responsible": { fr: "Personne responsable", ar: "الشخص المسؤول", en: "Responsible Person", es: "Persona responsable" },
  "checkout.phone": { fr: "Téléphone", ar: "الهاتف", en: "Phone Number", es: "Teléfono" },
  "checkout.sector": { fr: "Secteur de livraison", ar: "منطقة التوصيل", en: "Delivery Sector", es: "Sector de entrega" },
  "checkout.submit": { fr: "Confirmer la commande", ar: "تأكيد الطلب", en: "Confirm Order", es: "Confirmar pedido" },
  "checkout.success.title": { fr: "Commande reçue !", ar: "تم استلام الطلب!", en: "Order received!", es: "¡Pedido recibido!" },
  "checkout.success.msg": { fr: "Votre commande a été enregistrée. Notre commercial vous contactera sous 2 heures pour confirmer la livraison.", ar: "تم تسجيل طلبك. سيتصل بك مندوبنا خلال ساعتين.", en: "Your order has been received. Our sales representative will contact you within 2 hours to confirm delivery.", es: "Su pedido ha sido recibido. Nuestro comercial le contactará en 2 horas." },
};

const SECTORS = ["Tétouan Centre", "Tanger Ville", "Martil", "M'diq", "Fnideq", "Larache", "Chefchaouen"];
export const SECTOR_LIST = SECTORS;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string) => string;
  dir: "ltr" | "rtl";
};

const LangCtx = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("atlas-lang")) as Lang | null;
    if (saved && ["fr", "ar", "en", "es"].includes(saved)) setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("atlas-lang", l);
  };

  const t = (k: string) => dict[k]?.[lang] ?? k;
  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  return <LangCtx.Provider value={{ lang, setLang, t, dir }}>{children}</LangCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useI18n outside provider");
  return ctx;
}
