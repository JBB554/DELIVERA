-- ══════════════════════════════════════════════════════
-- DELIVERA V2.7 — Complete Supabase Schema
-- Paste this entire file into Supabase SQL Editor → Run
-- ══════════════════════════════════════════════════════

-- ─────────────────────────────────────────
-- PROFILES (all user types)
-- ─────────────────────────────────────────
create table if not exists profiles (
  id uuid default gen_random_uuid() primary key,
  role text check (role in ('buyer','picker','store','admin')) default 'buyer',
  full_name text,
  phone text unique,
  city text,
  zone text,
  status text default 'active',
  rating numeric default 5.0,
  total_orders integer default 0,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- OTP CODES (phone verification)
-- ─────────────────────────────────────────
create table if not exists otp_codes (
  phone text primary key,
  code text not null,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- PICKER APPLICATIONS
-- ─────────────────────────────────────────
create table if not exists picker_applications (
  id text primary key,
  full_name text not null,
  phone text not null,
  dob text,
  city text,
  zones text[],
  cni_front_url text,
  cni_back_url text,
  selfie_url text,
  quiz_score integer default 0,
  quiz_passed boolean default false,
  offers_delivery boolean default false,
  vehicle_type text,
  delivery_radius integer default 2,
  plate_number text,
  payment_method text,
  payment_number text,
  payment_ref text,
  status text default 'pending' check (status in ('pending','approved','rejected','suspended')),
  violations integer default 0,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- STORES
-- ─────────────────────────────────────────
create table if not exists stores (
  id uuid default gen_random_uuid() primary key,
  owner_phone text,
  name text not null,
  category text,
  city text,
  zone text,
  address text,
  phone text,
  lat numeric,
  lng numeric,
  open boolean default true,
  verified boolean default false,
  coming_soon boolean default true,
  rating numeric default 5.0,
  total_orders integer default 0,
  application_ref text,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- PRODUCTS (picker-uploaded inventory)
-- ─────────────────────────────────────────
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  store_id uuid references stores(id) on delete cascade,
  name text not null,
  price integer not null,
  original_price integer, -- locked at listing, picker cannot change
  stock integer default 1,
  emoji text default '🛒',
  category text,
  description text,
  available boolean default true,
  locked_price boolean default true, -- price cannot be changed after listing
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- ORDERS
-- ─────────────────────────────────────────
create table if not exists orders (
  id text primary key,
  buyer_phone text,
  picker_id text references picker_applications(id),
  status text default 'placed' check (status in (
    'placed','picker_assigned','shopping','packing','dispatched','nearby','delivered','cancelled','disputed'
  )),
  delivery_mode text check (delivery_mode in ('delivery','pickup')),
  -- Location data
  delivery_address text,
  delivery_lat numeric,
  delivery_lng numeric,
  delivery_landmark_type text,
  delivery_landmark_name text,
  delivery_notes text,
  delivery_photo_url text,
  -- Financials
  subtotal integer,
  picking_fee integer default 1000,  -- 700 to picker, 300 to DELIVERA
  delivery_fee integer default 0,
  service_fee integer default 300,
  total integer,
  -- Payment
  payment_method text,
  payment_status text default 'pending',
  monetbil_ref text,
  -- Confirmation
  pin text,
  confirmed_at timestamptz,
  -- Fraud prevention
  pack_photo_url text,
  pack_video_url text,
  delivery_confirmed boolean default false,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- ORDER ITEMS
-- ─────────────────────────────────────────
create table if not exists order_items (
  id uuid default gen_random_uuid() primary key,
  order_id text references orders(id) on delete cascade,
  product_id uuid references products(id),
  product_name text not null,
  store_name text,
  store_id uuid,
  unit_price integer not null,
  original_price integer, -- locked price at order time
  qty integer default 1,
  line_total integer,
  price_matched boolean default true, -- false = mismatch flagged
  substituted boolean default false
);

-- ─────────────────────────────────────────
-- PRICE MISMATCH FLAGS
-- ─────────────────────────────────────────
create table if not exists price_flags (
  id uuid default gen_random_uuid() primary key,
  order_id text references orders(id),
  product_id uuid,
  product_name text,
  listed_price integer,
  actual_price integer,
  difference integer,
  picker_id text,
  customer_approved boolean,
  resolved_at timestamptz,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- VIOLATIONS (fraud prevention)
-- ─────────────────────────────────────────
create table if not exists violations (
  id uuid default gen_random_uuid() primary key,
  picker_id text references picker_applications(id),
  order_id text,
  type text, -- 'price_inflation', 'no_pack_proof', 'late_confirmation', etc.
  details text,
  resolved boolean default false,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- WAITLIST (consumer pre-registration)
-- ─────────────────────────────────────────
create table if not exists waitlist (
  id uuid default gen_random_uuid() primary key,
  phone text unique,
  name text,
  city text,
  referral_code text,
  referred_by text,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- STORAGE BUCKETS
-- ─────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('delivera-docs', 'delivera-docs', false)
on conflict do nothing;

insert into storage.buckets (id, name, public)
values ('delivera-packs', 'delivera-packs', false)
on conflict do nothing;

-- ─────────────────────────────────────────
-- ROW LEVEL SECURITY (basic)
-- ─────────────────────────────────────────
alter table orders enable row level security;
alter table order_items enable row level security;
alter table picker_applications enable row level security;
alter table products enable row level security;
alter table stores enable row level security;

-- Service role can do everything (your API uses service key)
create policy "service_all_orders" on orders for all using (true);
create policy "service_all_items" on order_items for all using (true);
create policy "service_all_pickers" on picker_applications for all using (true);
create policy "service_all_products" on products for all using (true);
create policy "service_all_stores" on stores for all using (true);

-- ─────────────────────────────────────────
-- VIEWS (useful for admin)
-- ─────────────────────────────────────────
create or replace view pending_pickers as
  select id, full_name, phone, city, quiz_score, offers_delivery, created_at
  from picker_applications
  where status = 'pending'
  order by created_at desc;

create or replace view daily_revenue as
  select
    date_trunc('day', created_at) as day,
    count(*) as orders,
    sum(total) as gross,
    sum(service_fee + (picking_fee * 0.3)::int) as delivera_revenue
  from orders
  where payment_status = 'paid'
  group by 1
  order by 1 desc;

-- ══════════════════════════════════════════════════════
-- Done! All tables, buckets, RLS, and views created.
-- ══════════════════════════════════════════════════════
