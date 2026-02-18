---
description: How to run the project in development mode
---

## Prerequisites
- Node.js 18+ installed
- `npm install` has been run

## Steps

// turbo-all

1. Start the Next.js dev server (this is the **only** command needed):
```bash
npm run dev
```

2. The app will be available at:
   - **Website**: http://localhost:3000
   - **Blog**: http://localhost:3000/blog
   - **CMS Login**: http://localhost:3000/cms/login
   - **CMS Dashboard**: http://localhost:3000/cms

3. Default CMS login credentials:
   - **Username**: `admin`
   - **Password**: `admin123`

## Notes
- The API routes (`/api/posts`, `/api/auth/*`) are built into Next.js — no separate backend server is needed.
- The local SQLite database is stored at `cms/data/blog.db`.
- If the database doesn't exist yet, run `npm run db:push` to create the tables, then restart the dev server.
