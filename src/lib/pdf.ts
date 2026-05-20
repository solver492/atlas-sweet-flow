import jsPDF from "jspdf";
import type { Order } from "./data";

export function generateDeliveryNote(order: Order) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;

  // Header banner
  doc.setFillColor(30, 90, 168);
  doc.rect(0, 0, W, 32, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("ATLAS DEL HELADOS", 15, 14);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Maître Glacier depuis 1955 · Tétouan, Maroc", 15, 20);
  doc.text("Route de Sebta, Km 2 · +212 539 96 00 00", 15, 26);

  // Yellow accent
  doc.setFillColor(245, 197, 24);
  doc.rect(0, 32, W, 2, "F");

  // Title
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("BON DE LIVRAISON", 15, 50);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`N° ${order.id}`, 15, 56);
  doc.text(`Date: ${order.createdAt}`, 15, 61);

  // Client box
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(110, 42, 85, 28, 2, 2, "FD");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("CLIENT", 114, 47);
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text(order.business, 114, 53);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Responsable: ${order.responsible}`, 114, 58);
  doc.text(`Tél: ${order.phone}`, 114, 63);
  doc.text(`Secteur: ${order.sector}`, 114, 68);

  // Items table
  let y = 80;
  doc.setFillColor(30, 90, 168);
  doc.rect(15, y, 180, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("PRODUIT", 18, y + 5.5);
  doc.text("CONDITIONNEMENT", 95, y + 5.5);
  doc.text("QTÉ", 180, y + 5.5, { align: "right" });
  y += 8;

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "normal");
  order.items.forEach((it, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(15, y, 180, 9, "F");
    }
    doc.text(it.name, 18, y + 6);
    doc.text(it.packaging, 95, y + 6);
    doc.text(String(it.qty), 180, y + 6, { align: "right" });
    y += 9;
  });

  // Total
  y += 4;
  doc.setDrawColor(30, 90, 168);
  doc.setLineWidth(0.5);
  doc.line(15, y, 195, y);
  y += 7;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(`TOTAL UNITÉS: ${order.totalUnits}`, 195, y, { align: "right" });

  // Footer
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Signature Chauffeur:", 15, 270);
  doc.line(45, 270, 95, 270);
  doc.text("Signature Client (Cachet):", 110, 270);
  doc.line(150, 270, 195, 270);

  doc.setFontSize(7);
  doc.text("Atlas Del Helados S.A.R.L · Chaîne du froid garantie -25°C · Créateur de bonheur", 105, 285, { align: "center" });

  doc.save(`BL-${order.id}.pdf`);
}
