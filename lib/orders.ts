import "server-only";
import { governorates, shippingFeeFor } from "./config";
import { getProducts } from "./products";
import { adminClient, isSupabaseConfigured } from "./supabase";

export type OrderInput = {
  customer: {
    name: string;
    phone: string;
    email: string;
    governorate: string;
    city: string;
    address: string;
    notes: string;
  };
  items: { productId: string; sizeMl: number; qty: number }[];
};

export type PlacedOrder = Omit<OrderInput, "items"> & {
  orderNumber: string;
  items: (OrderInput["items"][number] & { nameAr: string; nameEn: string; price: number })[];
  subtotal: number;
  shipping: number;
  total: number;
};

export class OrderError extends Error {}

const EG_PHONE = /^(\+?20|0)?1[0125]\d{8}$/;

function normalizeDigits(s: string) {
  // Accept Arabic-Indic digits typed on Arabic keyboards.
  return s.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d))).replace(/[\s-]/g, "");
}

function newOrderNumber() {
  const rand = Math.floor(Math.random() * 1296).toString(36).padStart(2, "0");
  return `FK-${Date.now().toString(36).slice(-5)}${rand}`.toUpperCase();
}

export async function placeOrder(input: OrderInput): Promise<PlacedOrder> {
  const c = input.customer;
  const phone = normalizeDigits(c.phone);
  if (c.name.trim().length < 3) throw new OrderError("اكتب الاسم بالكامل");
  if (!EG_PHONE.test(phone)) throw new OrderError("رقم الموبايل مش صحيح");
  if (!governorates.includes(c.governorate)) throw new OrderError("اختار المحافظة");
  if (c.address.trim().length < 8) throw new OrderError("اكتب العنوان بالتفصيل");
  if (input.items.length === 0) throw new OrderError("السلة فاضية");

  // Prices always come from the catalogue, never from the browser.
  const products = await getProducts();
  const items = input.items.map((line) => {
    const product = products.find((p) => p.id === line.productId);
    const variant = product?.variants.find((v) => v.sizeMl === line.sizeMl);
    if (!product || !variant || !product.inStock) {
      throw new OrderError("فيه منتج في السلة مبقاش متاح، احذفه وكمّل");
    }
    const qty = Math.max(1, Math.min(10, Math.floor(line.qty)));
    return { ...line, qty, nameAr: product.nameAr, nameEn: product.nameEn, price: variant.price };
  });

  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
  const shipping = shippingFeeFor(c.governorate, subtotal);
  const order: PlacedOrder = {
    orderNumber: newOrderNumber(),
    customer: {
      name: c.name.trim(),
      phone,
      email: c.email.trim(),
      governorate: c.governorate,
      city: c.city.trim(),
      address: c.address.trim(),
      notes: c.notes.trim(),
    },
    items,
    subtotal,
    shipping,
    total: subtotal + shipping,
  };

  const db = adminClient();
  if (db) {
    const { error } = await db.from("orders").insert({
      order_number: order.orderNumber,
      customer_name: order.customer.name,
      phone: order.customer.phone,
      email: order.customer.email || null,
      governorate: order.customer.governorate,
      city: order.customer.city,
      address: order.customer.address,
      notes: order.customer.notes || null,
      items: order.items,
      subtotal: order.subtotal,
      shipping: order.shipping,
      total: order.total,
      payment_method: "cod",
    });
    if (error) {
      console.error("[orders] insert failed", error);
      throw new OrderError("حصلت مشكلة وإحنا بنسجل الأوردر، جرّب تاني");
    }
  } else if (isSupabaseConfigured) {
    console.warn("[orders] SUPABASE_SERVICE_ROLE_KEY missing; order not stored", order.orderNumber);
  }

  return order;
}
