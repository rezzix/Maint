---
type: Architecture
title: System Architecture
description: Multi-tenant CMMS architecture — Vue 3 frontend, Spring Boot backend, shared-DB row-level isolation
tags: [architecture, multi-tenant, vuejs, spring-boot, jwt]
timestamp: 2026-07-02
---

# System Architecture

## Overview

Maint follows a **decoupled frontend/backend** architecture with a **RESTful API** layer. Multi-tenancy is achieved via **row-level isolation** using a shared database where every tenant-scoped table carries a `tenant_id` column.

```mermaid
graph TB
    subgraph Clients
        WB[Web Browser]
        MB[Mobile Browser]
    end

    subgraph CDN[CDN / Reverse Proxy]
        NX[Nginx]
    end

    subgraph Frontend[Vue.js 3 SPA]
        VUE[PrimeVue UI]
        PIN[Pinia Store]
        RT[Vue Router]
        AX[Axios HTTP Client]
    end

    subgraph Backend[Spring Boot Backend]
        GW[API Gateway / Spring Cloud Gateway]
        SEC[Spring Security + JWT Filter]
        CTX[TenantContext Filter]
        REST[REST Controllers]
        SVC[Service Layer]
        REP[JPA Repositories + TenantInterceptor]
    end

    subgraph Data[Data Layer]
        DB[(H2 / PostgreSQL)]
        REDIS[(Redis Cache)]
        MINIO[(MinIO / S3 - File Storage)]
    end

    subgraph Infra[Infrastructure]
        MON[Prometheus + Grafana]
        LOG[ELK Stack]
        MSG[RabbitMQ - Async Events]
    end

    WB --> NX
    MB --> NX
    NX --> VUE
    VUE --> PIN
    VUE --> RT
    VUE --> AX
    AX --> GW
    GW --> SEC
    SEC --> CTX
    CTX --> REST
    REST --> SVC
    SVC --> REP
    SVC --> MSG
    REP --> DB
    SVC --> REDIS
    SVC --> MINIO
    MSG --> MON
    MSG --> LOG
```

## Multi-Tenancy Strategy

| Concern | Approach |
|---|---|
| **Data isolation** | Row-level — every tenant-scoped table includes `tenant_id` |
| **Tenant resolution** | `X-Tenant-Id` header injected by Nginx or frontend; resolved by `TenantContextFilter` |
| **Persistence** | Hibernate `@TenantId` annotation + custom `TenantInterceptor` on every write/read |
| **Schema** | Single schema, shared tables |
| **Onboarding** | Tenant record created => DB row inserted => default admin user + roles provisioned |

```mermaid
flowchart LR
    subgraph Frontend SPA
        A[User Login] --> B[Store JWT + Tenant in Pinia]
    end
    subgraph Backend
        B --> C[Request interceptor adds<br/>Authorization + X-Tenant-Id]
        C --> D[JWT Filter validates token]
        D --> E[TenantContextFilter sets TenantContext]
        E --> F[Controller processes request]
        F --> G[Service Layer]
        G --> H[Repository with @TenantId filter]
        H --> I[(H2 / PostgreSQL)]
    end
```

## Technology Stack

### Frontend

| Layer | Technology |
|---|---|
| Framework | Vue.js 3 (Composition API, `<script setup>`) |
| Language | TypeScript |
| UI Library | PrimeVue 4 |
| State | Pinia |
| Routing | Vue Router 4 |
| HTTP | Axios |
| Build | Vite |
| Testing | Vitest + Vue Test Utils |

### Backend

| Layer | Technology |
|---|---|
| Framework | Spring Boot 3.x |
| Language | Java 21 |
| Security | Spring Security + JWT (jjwt) |
| ORM | Spring Data JPA / Hibernate 6 |
| DB Migrations | Flyway |
| Validation | Jakarta Bean Validation |
| API Docs | SpringDoc OpenAPI (Swagger) |
| Messaging | RabbitMQ / Spring AMQP |
| Testing | JUnit 5 + Testcontainers |
| Build | Gradle (multi-module) |

### Data

| Store | Dev (`application-dev.yml`) | Prod (`application-prod.yml`) | Purpose |
|---|---|---|---|
| H2 (file-based) | `jdbc:h2:file:./data/maint` | — | Dev-only; persisted to `backend/data/maint.mv.db`; auto-seeded once |
| PostgreSQL 16 | — | `jdbc:postgresql://${DB_HOST}:5432/maint` | Prod relational data |
| Redis 7 | — | `redis://${REDIS_HOST}:6379` | Token blacklist, cache, rate-limiting |
| MinIO | Optional (local filesystem fallback) | `https://${MINIO_HOST}:9000` | File attachments (work order images, reports) |

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

## Frontend Architecture

```mermaid
graph TB
    subgraph Vue3[Vue.js 3 Application]
        A[App.vue] --> R[Router View]
        R --> L[Layout Components<br/>AppLayout, Sidebar, Topbar]
        L --> P[Page Components<br/>one per route]
        P --> C[Reusable Components<br/>DataTable, Dialog, Form]

        subgraph State[Pinia Stores]
            S1[Auth Store]
            S2[Tenant Store]
            S3[Module-specific Stores]
        end

        subgraph Services[API Services]
            API[Axios Instance]
            INT[Interceptors:
            JWT injection,
            Tenant header,
            Error handling]
        end

        P --> State
        P --> Services
    end
```

## Backend Architecture

```mermaid
graph TB
    subgraph Modules[Multi-Module Gradle Project]
        GW[api-gateway]
        CORE[core]
        TM[tenant-management]
        UM[user-management]
        FM[facility-management]
        AM[asset-management]
        WO[work-order-management]
        PM[preventive-maintenance]
        IM[inventory-management]
        PR[purchasing]
        VM[vendor-management]
        LM[labor-management]
        RM[reporting]
        AC[audit-compliance]
    end

    subgraph Common[Shared Libraries]
        SEC[spring-security-starter]
        TEN[tenant-starter]
        FILE[file-storage-starter]
        NOTIF[notification-starter]
    end

    CORE --> SEC
    CORE --> TEN
    CORE --> FILE
    CORE --> NOTIF
    GW --> CORE
    TM --> CORE
    UM --> CORE
    FM --> CORE
    AM --> CORE
    WO --> CORE
    PM --> CORE
    IM --> CORE
    PR --> CORE
    VM --> CORE
    LM --> CORE
    RM --> CORE
    AC --> CORE
```

## Security Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as Database

    U->>F: Login (email + password)
    F->>B: POST /api/auth/login
    B->>DB: Validate credentials
    DB-->>B: User + Role + Tenant
    B-->>F: { accessToken, refreshToken, tenantId }
    F->>F: Store tokens in httpOnly cookie + Pinia
    Note over F: Every subsequent request
    F->>B: GET /api/work-orders<br/>Authorization: Bearer jwt<br/>X-Tenant-Id: tenant123
    B->>B: JWT Filter → validate token
    B->>B: TenantContextFilter → set TenantContext
    B->>B: Controller → Service → Repository
    B->>DB: SELECT ... WHERE tenant_id = :tenantId
    DB-->>B: Scoped results
    B-->>F: 200 OK
```

## Cross-Cutting Concerns

| Concern | Implementation |
|---|---|
| Logging | SLF4j + Logback; structured JSON logs shipped to ELK |
| Caching | Spring Cache + Redis; cache keys include tenant_id |
| File Storage | Spring Resource abstraction; MinIO adapter |
| Notifications | RabbitMQ → email/push adapters |
| Audit | Hibernate Envers + custom AuditLog entity |
| Error Handling | `@ControllerAdvice` → unified error response |
| API Versioning | URL path prefix `/api/v1/` |
| Rate Limiting | Bucket4j + Redis |
