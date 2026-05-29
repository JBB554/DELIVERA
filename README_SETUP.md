# DELIVERA V2.7 — Complete Launch Guide
## From zero to live in Yaoundé + Douala

---

## 📦 FILES IN THIS PACKAGE

| File | Purpose |
|------|---------|
| `index.html` | Main PWA app — home, cart, checkout, receipt, dashboards |
| `onboarding.html` | Picker + Store partner registration (fully wired) |
| `track.html` | Live order tracking (Yango-style) |
| `manifest.json` | PWA install config |
| `sw.js` | Service worker — offline support |
| `lang.js` | EN/FR language system |
| `offline.html` | Offline fallback |
| `icon-192.svg` | App icon 192×192 |
| `icon-512.svg` | App icon 512×512 |
| `vercel.json` | Deployment config (no warnings) |
| `api/pay.js` | Monetbil payment route |
| `api/monetbil-webhook.js` | Payment confirmation handler |
| `api/send-otp.js` | WhatsApp OTP |
| `api/save-order.js` | Save orders to Supabase |
| `supabase-schema.sql` | Complete database schema |

---

## ✅ PRE-LAUNCH CHECKLIST

- [ ] GitHub account created
- [ ] Vercel account created (free)
- [ ] Supabase project created (free)
- [ ] Monetbil account created
- [ ] MoMo number ready for picker payment destination
- [ ] WhatsApp Business number ready
- [ ] SME registration documents ready

---

## STEP 1 — GITHUB (10 min)

1. Go to **github.com** → sign in → click **+** → **New repository**
2. Name: `delivera` → Public → **Create repository**
3. On the repo page → click **uploading an existing file**
4. Extract this ZIP and drag ALL files + the `api/` folder
5. Write commit message: `DELIVERA v2.7 launch` → **Commit changes**

> ⚠️ Make sure the `api/` folder uploads with its 4 files inside it.

---

## STEP 2 — VERCEL (5 min)

1. Go to **vercel.com** → **Sign up with GitHub**
2. **Add New Project** → import your `delivera` repo
3. Leave all settings default → **Deploy**
4. ✅ You get: `delivera.vercel.app` — live immediately

**To add your own domain later:**
- Vercel → Settings → Domains → add `delivera.cm`
- Point DNS at Vercel (they show you exactly how)

---

## STEP 3 — SUPABASE (15 min)

### 3a. Create project
1. **supabase.com** → **Start for free** → **New Project**
   - Name: `delivera`
   - Password: generate strong password, **SAVE IT**
   - Region: **West EU (Ireland)** — best latency for Cameroon
2. Wait 2 minutes

### 3b. Get your keys
1. Left sidebar → **Settings** (gear icon) → **API**
2. Copy and save these 3 values:
   - **Project URL** → `https://XXXXXXXX.supabase.co`
   - **anon/public key** → starts with `eyJhbGciOi...`
   - **service_role key** → starts with `eyJhbGciOi...` (different, longer one — KEEP SECRET)

> 📸 The Project URL is NOT the "Publishable key". It's the URL at the top of the API settings page.

### 3c. Create all database tables
1. Left sidebar → **SQL Editor** → **New query**
2. Open `supabase-schema.sql` from this package
3. Copy the entire contents → paste into the SQL editor
4. Click **Run** (green button, top right)
5. Should say: "Success. No rows returned"

✅ All tables, storage buckets, and security policies are created.

---

## STEP 4 — ENVIRONMENT VARIABLES IN VERCEL (5 min)

1. Vercel → your `delivera` project → **Settings** → **Environment Variables**
2. Add each variable:

| Name | Value | Where to get |
|------|-------|--------------|
| `SUPABASE_URL` | `https://XXXX.supabase.co` | Supabase → Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | `eyJhbGci...` (shorter) | Supabase → Settings → API → anon/public |
| `SUPABASE_SERVICE_KEY` | `eyJhbGci...` (longer) | Supabase → Settings → API → service_role |
| `MONETBIL_SERVICE_KEY` | from Monetbil dashboard | Step 5 below |
| `MONETBIL_SECRET` | from Monetbil dashboard | Step 5 below |
| `DIALOG360_API_KEY` | from 360dialog | Step 6 below (optional) |

3. After adding all: **Deployments** tab → 3 dots on latest → **Redeploy**

> 📸 In Vercel env vars: "Name" = left column, "Value" = right column, "Environment" = select All (Production + Preview + Development)

---

## STEP 5 — MONETBIL PAYMENTS (30 min)

1. **monetbil.com** → **Create Account**
   - Business name: DELIVERA (or your SME name)
   - Country: Cameroon
   - Email: your business email
2. Verify email
3. Dashboard → **Services** → **Add Service**
   - Name: `DELIVERA`
   - Currency: `XAF`
   - Enable: MTN Mobile Money ✅ Orange Money ✅
4. **Set webhook URL:**
   `https://delivera.vercel.app/api/monetbil-webhook`
5. Copy **Service Key** + **Service Secret** → paste into Vercel env vars

**For picker onboarding fees (500 FCFA):**
- The payment goes to your Monetbil merchant account
- Monetbil settles to your MTN MoMo Business or bank account
- To add your MoMo receiving number: Monetbil → Account → Payout settings

> ⚠️ Monetbil may ask for RCCM for full activation. Use sandbox mode for testing until you have it.

---

## STEP 6 — WHATSAPP (optional Phase 1)

For Phase 1, the app uses click-to-chat WhatsApp (no API needed — zero cost).
For Phase 2 (automated order confirmations):

1. **360dialog.com** → **Get Started**
2. Connect dedicated WhatsApp Business number
3. Complete Meta Business verification (takes 24-48h)
4. Get API key → add to Vercel as `DIALOG360_API_KEY`

---

## STEP 7 — LEGAL (Week 1, can run parallel)

**Can you launch under your existing SME? YES.**
- Use your SME as the operating entity
- Add "DELIVERA" as a trade name (enseigne commerciale)
- No new registration needed to start taking orders

**When you scale (Month 2-3):**
- Register SARL at CFCE Yaoundé (~50,000 FCFA, 72h)
- Open Afriland or UBA business account
- Register MTN MoMo Business + Orange Money Merchant accounts

---

## PICKER FEE DESTINATION

To wire picker onboarding fees to YOUR number:
1. Open `onboarding.html`
2. Find this line: `// In production: call /api/pay with Monetbil`
3. The payment flows through your Monetbil merchant account
4. Monetbil pays out to whatever number you register in their payout settings

**Add your MoMo number** in Monetbil → Account Settings → Payout → Add Mobile Money Number

---

## INVENTORY STRATEGY — HOW TO MAX OUT BEFORE LAUNCH

**The playbook (no waiting for stores to come online):**

1. **Pickers upload store inventory during registration**
   - In onboarding, picker selects their store zone
   - After approval, they get access to "Add products" in their dashboard
   - They photograph and upload items from their regular stores
   - Same product from 3 pickers = price comparison is automatic

2. **Coming Soon banner for consumers** (already in index.html)
   - Consumers see: "DELIVERA arrive bientôt · DELIVERA coming soon"
   - Waitlist CTA: "Sois parmi les premiers · Be first"
   - Pickers CAN register immediately (onboarding live)
   - Stores CAN register immediately

3. **Price lock rule:** Picker sets price at upload → locked → they cannot edit in the field. Only available/unavailable toggle. Price mismatch = flag → customer approval.

4. **Auto product matching:** Same product name from multiple stores = grouped. Buyer sees "Rice 5kg — best price: Santa Lucia 5,200F" automatically.

---

## LAUNCH SEQUENCE

### Week 1: Viral content (no app reveal)
```
TikTok/Reels:
- "POV: jamais aller au marché encore"
- "Regarder ses courses se faire en direct 🎥"
- "Santa Lucia vs Dovv — qui est moins cher ?"
No CTA yet. Just curiosity.
```

### Week 2: Picker recruitment
```
"Rejoins DELIVERA — gagne 700F+ par commande"
"Flexible. Chez toi. Ta ville."
→ Link: delivera.vercel.app/onboarding
```

### Week 3: Store partners
```
DM Santa Lucia, Dovv, Glam Parfumerie
"Mettre ta boutique en ligne gratuitement"
"Zéro commission au lancement"
```

### Week 4: Consumer launch
```
"DELIVERA est LIVE — commande maintenant"
First live order filmed and posted immediately
```

---

## MONTHLY COSTS AT LAUNCH

| Service | Cost |
|---------|------|
| Vercel | Free |
| Supabase | Free (up to 500MB, 50K rows) |
| Monetbil | ~2.5% per transaction |
| 360dialog WhatsApp | Free tier → $50/month |
| Domain `delivera.cm` | ~5,000 FCFA/year |
| **Total fixed** | **~$0/month** |

---

## SUPPORT & TROUBLESHOOTING

**White page / 404 on onboarding:**
→ Make sure `onboarding.html` was uploaded to GitHub root (not in a subfolder)
→ Check Vercel → Deployments → click latest deploy → browse files

**Vercel config warning:**
→ This package uses `rewrites` only, not `builds`. Warning should be gone.

**Supabase connection error:**
→ Double-check SUPABASE_URL has no trailing slash
→ Make sure you're using the Project URL, not the REST URL

**Payment not processing:**
→ Use Monetbil sandbox mode: add `sandbox=true` to test without real money
