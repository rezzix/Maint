---
type: Charter/Specification
title: Tenant Management Module
description: Multi-tenant lifecycle management — onboarding, subscription, isolation configuration
tags: [spec, tenant, multi-tenant]
timestamp: 2026-07-02
---

# Tenant Management

## Overview

Manages the lifecycle of organizational tenants. Each tenant represents an independent organization using the system. Tenants are isolated via row-level `tenant_id` on all domain tables.

## Entity Relationship Diagram

```mermaid
erDiagram
    Tenant {
        uuid id PK
        string name
        string slug UK
        string domain
        string logo_url
        string status "active | suspended | trial | expired"
        string tier "free | standard | enterprise"
        int max_users
        int max_assets
        jsonb settings
        timestamp created_at
        timestamp updated_at
    }

    TenantConfig {
        uuid id PK
        uuid tenant_id FK
        string timezone
        string date_format
        string currency
        string language
        jsonb email_config
        jsonb security_policy
        boolean allow_self_registration
        timestamp updated_at
    }

    TenantSubscription {
        uuid id PK
        uuid tenant_id FK
        string plan_code
        date start_date
        date end_date
        string billing_cycle "monthly | yearly"
        decimal amount
        string status "active | cancelled | past_due"
        timestamp created_at
        timestamp updated_at
    }

    Tenant ||--|| TenantConfig : "config"
    Tenant ||--o{ TenantSubscription : "subscriptions"
```

## State Machine

```mermaid
stateDiagram-v2
    [*] --> Trial : register / provision
    Trial --> Active : subscribe / admin confirms
    Trial --> Expired : trial period ends
    Active --> Suspended : payment fails / admin action
    Active --> Expired : subscription ends
    Active --> Trial : downgrade from paid
    Suspended --> Active : payment resolved
    Suspended --> Expired : prolonged suspension
    Expired --> [*] : data retention period passes / hard delete

    note right of Trial
        Default 14-day trial.
        Automatic provisioning of
        admin user + demo data.
    end note

    note right of Suspended
        Read-only access for
        tenant users. New
        writes blocked.
    end note
```

## Dev-Mode Seeding

In dev mode (`spring.profiles.active=dev`), the `DatabaseSeeder` runs on startup and creates three tenants with full demo data:

| Tenant | Slug | Domain | Tier | Users |
|---|---|---|---|---|
| ACME Production | `acme-prod` | acme.example.com | enterprise | admin, operator, technician |
| Globex Manufacturing | `globex-mfg` | globex.example.com | standard | admin, manager |
| Initech Services | `initech-svc` | initech.example.com | standard | admin |

Each tenant is provisioned with:
- `TenantConfig` (timezone, currency, language)
- A `TenantSubscription` with `active` status
- A full facility hierarchy (site → building → zone → floor)
- Assets, parts inventory, PM plans, and work orders

The seeder is **disabled** in prod mode — the `@Profile("dev")` annotation on `DatabaseSeeder` ensures no accidental seeding in production.

## API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/tenants` | Register new tenant |
| GET | `/api/v1/tenants/{id}` | Get tenant details |
| PUT | `/api/v1/tenants/{id}` | Update tenant config |
| PATCH | `/api/v1/tenants/{id}/status` | Change tenant status |
| GET | `/api/v1/tenants/{id}/usage` | Get usage metrics |
