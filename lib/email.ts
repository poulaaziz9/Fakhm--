import "server-only";
import { formatPrice } from "./config";
import type { PlacedOrder } from "./orders";

const RESEND_API = "https://api.resend.com/emails";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function orderHtml(order: PlacedOrder) {
  const rows = order.items
    .map(
      (i) => `<tr>
        <td style="padding:8px;border-bottom:1px solid #e5dcc8">${escape(i.nameAr)} (${escape(i.nameEn)})</td>
        <td style="padding:8px;border-bottom:1px solid #e5dcc8">${i.sizeMl} مل</td>
        <td style="padding:8px;border-bottom:1px solid #e5dcc8">× ${i.qty}</td>
        <td style="padding:8px;border-bottom:1px solid #e5dcc8">${formatPrice(i.price * i.qty)}</td>
      </tr>`,
    )
    .join("");

  return `<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;background:#f1eadb;padding:24px;color:#0a1f1a">
  <div style="max-width:560px;margin:auto;background:#fbf7ee;border:1px solid #c8ab74">
    <div style="background:#0a1f1a;color:#c8ab74;padding:20px;text-align:center;font-size:22px;letter-spacing:6px">FAKHM | فَخْم</div>
    <div style="padding:24px">
      <h2 style="margin:0 0 4px">أوردر جديد ${escape(order.orderNumber)}</h2>
      <p style="margin:0 0 20px;color:#4a4636">الدفع: عند الاستلام</p>
      <h3 style="margin:0 0 8px;color:#6f5522">بيانات العميل</h3>
      <p style="margin:0;line-height:1.9">
        ${escape(order.customer.name)}<br>
        📞 <a href="tel:${escape(order.customer.phone)}">${escape(order.customer.phone)}</a><br>
        ${order.customer.email ? `✉️ ${escape(order.customer.email)}<br>` : ""}
        📍 ${escape(order.customer.governorate)} — ${escape(order.customer.city)}<br>
        ${escape(order.customer.address)}
        ${order.customer.notes ? `<br>📝 ${escape(order.customer.notes)}` : ""}
      </p>
      <h3 style="margin:24px 0 8px;color:#6f5522">المنتجات</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
      <p style="margin:16px 0 0;line-height:1.9">
        المنتجات: ${formatPrice(order.subtotal)}<br>
        الشحن: ${formatPrice(order.shipping)}<br>
        <strong>الإجمالي: ${formatPrice(order.total)}</strong>
      </p>
    </div>
  </div>
</div>`;
}

export async function sendOrderNotification(order: PlacedOrder) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  if (!apiKey || !to) {
    console.warn("[orders] RESEND_API_KEY / ORDER_NOTIFY_EMAIL not set; skipping email for", order.orderNumber);
    return;
  }

  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ORDER_FROM_EMAIL ?? "FAKHM Orders <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: order.customer.email || undefined,
      subject: `🛍️ أوردر جديد ${order.orderNumber} — ${formatPrice(order.total)}`,
      html: orderHtml(order),
    }),
  });
  if (!res.ok) {
    console.error("[orders] Resend failed", res.status, await res.text());
  }
}
