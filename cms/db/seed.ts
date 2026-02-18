import path from "path";
import fs from "fs";
import crypto from "crypto";
import * as schema from "./schema";

// ─── Password hashing (mirroring lib/auth.ts) ───────────
const SALT_LENGTH = 16;
const KEY_LENGTH = 64;

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");
  const hash = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${hash}`;
}

// ─── Database connection (supports local SQLite + remote Turso) ──
async function createSeedDb() {
  const databaseUrl = process.env.DATABASE_URL;
  const isRemote = databaseUrl && !databaseUrl.startsWith("file:");

  if (isRemote) {
    // Production: use libSQL / Turso
    const { createClient } = await import("@libsql/client");
    const { drizzle } = await import("drizzle-orm/libsql");
    const client = createClient({
      url: databaseUrl,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    });
    console.log(`🌐 Connected to remote Turso database`);
    return { db: drizzle(client, { schema }), client, type: "turso" as const };
  }

  // Local: use better-sqlite3
  const Database = (await import("better-sqlite3")).default;
  const { drizzle } = await import("drizzle-orm/better-sqlite3");

  const dataDir = path.join(__dirname, "..", "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log("✅ Created cms/data directory");
  }

  const dbPath = path.join(dataDir, "blog.db");
  const sqlite = new Database(dbPath);
  sqlite.pragma("journal_mode = WAL");
  console.log(`💾 Connected to local SQLite: ${dbPath}`);
  return { db: drizzle(sqlite, { schema }), sqlite, type: "local" as const };
}

// ─── SQL statements for table creation ───────────────────
const CREATE_TABLES_SQL = [
  `CREATE TABLE IF NOT EXISTS posts (
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
  )`,
  `CREATE TABLE IF NOT EXISTS cms_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS cms_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT NOT NULL UNIQUE,
    user_id INTEGER NOT NULL REFERENCES cms_users(id),
    expires_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL
  )`,
];

// ─── Sample blog posts ───────────────────────────────────
const samplePosts = [
  {
    title: "Getting Started with Financial Analytics",
    slug: "getting-started-financial-analytics",
    excerpt:
      "Learn how modern financial analytics can transform your business decision-making process with real-time data insights.",
    content: `# Getting Started with Financial Analytics

Financial analytics is the cornerstone of modern business strategy. In this guide, we explore how companies leverage data-driven insights to make smarter decisions.

## Why Financial Analytics Matters

In today's fast-paced markets, having access to real-time financial data isn't just a luxury — it's a necessity. Companies that embrace analytics see:

- **30% faster** decision-making processes
- **25% improvement** in forecasting accuracy
- **40% reduction** in operational risks

## Key Components

1. **Data Collection** — Aggregating financial data from multiple sources
2. **Real-time Processing** — Analyzing data as it flows in
3. **Visualization** — Presenting insights in actionable dashboards
4. **Predictive Models** — Forecasting future trends with machine learning

## Getting Started

The first step is auditing your current data infrastructure. Identify gaps in your data pipelines and prioritize the metrics that matter most to your stakeholders.

Stay tuned for our next article on building custom dashboards.`,
    author: "Sarah Chen",
    status: "published" as const,
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
  },
  {
    title: "The Future of RegTech: Compliance Automation",
    slug: "future-regtech-compliance-automation",
    excerpt:
      "Discover how regulatory technology is reshaping compliance workflows and reducing costs for financial institutions.",
    content: `# The Future of RegTech: Compliance Automation

Regulatory technology (RegTech) is revolutionizing how financial institutions handle compliance. With increasing regulatory complexity, automation is no longer optional.

## The Compliance Challenge

Financial institutions face an ever-growing web of regulations. Manual compliance processes are:

- **Expensive** — Compliance costs have risen 60% in the past decade
- **Error-prone** — Human error accounts for 70% of compliance failures
- **Slow** — Manual reviews can take weeks or months

## How RegTech Solves This

Modern RegTech solutions leverage AI and machine learning to automate:

- **KYC/AML screening** — Automated identity verification and risk assessment
- **Transaction monitoring** — Real-time flagging of suspicious activities
- **Regulatory reporting** — Automated generation of compliance reports
- **Policy management** — Dynamic updates as regulations change

## Implementation Best Practices

1. Start with a compliance audit
2. Identify high-impact, repetitive processes
3. Choose solutions that integrate with existing systems
4. Measure and iterate

The future of compliance is automated, intelligent, and proactive.`,
    author: "Marcus Johnson",
    status: "published" as const,
    coverImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
  },
  {
    title: "Building Resilient API-First Financial Platforms",
    slug: "building-resilient-api-first-platforms",
    excerpt:
      "An in-depth look at designing API-first architectures for scalable and secure financial applications.",
    content: `# Building Resilient API-First Financial Platforms

API-first design has become the gold standard for modern financial platforms. Here's why — and how to do it right.

## Why API-First?

Traditional monolithic architectures struggle to keep pace with modern financial demands. API-first design offers:

- **Scalability** — Independently scale different services
- **Flexibility** — Easily integrate with partners and third parties
- **Speed** — Faster development cycles and time-to-market
- **Security** — Granular access controls and monitoring

## Architecture Principles

### 1. Design for Failure
Every API call can fail. Build in retries, circuit breakers, and graceful degradation.

### 2. Versioning Strategy
Use semantic versioning and maintain backward compatibility. Never break existing integrations.

### 3. Security First
- OAuth 2.0 / OpenID Connect for authentication
- Rate limiting and throttling
- End-to-end encryption
- Comprehensive audit logging

### 4. Observability
Implement distributed tracing, structured logging, and real-time alerting.

## Conclusion

An API-first approach is not just a technical choice — it's a business strategy that enables agility and innovation.`,
    author: "Alex Rivera",
    status: "published" as const,
    coverImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200",
  },
  {
    title: "Risk Management in the Age of AI",
    slug: "risk-management-age-of-ai",
    excerpt:
      "How artificial intelligence is transforming risk assessment and mitigation strategies in the financial sector.",
    content: `# Risk Management in the Age of AI

Artificial intelligence is fundamentally changing how financial institutions identify, assess, and mitigate risk.

## Traditional vs. AI-Driven Risk Management

| Aspect | Traditional | AI-Driven |
|--------|-----------|-----------|
| Speed | Days/weeks | Real-time |
| Accuracy | ~70% | ~95% |
| Scalability | Limited | Unlimited |
| Cost | High | Decreasing |

## Key AI Applications

### Credit Risk
Machine learning models analyze thousands of variables to predict default probability far more accurately than traditional scorecards.

### Market Risk
Deep learning models process market data, news, and social sentiment to forecast volatility and potential crashes.

### Operational Risk
NLP-powered systems analyze internal communications and processes to identify emerging operational risks.

## Challenges to Consider

- **Model explainability** — Regulators require transparent decision-making
- **Data quality** — AI is only as good as its training data
- **Bias** — Models can perpetuate historical biases
- **Cybersecurity** — AI systems are themselves targets

## The Path Forward

The key is combining AI capabilities with human expertise. The best risk management frameworks use AI for detection and analysis while keeping humans in the decision loop.`,
    author: "Dr. Lisa Wang",
    status: "published" as const,
    coverImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200",
  },
  {
    title: "Understanding Blockchain in Enterprise Finance",
    slug: "understanding-blockchain-enterprise-finance",
    excerpt:
      "A practical guide to blockchain adoption in enterprise finance — beyond the hype, what actually works.",
    content: `# Understanding Blockchain in Enterprise Finance

Blockchain technology has moved beyond cryptocurrency hype into practical enterprise applications. Here's what finance leaders need to know.

## Real-World Use Cases

### Cross-Border Payments
Blockchain reduces settlement times from days to minutes while cutting costs by up to 40%.

### Trade Finance
Smart contracts automate letter of credit processes, reducing paperwork and fraud risk.

### Asset Tokenization
Real-world assets can be tokenized for fractional ownership and 24/7 trading.

## What's Working Today

- **Ripple/XRP** for institutional cross-border payments
- **JPM Coin** for intra-bank settlements
- **Marco Polo Network** for trade finance
- **Securitize** for digital securities

## Implementation Considerations

1. Identify processes with high friction and low trust
2. Start with permissioned blockchains for regulatory compliance
3. Plan for interoperability with legacy systems
4. Build internal expertise before scaling

## Looking Ahead

Enterprise blockchain is entering its pragmatic phase. The winners will be organizations that focus on specific, high-value use cases rather than trying to blockchain everything.`,
    author: "James Park",
    status: "draft" as const,
    coverImage:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200",
  },
];

// ─── Main seed function ─────────────────────────────────
async function seed() {
  const connection = await createSeedDb();
  const { db } = connection;

  // ─── Create tables ──────────────────────────────────────
  console.log("🔧 Creating tables...");

  if (connection.type === "local") {
    for (const sql of CREATE_TABLES_SQL) {
      connection.sqlite.exec(sql);
    }
  } else {
    for (const sql of CREATE_TABLES_SQL) {
      await connection.client.execute(sql);
    }
  }
  console.log("✅ Tables created");

  // ─── Seed admin user ────────────────────────────────────
  const existingUsers = await db
    .select()
    .from(schema.cmsUsers);

  if (existingUsers.length === 0) {
    const passwordHash = hashPassword("admin123");
    await db.insert(schema.cmsUsers).values({
      username: "admin",
      passwordHash,
    });
    console.log("✅ Admin user created (username: admin, password: admin123)");
  } else {
    console.log("⏭️  Admin user already exists, skipping");
  }

  // ─── Seed sample blog posts ─────────────────────────────
  const existingPosts = await db
    .select()
    .from(schema.posts);

  if (existingPosts.length === 0) {
    for (const post of samplePosts) {
      await db.insert(schema.posts).values(post);
    }
    console.log(`✅ ${samplePosts.length} sample blog posts created`);
  } else {
    console.log(`⏭️  ${existingPosts.length} posts already exist, skipping`);
  }

  // ─── Cleanup ────────────────────────────────────────────
  if (connection.type === "local") {
    connection.sqlite.close();
  }

  console.log("\n🎉 Seed completed successfully!");
  console.log("────────────────────────────────────────");
  console.log("  CMS Login Credentials:");
  console.log("  Username: admin");
  console.log("  Password: admin123");
  console.log("────────────────────────────────────────");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
