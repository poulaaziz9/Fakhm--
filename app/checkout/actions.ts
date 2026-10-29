"use server";

import { after } from "next/server";
import { sendOrderNotification } from "@/lib/email";
import { OrderError, placeOrder, type OrderInput } from "@/lib/orders";

export type CheckoutResult = { ok: true; orderNumber: string } | { ok: false; error: string };

export async function submitOrder(input: OrderInput): Promise<CheckoutResult> {
  try {
    const order = await placeOrder(input);
    // Send the notification after responding so the customer isn't kept waiting.
    after(() => sendOrderNotification(order));
    return { ok: true, orderNumber: order.orderNumber };
  } catch (e) {
    if (e instanceof OrderError) return { ok: false, error: e.message };
    console.error("[checkout]", e);
    return { ok: false, error: "حصلت مشكلة، جرّب تاني بعد شوية" };
  }
}
