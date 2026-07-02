---
type: Specification
title: User & Role Management Module
description: Authentication, role-based access control, user lifecycle management
tags: [spec, user, role, auth, rbac]
timestamp: 2026-07-02
---

# User & Role Management

## Overview

Manages users within each tenant. Implements **RBAC** (Role-Based Access Control) with fine-grained permissions. Authentication uses **JWT** with access + refresh token flow.

## Entity Relationship Diagram

```mermaid
erDiagram
    User {
        uuid id PK
        uuid tenant_id FK
        string email UK
        string password_hash
        string first_name
        string last_name
        string phone
        string avatar_url
        string job_title
        string status "active | inactive | locked"
        boolean email_verified
        boolean mfa_enabled
        timestamp last_login_at
        timestamp password_changed_at
        timestamp created_at
        timestamp updated_at
    }

    Role {
        uuid id PK
        uuid tenant_id FK
        string name
        string description
        boolean is_system
        timestamp created_at
    }

    Permission {
        uuid id PK
        string code UK
        string name
        string module
        string action "create | read | update | delete | approve | export"
    }

    UserRole {
        uuid user_id FK
        uuid role_id FK
        uuid tenant_id FK
        timestamp assigned_at
        uuid assigned_by
    }

    RolePermission {
        uuid role_id FK
        uuid permission_id FK
        uuid tenant_id FK
    }

    Tenant {
        uuid id PK
        string slug
    }

    User }o--|| Tenant : "belongs to"
    Role }o--|| Tenant : "belongs to"
    UserRole }o--|| User : ""
    UserRole }o--|| Role : ""
    RolePermission }o--|| Role : ""
    RolePermission }o--|| Permission : ""
```

## Authentication Flow (Activity)

```mermaid
flowchart TD
    A[User enters email + password] --> B{Validate input}
    B -->|Invalid| C[Return validation error]
    B -->|Valid| D[Find user by email]
    D --> E{User exists?}
    E -->|No| F[Return 401 Unauthorized]
    E -->|Yes| G{Account active?}
    G -->|Inactive/Locked| H[Return 403 Forbidden]
    G -->|Active| I[Verify password hash]
    I --> J{Password correct?}
    J -->|No| K[Increment failed attempts]
    K --> L{Failed > 5?}
    L -->|Yes| M[Lock account]
    L -->|No| F
    J -->|Yes| N[Reset failed attempts]
    N --> O[Generate accessToken + refreshToken]
    O --> P[Store refreshToken in Redis]
    P --> Q[Return tokens + user profile]
```

## Dev-Mode Quick Login

In dev mode, the standard login form is replaced by a **quick-login card**. The frontend fetches all seeded users grouped by tenant and role, renders them as clickable cards, and auto-login is performed on click — bypassing password entry.

```mermaid
sequenceDiagram
    participant U as Developer
    participant F as Frontend
    participant B as Backend (Dev)

    Note over F: Login page loads
    F->>B: GET /api/dev/users
    B-->>F: [ { tenant, role, users } ]
    F->>F: Render quick-login cards<br/>grouped by tenant > role

    U->>F: Click "admin@acme.com"
    F->>B: POST /api/dev/login/{userId}
    Note over B: Bypass password check —<br/>auto-generate JWT
    B-->>F: { accessToken, refreshToken, tenantId, user }
    F->>F: Store tokens + tenant in Pinia
    F->>F: Redirect to /dashboard
```

```mermaid
flowchart TD
    A[Login page mounted] --> B[GET /api/dev/users]
    B --> C[Group by tenant → role → user]
    C --> D[Render PrimeVue CardGrid]
    D --> E[User clicks card]

    subgraph Card UI
        F[Tenant: ACME Production]
        G[Tenant: Globex Manufacturing]
        F --> H[⚙ Admin: admin@acme.com]
        F --> I[👁 Operator: operator@acme.com]
        F --> J[🔧 Tech: tech@acme.com]
        G --> K[⚙ Admin: admin@globex.com]
    end

    E --> L[POST /api/dev/login/{userId}]
    L --> M[JWT issued → redirect to dashboard]
```

### Dev Login Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/dev/users` | List all seeded users grouped by tenant + role |
| POST | `/api/dev/login/{userId}` | Auto-login as user (no password) |

## RBAC Enforcement

```mermaid
flowchart LR
    R[HTTP Request] --> F[JWT Filter]
    F --> C[Controller]
    C --> S[Service Layer]
    S --> G{@PreAuthorize<br/>hasPermission?}
    G -->|Yes| D[Execute]
    G -->|No| E[403 Forbidden]
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/auth/login` | Authenticate |
| POST | `/api/v1/auth/refresh` | Refresh token |
| POST | `/api/v1/auth/logout` | Invalidate tokens |
| GET | `/api/v1/users` | List users (tenant-scoped) |
| POST | `/api/v1/users` | Create user |
| PUT | `/api/v1/users/{id}` | Update user |
| GET | `/api/v1/roles` | List roles |
| POST | `/api/v1/roles` | Create role with permissions |
| PUT | `/api/v1/roles/{id}/permissions` | Assign permissions |
