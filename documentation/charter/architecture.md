---
type: Charter/Architecture
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

## Running Maint

Running Maint locally — dev/prod profiles, the dev-mode seeder, and the quick-login card — is documented in [Quickstart](/state/quickstart.md).

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
