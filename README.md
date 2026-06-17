# ShivShakti Technology

React.js frontend + Node.js backend + MySQL + Prisma.

## Structure

```
frontend/    # React (Vite) — port 5173
backend/     # Express API — port 5000
  prisma/    # Database schema, migrations, seed
```

## Setup

```bash
npm install

# Configure backend/.env (copy from backend/.env.example)
npm run db:generate
npm run db:push
npm run db:seed

npm run dev
```

- **Frontend:** http://localhost:5173
- **API:** http://localhost:5000/api/health

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@shivshaktitech.com | Admin@123 |
| Client | client@example.com | Client@123 |

## Deploy (Free)

See **[DEPLOY.md](./DEPLOY.md)** for full steps:

1. Push to **GitHub**
2. MySQL on **TiDB Cloud** (free)
3. API on **Render** (free)
4. Frontend on **Vercel** (free)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + backend |
| `npm run dev:frontend` | React only |
| `npm run dev:backend` | API only |
| `npm run build` | Build both |
| `npm run db:seed` | Seed demo data |
