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
| `build` | `npm run build` | Create a production build |
| `start` | `npm run start` | Start the production server |
| `lint` | `npm run lint` | Run ESLint |
| `db:push` | `npm run db:push` | Push schema changes to the database |
| `db:seed` | `npm run db:seed` | Seed the database with sample data |

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

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **3D Graphics:** Three.js + React Three Fiber
- **Animations:** Framer Motion
- **Database:** SQLite (local) / Turso (production)
- **ORM:** Drizzle ORM
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
