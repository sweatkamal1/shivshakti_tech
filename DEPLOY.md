# ShivShakti — Free Deploy Guide (GitHub + Vercel + Render)

Yeh project **3 parts** me deploy hota hai (sab free tier):

| Part | Platform | Kya hai |
|------|----------|---------|
| Frontend (React) | **Vercel** | Website UI |
| Backend (Express API) | **Render** (free) | `/api/*` routes |
| Database (MySQL) | **TiDB Cloud** (free) | Prisma data |

> Vercel pe poora Express + MySQL directly run nahi hota free tier pe. Isliye frontend Vercel, API Render pe.

---

## Step 1 — GitHub pe code push karo

```bash
cd e:\shivshakti_technologies

git init
git add .
git commit -m "Initial commit - ShivShakti Technology"

# GitHub pe naya repo banao: github.com/new → naam do (e.g. shivshakti-technology)
git remote add origin https://github.com/YOUR_USERNAME/shivshakti-technology.git
git branch -M main
git push -u origin main
```

`.env` files push **mat** karo — wo already `.gitignore` me hain.

---

## Step 2 — Free MySQL database (TiDB Cloud)

1. https://tidbcloud.com pe account banao (free Serverless tier)
2. **Create Cluster** → Serverless → region choose karo
3. **Connect** → connection string copy karo (MySQL format)
4. Prisma ke liye URL aisa dikhega:

```
mysql://USER:PASSWORD@gateway01.xxx.prod.aws.tidbcloud.com:4000/shivshakti?sslaccept=strict
```

5. Local se ek baar database setup (optional, Render bhi kar sakta hai):

```bash
cd backend
# .env me DATABASE_URL paste karo
npx prisma db push
npx tsx prisma/seed.ts
```

---

## Step 3 — Backend Render pe deploy (FREE)

1. https://render.com → Sign up (GitHub se login)
2. **New +** → **Blueprint** (ya Web Service)
3. GitHub repo connect karo
4. Render `render.yaml` auto detect karega, ya manually:

| Setting | Value |
|---------|-------|
| Root Directory | `backend` |
| Runtime | Node |
| Build Command | `npm install && npm run build` |
| Start Command | `npm run start:prod` |
| Plan | **Free** |

5. **Environment Variables** add karo:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | TiDB wala connection string |
| `JWT_SECRET` | koi lamba random string (32+ chars) |
| `CLIENT_URL` | abhi khali chhod do, Step 5 me update karenge |

6. Deploy hone do → URL milega jaise:  
   `https://shivshakti-api.onrender.com`

7. Test: browser me kholo  
   `https://shivshakti-api.onrender.com/api/health`  
   → `{"success":true,...}` aana chahiye

8. **Seed (sirf pehli baar)** — Render Dashboard → Shell:

```bash
npx tsx prisma/seed.ts
```

---

## Step 4 — Frontend Vercel pe deploy (FREE)

1. https://vercel.com → Sign up (GitHub se)
2. **Add New Project** → apna GitHub repo select karo
3. Settings:

| Setting | Value |
|---------|-------|
| Framework Preset | **Vite** |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

4. **Environment Variables** — Vercel pe `VITE_API_URL` **mat** set karo (khali rakho).  
   API same domain se `/api` se jayegi (rewrite se).

5. Deploy se **pehle** `frontend/vercel.json` me backend URL update karo:

```json
"destination": "https://shivshakti-api.onrender.com/api/:path*"
```

Apna Render URL paste karo, phir commit + push:

```bash
git add frontend/vercel.json
git commit -m "Set production API URL for Vercel"
git push
```

6. Vercel auto redeploy karega → URL milega:  
   `https://shivshakti-technology.vercel.app`

---

## Step 5 — Final linking

Render dashboard me `CLIENT_URL` update karo:

```
CLIENT_URL=https://your-app.vercel.app
```

(comma se multiple domains bhi chal sakte hain)

Render service **Manual Deploy** ya restart karo taaki naya CORS apply ho.

---

## Step 6 — Verify

- [ ] Homepage load ho
- [ ] Login: `admin@shivshaktitech.com` / `Admin@123` (seed ke baad)
- [ ] Admin panel `/admin` khule
- [ ] Contact form submit ho
- [ ] API health: `https://YOUR-VERCEL-URL.vercel.app/api/health`

---

## Important notes (free tier)

1. **Render free** — 15 min inactive ke baad sleep hota hai; pehli request 30–60 sec slow ho sakti hai.
2. **Production me password change karo** — seed wale default passwords mat chhodo.
3. **Custom domain** (optional): Vercel → Settings → Domains; Render me bhi `CLIENT_URL` update karo.
4. **vercel.json rewrite** — login cookies ke liye best hai (same-origin `/api` proxy).

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Login nahi ho raha | `CLIENT_URL` Vercel URL se match kare; `vercel.json` me sahi Render URL |
| API 404 on Vercel | `frontend/vercel.json` rewrite check karo |
| Database error | `DATABASE_URL` correct + TiDB IP allow / SSL |
| CORS error | Render me `CLIENT_URL` exact Vercel URL (no trailing slash) |
| Slow first load | Render free tier cold start — normal hai |

---

## Quick command reference

```bash
# Local dev
npm run dev

# Production build test
npm run build

# DB push (local or with prod DATABASE_URL)
npm run db:push
npm run db:seed
```
