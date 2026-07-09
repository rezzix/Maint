---
type: State/Section
title: Quickstart — running Maint locally
description: Dev/prod profiles, dev-mode seeder dataset, and quick-login card for running Maint
tags: [state, quickstart, runbook, dev, seeder]
timestamp: 2026-07-09
---

# Quickstart — running Maint locally

How to run Maint in development mode: Spring profiles, the auto-seeded dataset, and the dev quick-login card. This is the current runbook; the stable architecture lives in [System Architecture](/charter/architecture.md).

## Profiles & Environments

The application uses Spring Profiles (`dev` / `prod`) to switch between development and production configurations.

| Aspect | Dev (`dev`) | Prod (`prod`) |
|---|---|---|
| **Database** | H2 file-based (`backend/data/maint.mv.db`) | PostgreSQL 16 (Flyway migrations only) |
| **Seeder** | Enabled (once) — creates 3 tenants with rich test data across all modules | Disabled — no initial data |
| **Login** | Quick-login card: lists users grouped by tenant and role; single-click auto-login | Standard email+password form |
| **Redis** | Optional (can fall back to in-memory token store) | Required |
| **CORS** | Permissive (`*`) | Locked to frontend domain |
| **Logging** | `DEBUG` level, console output | `INFO` level, JSON to ELK |

### Seeder (Dev Mode)

```mermaid
flowchart LR
    A[Application starts] --> B{Profile = dev?}
    B -->|No| C[Skip seeder]
    B -->|Yes| D[Flyway runs migrations]
    D --> E[DatabaseCleaner clears stale data]
    E --> F[Create Tenant A<br/>slug: acme-prod]
    E --> G[Create Tenant B<br/>slug: globex-mfg]
    E --> H[Create Tenant C<br/>slug: initech-svc]
    F --> I[User: admin@acme + operator@acme + tech@acme]
    G --> J[User: admin@globex + manager@globex]
    H --> K[User: admin@initech]
    I --> L[Seed facilities: sites, buildings, zones]
    J --> L
    K --> L
    L --> M[Seed assets: pumps, motors, HVAC, conveyors]
    M --> N[Seed parts inventory, PM plans, work orders]
```

The three seeded tenants:

| Tenant | Slug | Users | Profile Data |
|---|---|---|---|---|
| ACME Production | `acme-prod` | admin, operator, tech, supervisor, engineer | 3 sites, 4 buildings, 6 zones, 6 floors, 5 categories, 22 assets, 18 WOs, 8 PM plans, 15 parts, 3 vendors, 4 POs, 3 technicians |
| Globex Manufacturing | `globex-mfg` | admin, manager, tech1, tech2 | 1 site, 2 buildings, 4 zones, 3 floors, 5 categories, 10 assets, 8 WOs, 4 PM plans, 8 parts, 2 vendors, 2 POs, 2 technicians |
| Initech Services | `initech-svc` | admin, tech | 1 site, 1 building, 2 zones, 2 floors, 5 categories, 6 assets, 4 WOs, 2 PM plans, 5 parts, 1 vendor, 1 PO, 1 technician |

### Quick-Login Card (Dev Mode)

In dev mode, the login page is replaced by a **quick-login card** component that displays all seeded users grouped by tenant and role:

```mermaid
flowchart TD
    A[GET /api/dev/users] --> B[Backend returns all users<br/>grouped by tenant + role]
    B --> C[Frontend renders cards]
    C --> D[User clicks a card]
    D --> E[POST /api/dev/login/{userId}]
    E --> F[Backend generates JWT + sets TenantContext]
    F --> G[Redirect to dashboard]

    subgraph Card Layout
        H[Tenant: ACME Production]
        I[Tenant: Globex Manufacturing]
        H --> J[Admin - admin@acme.com]
        H --> K[Operator - operator@acme.com]
        H --> L[Technician - tech@acme.com]
        I --> M[Admin - admin@globex.com]
        I --> N[Manager - manager@globex.com]
    end
```

