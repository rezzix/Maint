---
type: Specification
title: Inventory Management Module
description: Spare parts and consumables management — stock levels, transactions, reorder points
tags: [spec, inventory, parts, stock, warehouse]
timestamp: 2026-07-02
---

# Inventory Management

## Overview

Manages spare parts inventory across multiple warehouses. Tracks stock levels, transactions (receipt, issue, transfer, adjustment), and reorder thresholds.

## Entity Relationship Diagram

```mermaid
erDiagram
    Warehouse {
        uuid id PK
        uuid tenant_id FK
        uuid site_id FK
        string name
        string code
        string type "central | satellite | mobile"
        string location_description
        string status "active | inactive"
        timestamp created_at
    }

    Part {
        uuid id PK
        uuid tenant_id FK
        string name
        string part_number UK
        string sku UK
        string description
        string unit_of_measure "each | kg | liter | meter"
        decimal unit_cost
        decimal selling_price
        string category
        string manufacturer
        string manufacturer_part_number
        string image_url
        string status "active | discontinued | obsolete"
        boolean is_serialized
        boolean is_consumable
        jsonb specifications
        timestamp created_at
        timestamp updated_at
    }

    StockLevel {
        uuid id PK
        uuid part_id FK
        uuid warehouse_id FK
        uuid tenant_id FK
        int quantity_on_hand
        int quantity_reserved
        int quantity_available
        int reorder_point
        int reorder_quantity
        string bin_location
        timestamp last_counted_at
    }

    InventoryTransaction {
        uuid id PK
        uuid part_id FK
        uuid warehouse_id FK
        uuid stock_level_id FK
        uuid tenant_id FK
        uuid reference_id "work_order_id / po_id"
        string transaction_type "receipt | issue | transfer-out | transfer-in | adjustment | return"
        int quantity
        decimal unit_cost
        string reason
        uuid performed_by
        timestamp created_at
    }

    PartSupplier {
        uuid part_id FK
        uuid vendor_id FK
        uuid tenant_id FK
        string vendor_part_number
        decimal unit_cost
        int lead_time_days
        boolean is_preferred
    }

    Warehouse ||--o{ StockLevel : "contains"
    Part ||--o{ StockLevel : "stocked as"
    Part ||--o{ InventoryTransaction : "transaction history"
    Part ||--o{ PartSupplier : "sourced from"
    StockLevel ||--o{ InventoryTransaction : "movements"
```

## State Machine (Part)

```mermaid
stateDiagram-v2
    [*] --> Active : created
    Active --> Discontinued : no longer sourced
    Active --> Obsolete : replaced by newer part
    Discontinued --> Active : re-sourced
    Discontinued --> Obsolete : stock depleted
    Obsolete --> [*]

    note right of Active
        Available for use in
        work orders and
        purchase orders.
    end note
```

## Activity Diagram (Stock Movement)

```mermaid
flowchart TD
    A[Transaction triggered] --> B{Type?}
    B -->|Receipt| C[PO received]
    C --> D[Inspect & count]
    D --> E[Update StockLevel +<br/>create receipt tx]
    E --> F[Update part cost<br/>if changed]

    B -->|Issue| G[Work Order requests parts]
    G --> H[Check StockLevel]
    H --> I{Available >= qty?}
    I -->|Yes| J[Reduce quantity_on_hand]
    J --> K[Create issue tx]
    I -->|No| L[Partial issue or reject]

    B -->|Transfer| M[From Warehouse A → B]
    M --> N[Reduce stock at A]
    N --> O[Increase stock at B]
    O --> P[Create transfer-out + transfer-in txs]

    B -->|Adjustment| Q[Physical count differs]
    Q --> R[Correct StockLevel]
    R --> S[Create adjustment tx<br/>with reason]
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/parts` | List parts |
| POST | `/api/v1/parts` | Create part |
| GET | `/api/v1/parts/{id}/stock` | Stock across warehouses |
| POST | `/api/v1/inventory/transaction` | Record transaction |
| GET | `/api/v1/inventory/transactions` | Transaction history |
| GET | `/api/v1/inventory/low-stock` | Parts below reorder point |
| POST | `/api/v1/inventory/count` | Submit physical count |
| GET | `/api/v1/warehouses` | List warehouses |
