# Full Stack Wallet, Exchange Application

This holds the api, website, admin and mobile applications.

## Prerequisites

- Node.js ≥ 20
- Docker
- Docker Compose
- pnpm

Verify:

```bash
node -v
docker -v
docker compose version
pnpm -v
```

---

## Installation

Run the following command:

```sh
git clone <repository-url>
```

```sh
pnpm install
```

Install dependencies:

```bash
cd apps/api

npx prisma migrate deploy

npx prisma db seed
```

# Environment Variables

Backend environment:

`apps/api/`

```bash
cp .env.example .env
```

Frontend environment:

`apps/web/`

```bash
cp .env.example .env
```

---

# Running PostgreSQL Locally

Start PostgreSQL:

```bash
docker compose up -d postgres
```

Verify:

```bash
docker ps
```

Stop:

```bash
docker compose down
```

Remove volume:

```bash
docker compose down -v
```

# Start Applications

All Applications:

```bash
pnpm turbo run dev
```

Backend:

```bash
pnpm --filter=api turbo run dev
```

Runs on:

```bash
http://localhost:3004
```

Frontend:

```bash
pnpm --filter=web turbo run dev
```

Runs on:

```bash
http://localhost:3000
```
