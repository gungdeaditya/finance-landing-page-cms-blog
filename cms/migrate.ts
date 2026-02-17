import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "cms", "data");
const DB_PATH = path.join(DATA_DIR, "blog.db");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const sqlite = new Database(DB_PATH);
sqlite.pragma("journal_mode = WAL");

// Create posts table
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    cover_image TEXT,
    author TEXT NOT NULL DEFAULT 'Admin',
    status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );
`);

// Create auth tables
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS cms_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
`);

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS cms_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT NOT NULL UNIQUE,
    user_id INTEGER NOT NULL REFERENCES cms_users(id),
    expires_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL
  );
`);

// ─── Seed posts if empty ─────────────────────────────────
const count = sqlite.prepare("SELECT COUNT(*) as count FROM posts").get() as {
  count: number;
};

if (count.count === 0) {
  const now = Math.floor(Date.now() / 1000);
  const insert = sqlite.prepare(`
    INSERT INTO posts (title, slug, excerpt, content, cover_image, author, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const seedPosts = [
    {
      title: "The Future of Fintech: AI-Driven Financial Analytics",
      slug: "future-of-fintech-ai-analytics",
      excerpt:
        "Explore how artificial intelligence is transforming financial analytics and empowering businesses with predictive insights.",
      content: `# The Future of Fintech: AI-Driven Financial Analytics

The financial technology landscape is undergoing a seismic shift. **Artificial intelligence** is no longer a futuristic concept — it's the driving force behind modern financial analytics.

## Why AI Matters in Finance

Traditional financial analysis relied on historical data and manual interpretation. AI changes the game by:

- **Processing vast datasets** in real-time
- **Identifying patterns** that human analysts might miss
- **Predicting market movements** with increasing accuracy
- **Automating compliance** and risk assessment

## Key Applications

### 1. Predictive Analytics
AI models can forecast revenue trends, cash flow patterns, and potential risks months in advance. Companies using predictive analytics report **23% higher revenue growth** compared to those relying on traditional methods.

### 2. Fraud Detection
Machine learning algorithms analyze transaction patterns to flag suspicious activity instantly. Modern AI-powered fraud detection systems catch **95% of fraudulent transactions** before they complete.

### 3. Automated Reporting
Gone are the days of manual spreadsheet work. AI generates comprehensive financial reports with insights, visualizations, and actionable recommendations.

## Getting Started

At **FinanceFlow**, we're building the tools that make AI-driven analytics accessible to every business. Our platform integrates seamlessly with your existing financial stack.

> "The best time to adopt AI in your financial workflow was yesterday. The second best time is now."

---

*Ready to transform your financial analytics? [Get started with FinanceFlow today.](#)*`,
      coverImage: null,
      author: "Sarah Chen",
      status: "published",
    },
    {
      title: "5 Cash Flow Strategies Every Tech Startup Needs",
      slug: "cash-flow-strategies-tech-startups",
      excerpt:
        "Master the cash flow challenges unique to tech startups with these proven strategies from industry experts.",
      content: `# 5 Cash Flow Strategies Every Tech Startup Needs

Cash flow is the lifeblood of any startup. Yet **82% of startups fail** due to cash flow problems. Here are five strategies to keep your numbers healthy.

## 1. Implement Rolling Forecasts

Instead of annual budgets, use **13-week rolling cash flow forecasts**. This gives you:

- Short-term visibility for tactical decisions
- Early warning signs of potential shortfalls
- Flexibility to adapt to market changes

## 2. Optimize Your Billing Cycle

\`\`\`
Monthly Billing → Annual Billing = 12 months of guaranteed revenue upfront
\`\`\`

Consider offering **annual plan discounts** of 15-20%. The upfront cash improves your runway significantly.

## 3. Negotiate Payment Terms

| Vendor Type | Target Terms | Typical Terms |
|---|---|---|
| SaaS Tools | Net 45 | Net 30 |
| Contractors | Net 30 | Net 15 |
| Office/Infra | Net 60 | Net 30 |

Longer payment terms give you more breathing room without affecting relationships.

## 4. Build a Cash Reserve

Aim for **3-6 months of operating expenses** in reserve. This isn't just for emergencies — it's leverage for negotiation and opportunistic hiring.

## 5. Use Financial Automation

Manual financial processes are slow and error-prone. **Automated invoicing** alone can reduce your days sales outstanding (DSO) by 25%.

---

*FinanceFlow helps startups automate their entire financial workflow. [See our startup plan.](#)*`,
      coverImage: null,
      author: "Marcus Johnson",
      status: "published",
    },
    {
      title: "Building a Compliance-First Finance Stack",
      slug: "compliance-first-finance-stack",
      excerpt:
        "Learn how to architect your financial technology stack with compliance at its core, saving time and avoiding costly penalties.",
      content: `# Building a Compliance-First Finance Stack

In the era of **SOX, GDPR, and PCI-DSS**, compliance isn't optional — it's foundational. Here's how to build your finance stack right from day one.

## The Cost of Non-Compliance

- Average cost of non-compliance: **$14.82 million** per year
- Average cost of compliance: **$5.47 million** per year
- The math is simple: compliance saves money

## Core Components

### Data Layer
Your financial data infrastructure must support:

1. **Immutable audit trails** — every transaction logged permanently
2. **Role-based access control** — least privilege by default
3. **Encryption at rest and in transit** — AES-256 minimum
4. **Data residency controls** — keep data where regulators require

### Processing Layer

\`\`\`typescript
// Example: Automated compliance check
interface ComplianceCheck {
  regulation: 'SOX' | 'GDPR' | 'PCI-DSS';
  status: 'pass' | 'fail' | 'warning';
  timestamp: Date;
  details: string;
}

async function runComplianceChecks(
  transaction: Transaction
): Promise<ComplianceCheck[]> {
  const checks = await Promise.all([
    checkSOXCompliance(transaction),
    checkGDPRCompliance(transaction),
    checkPCIDSSCompliance(transaction),
  ]);
  return checks;
}
\`\`\`

### Reporting Layer

Automated compliance reporting should generate:

- **Daily transaction summaries** with flagged items
- **Monthly compliance scorecards** for each regulation
- **Quarterly audit packages** ready for external review

## Best Practices

> **Start compliant, stay compliant.** Retrofitting compliance into an existing system costs 10x more than building it in from the start.

1. Choose vendors with **SOC 2 Type II** certification
2. Implement **automated policy enforcement** — don't rely on humans
3. Schedule **quarterly security reviews** with external auditors
4. Maintain **living documentation** of your compliance posture

---

*FinanceFlow is SOC 2 Type II certified and built for compliance from day one. [Learn more about our security.](#)*`,
      coverImage: null,
      author: "Elena Rodriguez",
      status: "published",
    },
  ];

  const insertMany = sqlite.transaction(() => {
    for (const post of seedPosts) {
      insert.run(
        post.title,
        post.slug,
        post.excerpt,
        post.content,
        post.coverImage,
        post.author,
        post.status,
        now,
        now
      );
    }
  });

  insertMany();
  console.log("✅ Seeded 3 sample blog posts");
}

// ─── Seed default admin user if no users exist ───────────
const userCount = sqlite
  .prepare("SELECT COUNT(*) as count FROM cms_users")
  .get() as { count: number };

if (userCount.count === 0) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync("admin123", salt, 64).toString("hex");
  const passwordHash = `${salt}:${hash}`;
  const now = Math.floor(Date.now() / 1000);

  sqlite
    .prepare(
      "INSERT INTO cms_users (username, password_hash, created_at) VALUES (?, ?, ?)"
    )
    .run("admin", passwordHash, now);

  console.log("✅ Seeded default admin user (username: admin, password: admin123)");
}

console.log("✅ Database migration complete");
sqlite.close();
