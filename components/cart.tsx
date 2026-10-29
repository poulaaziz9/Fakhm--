"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/lib/types";

const STORAGE_KEY = "fakhm-cart-v1";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (productId: string, sizeMl: number, qty: number) => void;
  remove: (productId: string, sizeMl: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const sameLine = (a: Pick<CartItem, "productId" | "sizeMl">, id: string, size: number) =>
  a.productId === id && a.sizeMl === size;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage once on mount
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // Storage unavailable (private mode etc.): start with an empty cart.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => sameLine(i, item.productId, item.sizeMl));
      if (existing) {
        return prev.map((i) =>
          sameLine(i, item.productId, item.sizeMl) ? { ...i, qty: Math.min(i.qty + qty, 10) } : i,
        );
      }
      return [...prev, { ...item, qty }];
    });
  }, []);

  const setQty = useCallback((productId: string, sizeMl: number, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !sameLine(i, productId, sizeMl))
        : prev.map((i) => (sameLine(i, productId, sizeMl) ? { ...i, qty: Math.min(qty, 10) } : i)),
    );
  }, []);

  const remove = useCallback((productId: string, sizeMl: number) => {
    setItems((prev) => prev.filter((i) => !sameLine(i, productId, sizeMl)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      ready,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.price, 0),
      add,
      setQty,
      remove,
      clear,
    }),
    [items, ready, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
