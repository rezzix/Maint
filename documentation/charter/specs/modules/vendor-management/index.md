---
type: Charter/Specification
title: Vendor Management Module
description: Supplier profiles, contracts, performance ratings, and contact management
tags: [spec, vendor, supplier, contract, rating]
timestamp: 2026-07-02
---

# Vendor Management

## Overview

Manages supplier relationships including company profiles, service contracts, contact persons, and performance scorecards.

## Entity Relationship Diagram

```mermaid
erDiagram
    Vendor {
        uuid id PK
        uuid tenant_id FK
        string name
        string code UK
        string tax_id
        string website
        string status "active | inactive | blacklisted"
        string category "supplier | contractor | consultant | manufacturer"
        decimal credit_limit
        int payment_terms_days
        string currency
        timestamp created_at
        timestamp updated_at
    }

    VendorContact {
        uuid id PK
        uuid vendor_id FK
        uuid tenant_id FK
        string first_name
        string last_name
        string email
        string phone
        string job_title
        boolean is_primary
        string department
    }

    VendorContract {
        uuid id PK
        uuid vendor_id FK
        uuid tenant_id FK
        string title
        string contract_number
        date start_date
        date end_date
        decimal contract_value
        string status "active | expired | terminated | renewal_pending"
        string terms_url
        string scope_of_work
    }

    VendorRating {
        uuid id PK
        uuid vendor_id FK
        uuid tenant_id FK
        uuid work_order_id FK "nullable"
        int quality_score "1-5"
        int delivery_score "1-5"
        int cost_score "1-5"
        int responsiveness_score "1-5"
        string comments
        uuid rated_by
        timestamp created_at
    }

    VendorService {
        uuid id PK
        uuid vendor_id FK
        uuid tenant_id FK
        string service_name
        string category
        decimal hourly_rate
        string region
        string certifications_required
    }

    Vendor ||--o{ VendorContact : "has"
    Vendor ||--o{ VendorContract : "signs"
    Vendor ||--o{ VendorRating : "rated by"
    Vendor ||--o{ VendorService : "offers"
```

## State Machine (Vendor Contract)

```mermaid
stateDiagram-v2
    [*] --> Draft : being negotiated
    Draft --> Active : signed
    Active --> Expired : end_date reached
    Active --> Terminated : cancelled early
    Active --> RenewalPending : within 30 days of expiry
    RenewalPending --> Active : renewal signed
    RenewalPending --> Expired : not renewed
    Expired --> [*]
    Terminated --> [*]
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/vendors` | List vendors |
| POST | `/api/v1/vendors` | Create vendor |
| GET | `/api/v1/vendors/{id}` | Get vendor with contracts |
| PUT | `/api/v1/vendors/{id}` | Update vendor |
| POST | `/api/v1/vendors/{id}/contacts` | Add contact |
| POST | `/api/v1/vendors/{id}/contracts` | Add contract |
| POST | `/api/v1/vendors/{id}/ratings` | Submit rating |
| GET | `/api/v1/vendors/{id}/scorecard` | Average scores |
