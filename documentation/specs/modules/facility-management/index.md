---
type: Specification
title: Facility Management Module
description: Hierarchical facility structure — sites, buildings, zones, floors
tags: [spec, facility, site, location]
timestamp: 2026-07-02
---

# Facility Management

## Overview

Defines the physical location hierarchy where assets reside and work is performed. Supports a tree structure: **Site → Building → Zone → Floor**.

## Entity Relationship Diagram

```mermaid
erDiagram
    Site {
        uuid id PK
        uuid tenant_id FK
        string name
        string code UK
        string address_line1
        string address_line2
        string city
        string state
        string postal_code
        string country
        decimal latitude
        decimal longitude
        string status "active | inactive | decommissioned"
        timestamp created_at
    }

    Building {
        uuid id PK
        uuid site_id FK
        uuid tenant_id FK
        string name
        string code
        int total_floors
        decimal area_sqft
        string type "office | warehouse | lab | production"
        timestamp created_at
    }

    Zone {
        uuid id PK
        uuid building_id FK
        uuid tenant_id FK
        string name
        string code
        string category "storage | production | office | lab | restricted"
        string safety_requirements
        timestamp created_at
    }

    Floor {
        uuid id PK
        uuid building_id FK
        uuid tenant_id FK
        int floor_number
        string name
        decimal area_sqft
        string blueprint_url
        timestamp created_at
    }

    Site ||--o{ Building : "contains"
    Building ||--o{ Zone : "contains"
    Building ||--o{ Floor : "has"
```

## State Machine

```mermaid
stateDiagram-v2
    [*] --> Planning : site created
    Planning --> Active : construction / setup complete
    Active --> Inactive : temporarily closed
    Inactive --> Active : re-opened
    Active --> Decommissioned : permanently closed
    Inactive --> Decommissioned : permanently closed
    Decommissioned --> [*]

    note right of Active
        Assets can be assigned
        to active facilities only.
    end note
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/sites` | List sites |
| POST | `/api/v1/sites` | Create site |
| GET | `/api/v1/sites/{id}/buildings` | List buildings in site |
| POST | `/api/v1/buildings` | Create building |
| GET | `/api/v1/buildings/{id}/zones` | List zones |
| GET | `/api/v1/buildings/{id}/floors` | List floors |
