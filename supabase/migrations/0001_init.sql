-- FAKHM store: products and orders.

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_ar text not null,
  name_en text not null,
  tagline text,
  description text,
  notes jsonb not null default '{"top":[],"heart":[],"base":[]}',
  category text not null check (category in ('men','women','unisex')),
  -- [{"sizeMl":50,"price":1450}, ...]  prices in EGP
  variants jsonb not null check (jsonb_typeof(variants) = 'array' and jsonb_array_length(variants) > 0),
  images text[] not null default '{}',
  featured boolean not null default false,
  in_stock boolean not null default true,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create type public.order_status as enum ('new','confirmed','shipped','delivered','cancelled');

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  status public.order_status not null default 'new',
  customer_name text not null,
  phone text not null,
  email text,
  governorate text not null,
  city text not null,
  address text not null,
  notes text,
  -- snapshot of what was bought: [{productId,sizeMl,qty,nameAr,nameEn,price}]
  items jsonb not null,
  subtotal int not null,
  shipping int not null,
  total int not null,
  payment_method text not null default 'cod',
  created_at timestamptz not null default now()
);

create index orders_created_at_idx on public.orders (created_at desc);

create or replace function public.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger products_touch before update on public.products
for each row execute function public.touch_updated_at();

-- RLS: the public can read active products only. Orders are written and read
-- exclusively by the server with the service-role key.
alter table public.products enable row level security;
alter table public.orders enable row level security;

create policy "public reads active products" on public.products
  for select to anon, authenticated using (is_active);

-- Product images bucket (public read).
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;
