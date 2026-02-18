# FinanceFlow — Landing Page + CMS Blog

A modern finance landing page built with **Next.js**, **Three.js**, and **Framer Motion**, featuring a built-in CMS for managing blog posts backed by **SQLite** + **Drizzle ORM**.

---

## Prerequisites

- **Node.js** ≥ 18
- **npm** (comes with Node.js)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd finance-landing-page-cms-blog
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

For **local development**, no changes are needed — the app uses a local SQLite file by default (`cms/data/blog.db`).

For **production** (Turso), fill in `DATABASE_URL` and `DATABASE_AUTH_TOKEN` in `.env`.

### 4. Push the database schema

```bash
npm run db:push
```

### 5. Seed the database

This creates a default **admin user** and **5 sample blog posts**:

```bash
npm run db:seed
```

> **Default CMS credentials:**
> - Username: `admin`
> - Password: `admin123`

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

---

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start the Next.js dev server |
| `build` | `npm run build` | Push schema + seed + Next.js build |
| `start` | `npm run start` | Start the production server |
| `lint` | `npm run lint` | Run ESLint |
| `db:push` | `npm run db:push` | Push schema changes to the database |
| `db:seed` | `npm run db:seed` | Seed the database with sample data |
| `db:setup` | `npm run db:setup` | Push schema + seed (runs before build) |

---

## Project Structure

```
├── app/
│   ├── api/              # API routes (posts, auth)
│   ├── blog/             # Blog listing & detail pages
│   ├── cms/              # CMS admin panel
│   ├── features/         # Feature pages
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   └── legal/            # Legal pages
├── cms/
│   ├── db/
│   │   ├── schema.ts     # Drizzle ORM schema
│   │   └── seed.ts       # Database seed script
│   └── data/             # SQLite database (auto-created)
├── components/           # Shared React components
├── lib/
│   ├── db.ts             # Database connection
│   ├── auth.ts           # Authentication utilities
│   └── posts.ts          # Post CRUD operations
└── public/               # Static assets
```

---

## CMS Usage

1. Navigate to [http://localhost:3000/cms](http://localhost:3000/cms)
2. Log in with `admin` / `admin123`
3. Create, edit, and publish blog posts with Markdown support and cover images

---

## Deploy to Vercel

The build pipeline automatically pushes the database schema and seeds data on every deploy.

### 1. Create a Turso Database

Sign up at [app.turso.tech](https://app.turso.tech/) and create a new database. Copy:
- **Database URL** — `libsql://your-db-name.turso.io`
- **Auth Token** — generate from the database settings page

### 2. Add Environment Variables in Vercel

Go to your Vercel project → **Settings** → **Environment Variables** and add:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `libsql://your-db-name.turso.io` |
| `DATABASE_AUTH_TOKEN` | Your Turso auth token |

### 3. Deploy

Push to your connected Git branch or trigger a deploy from the Vercel dashboard. The build will automatically:

1. `db:push` — Push the schema to Turso
2. `db:seed` — Seed the admin user + sample posts (skips if data already exists)
3. `next build` — Build the Next.js app

> **Note:** The seed script is idempotent — it only inserts data if the tables are empty, so subsequent deploys won't duplicate data.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **3D Graphics:** Three.js + React Three Fiber
- **Animations:** Framer Motion
- **Database:** SQLite (local) / Turso (production)
- **ORM:** Drizzle ORM
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
