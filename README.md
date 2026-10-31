# FAKHM | فَخْم — Online Store

Arabic (RTL) e-commerce site for FAKHM Perfumes, built on the brand guidelines v1.0.

**Stack:** Next.js 16 (App Router, Cache Components) · Tailwind CSS 4 · Supabase (products + orders) · Resend (order emails) · Vercel (hosting + Web Analytics).

## Run locally

```bash
npm install
cp .env.example .env.local   # optional: without Supabase the built-in catalogue is used
npm run dev
```

## Structure

| Path | What |
|---|---|
| `app/` | Pages: home, `/shop`, `/shop/[category]`, `/product/[slug]`, `/cart`, `/checkout`, `/order/success` |
| `app/checkout/actions.ts` | Server action that places an order (prices re-checked on the server) |
| `app/api/revalidate` | `POST` with `Authorization: Bearer $REVALIDATE_SECRET` to refresh products immediately |
| `components/brand.tsx` | Logo (temporary stand-in), seal, divider, placeholder bottle art |
| `lib/config.ts` | Contacts, shipping fee, governorates, categories |
| `lib/catalogue.ts` | FAKHM catalogue (men & women) used until Supabase is connected |
| `supabase/migrations` | Database schema + RLS; `supabase/seed.sql` loads the catalogue |

## Managing products

Products live in the Supabase `products` table. Prices are in EGP; `variants` is a JSON array like
`[{"sizeMl":50,"price":850}]`; an empty array shows an "order on WhatsApp" button instead. Changes show on the site within about a minute,
or immediately after calling `/api/revalidate`.

## Orders

Each order is saved in the `orders` table and an email is sent to `ORDER_NOTIFY_EMAIL`. Payment is cash on delivery.
