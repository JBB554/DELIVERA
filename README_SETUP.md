# DELIVERA — Launch Guide
## Zero-to-live deployment: GitHub → Vercel → Supabase → Monetbil

---

## ✅ PRE-LAUNCH CHECKLIST

### Files in this package
- [x] `index.html` — Full PWA app (85KB, all screens)
- [x] `manifest.json` — PWA install config
- [x] `sw.js` — Service worker (offline support)
- [x] `lang.js` — EN/FR language system
- [x] `offline.html` — Offline fallback page
- [x] `vercel.json` — Vercel deployment config
- [x] `api/pay.js` — Monetbil payment route
- [x] `api/monetbil-webhook.js` — Payment confirmation
- [x] `api/send-otp.js` — WhatsApp OTP

---

## STEP 1 — GitHub (10 minutes)

1. Go to **github.com** → sign in or create free account
2. Click the **+** icon (top right) → **New repository**
3. Name: `delivera` → set to **Public** → click **Create repository**
4. On the next page, click **uploading an existing file**
5. Drag ALL files from this ZIP into the upload area:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `lang.js`
   - `offline.html`
   - `vercel.json`
   - `api/pay.js` ← make sure to create the `api/` folder first
   - `api/monetbil-webhook.js`
   - `api/send-otp.js`
6. Scroll down → click **Commit changes**

✅ Your code is now on GitHub.

---

## STEP 2 — Vercel (5 minutes)

1. Go to **vercel.com** → click **Sign up** → choose **Continue with GitHub**
2. Authorize Vercel to access your GitHub
3. Click **Add New Project**
4. Find your `delivera` repo → click **Import**
5. Leave all settings default → click **Deploy**
6. Wait ~60 seconds → you'll get a live URL like `delivera.vercel.app`

✅ Your app is live. Visit the URL — DELIVERA should open.

---

## STEP 3 — Supabase (15 minutes)

### 3a. Create project
1. Go to **supabase.com** → **Start for free** → sign up
2. Click **New Project**
   - Name: `delivera`
   - Database password: generate one, SAVE IT somewhere safe
   - Region: **West EU (Ireland)** — closest to Cameroon
3. Wait ~2 minutes for project to initialize

### 3b. Get your keys
1. Go to **Settings** (gear icon, left sidebar) → **API**
2. Copy and save:
   - **Project URL** → looks like `https://abcdef.supabase.co`
   - **anon/public key** → long string starting with `eyJ...`
   - **service_role key** → another long string (keep this SECRET)

### 3c. Create the database tables
1. Click **SQL Editor** (left sidebar, looks like `>_`)
2. Click **New query**
3. Paste the SQL below and click **Run**:

```sql
-- Users / profiles
create table if not exists profiles (
  id uuid references auth.users primary key,
  role text check (role in ('buyer','picker','store','admin')),
  full_name text,
  phone text unique,
  city text,
  zone text,
  status text default 'pending',
  rating numeric default 5.0,
  created_at timestamptz default now()
);

-- OTP codes (for phone verification)
create table if not exists otp_codes (
  phone text primary key,
  code text,
  expires_at timestamptz
);

-- Picker applications
create table if not exists picker_applications (
  id uuid default gen_random_uuid() primary key,
  full_name text,
  phone text,
  city text,
  zones text[],
  cni_front_url text,
  cni_back_url text,
  selfie_url text,
  quiz_score integer,
  quiz_passed boolean default false,
  offers_delivery boolean default false,
  vehicle_type text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Stores
create table if not exists stores (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid,
  name text,
  category text,
  city text,
  zone text,
  address text,
  phone text,
  open boolean default true,
  verified boolean default false,
  rating numeric default 5.0,
  created_at timestamptz default now()
);

-- Products
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  store_id uuid references stores(id),
  name text,
  price integer,
  stock integer default 0,
  emoji text,
  available boolean default true,
  created_at timestamptz default now()
);

-- Orders
create table if not exists orders (
  id text primary key,
  buyer_phone text,
  picker_id uuid,
  status text default 'placed',
  delivery_mode text,
  delivery_address text,
  payment_method text,
  payment_status text default 'pending',
  subtotal integer,
  delivery_fee integer,
  service_fee integer,
  total integer,
  pin text,
  monetbil_ref text,
  created_at timestamptz default now()
);

-- Order items
create table if not exists order_items (
  id uuid default gen_random_uuid() primary key,
  order_id text references orders(id),
  product_name text,
  store_name text,
  unit_price integer,
  qty integer,
  line_total integer
);

-- File storage bucket for picker ID documents
insert into storage.buckets (id, name, public)
values ('delivera-docs', 'delivera-docs', false)
on conflict do nothing;
```

4. Click **Run** — you should see "Success. No rows returned"

✅ Database is ready.

---

## STEP 4 — Add environment variables to Vercel (5 minutes)

1. Go back to **vercel.com** → click your `delivera` project
2. Click **Settings** (top tabs) → **Environment Variables**
3. Add each variable below (click **Add** after each):

| Name | Value |
|------|-------|
| `SUPABASE_URL` | Your Supabase Project URL |
| `SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `SUPABASE_SERVICE_KEY` | Your Supabase service_role key |
| `MONETBIL_SERVICE_KEY` | From Monetbil dashboard (get in Step 5) |
| `MONETBIL_SECRET` | From Monetbil dashboard |
| `DIALOG360_API_KEY` | From 360dialog (get in Step 6) |

4. After adding all variables → go to **Deployments** tab → click the **3 dots** on latest deployment → **Redeploy**

✅ App now has access to all services.

---

## STEP 5 — Monetbil payments (30 minutes)

1. Go to **monetbil.com** → **Create Account**
2. Fill in: Business name: DELIVERA, Country: Cameroon
3. Verify your email
4. Go to **Dashboard** → **Services** → **Add Service**
   - Service name: `DELIVERA Orders`
   - Currency: `XAF`
   - Enable: MTN Mobile Money ✅ Orange Money ✅ Card ✅
5. Set Webhook URL: `https://your-vercel-url.vercel.app/api/monetbil-webhook`
6. Copy **Service Key** and **Service Secret** → add to Vercel env vars above

> ⚠️ Monetbil may require a business registration document (RCCM) before going live.
> For testing: use their sandbox mode which works without documents.

---

## STEP 6 — 360dialog WhatsApp (optional for Phase 1)

For Phase 1, WhatsApp notifications are click-to-chat (no API needed).
For Phase 2 automated messages:

1. Go to **360dialog.com** → **Get Started Free**
2. Connect a dedicated WhatsApp Business number (buy a separate SIM)
3. Complete Meta Business Manager verification
4. Get your API key
5. Add as `DIALOG360_API_KEY` in Vercel env vars
6. Create message templates in the 360dialog portal:
   - `order_confirmed` — "Ta commande {1} est confirmée ! 🎉"
   - `picker_assigned` — "Un picker est en route vers le magasin"
   - `order_delivered` — "Livré ! Merci d'avoir choisi DELIVERA"

> ⏱️ Meta template approval takes 24-48 hours.

---

## STEP 7 — Legal (Week 1)

Register in Cameroon:
1. **CFCE Yaoundé** (Centre de Formalités de Création d'Entreprises)
   - Register SARL (SARL = LLC equivalent)
   - Cost: ~50,000 FCFA
   - Time: 72 hours
   - Get: RCCM (Registre du Commerce) number
2. Open **Afriland First Bank** or **UBA** business account
3. Register **MTN MoMo Business** + **Orange Money Merchant** accounts
   - Both free, done at MTN/Orange Business Centers
   - Required documents: RCCM + ID + business address

---

## STEP 8 — Launch sequence

### Week 1: Content first
- TikTok/Reels/Facebook pages live
- 3 teaser videos (no app reveal yet)
- "Something is coming to Yaoundé & Douala 👀"

### Week 2: Recruitment
- "Rejoins l'équipe DELIVERA — gagne par commande"
- Picker onboarding page live (link in bio)
- DM Santa Lucia, Dovv, Niki, Glam Parfumerie

### Week 3: Launch
- Announce date publicly
- Countdown content daily
- Film first live order → post immediately
- 🚀 GO LIVE

---

## Monthly running costs

| Service | Cost |
|---------|------|
| Vercel (hosting) | Free |
| Supabase (database) | Free (up to 500MB) |
| Monetbil (payments) | ~2-3% per transaction |
| 360dialog (WhatsApp) | ~$50/month after free tier |
| Domain (delivera.cm) | ~5,000 FCFA/year |
| **Total fixed** | **~$0-5/month at launch** |

---

## Support
WhatsApp the ops number for issues during launch.
