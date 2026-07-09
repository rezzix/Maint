---
type: Charter/Specification
title: Asset Management Module
description: Equipment and machinery lifecycle tracking — categorization, attributes, maintenance history
tags: [spec, asset, equipment, lifecycle]
timestamp: 2026-07-02
---

# Asset Management

## Overview

Central register of all equipment and machinery. Tracks location, category, technical attributes, maintenance history, and lifecycle status.

## Entity Relationship Diagram

```mermaid
erDiagram
    AssetCategory {
        uuid id PK
        uuid tenant_id FK
        uuid parent_id FK
        string name
        string code
        string description
        jsonb schema_definition
        timestamp created_at
    }

    Asset {
        uuid id PK
        uuid tenant_id FK
        uuid category_id FK
        uuid site_id FK
        uuid building_id FK
        uuid zone_id FK
        uuid floor_id FK
        uuid assigned_to FK "technician"
        string name
        string asset_tag UK
        string serial_number
        string manufacturer
        string model
        int year_manufactured
        date purchase_date
        decimal purchase_cost
        decimal current_value
        date warranty_expiry
        string status "operational | under-maintenance | broken | retired"
        string criticality "low | medium | high | critical"
        string image_url
        jsonb custom_attributes
        timestamp created_at
        timestamp updated_at
    }

    AssetHistory {
        uuid id PK
        uuid asset_id FK
        uuid tenant_id FK
        string event_type "status_change | location_change | maintenance | calibration"
        string description
        jsonb previous_values
        jsonb new_values
        uuid changed_by
        timestamp created_at
    }

    AssetDocument {
        uuid id PK
        uuid asset_id FK
        uuid tenant_id FK
        string title
        string document_type "manual | certificate | drawing | warranty"
        string file_url
        timestamp uploaded_at
    }

    AssetCategory ||--o{ AssetCategory : "parent"
    AssetCategory ||--o{ Asset : "categorizes"
    Asset ||--o{ AssetHistory : "has"
    Asset ||--o{ AssetDocument : "has"
    Asset }o--|| Site : "located at"
```

## State Machine

```mermaid
stateDiagram-v2
    [*] --> Operational : registered / purchased
    Operational --> UnderMaintenance : work order started
    Operational --> Broken : failure reported
    UnderMaintenance --> Operational : maintenance completed
    UnderMaintenance --> Broken : failure during service
    Broken --> UnderMaintenance : repair initiated
    Broken --> Retired : beyond economical repair
    UnderMaintenance --> Retired : decommissioned
    Operational --> Retired : end of life
    Retired --> [*]

    note right of Operational
        Asset is available for
        use and scheduled PM.
    end note

    note right of Broken
        Triggers corrective
        work order creation.
    end note
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/assets` | List assets (filterable) |
| POST | `/api/v1/assets` | Register asset |
| GET | `/api/v1/assets/{id}` | Get asset detail + history |
| PUT | `/api/v1/assets/{id}` | Update asset |
| PATCH | `/api/v1/assets/{id}/status` | Change status |
| GET | `/api/v1/assets/{id}/history` | Get asset history |
| GET | `/api/v1/asset-categories` | List categories (tree) |
| POST | `/api/v1/asset-categories` | Create category |
