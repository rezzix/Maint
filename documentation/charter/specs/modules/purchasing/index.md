---
type: Charter/Specification
title: Purchasing / Procurement Module
description: Purchase order lifecycle, vendor quotes, approval workflows, goods receipt
tags: [spec, purchasing, procurement, po, approval]
timestamp: 2026-07-02
---

# Purchasing / Procurement

## Overview

Manages the procurement process from requisition to goods receipt. Supports multi-level approval workflows and vendor quote comparison.

## Entity Relationship Diagram

```mermaid
erDiagram
    PurchaseOrder {
        uuid id PK
        uuid tenant_id FK
        uuid vendor_id FK
        uuid requested_by FK
        uuid approved_by FK
        string po_number UK
        string status "draft | pending_approval | approved | sent | partially_received | received | cancelled | rejected"
        date order_date
        date expected_delivery_date
        date received_date
        string shipping_address
        string payment_terms
        string shipping_method
        decimal subtotal
        decimal tax_amount
        decimal shipping_cost
        decimal total_amount
        string notes
        timestamp created_at
        timestamp updated_at
    }

    POItem {
        uuid id PK
        uuid po_id FK
        uuid part_id FK
        uuid tenant_id FK
        int line_number
        string description
        int quantity_ordered
        int quantity_received
        decimal unit_price
        decimal line_total
        string unit_of_measure
        date requested_delivery_date
    }

    ApprovalRule {
        uuid id PK
        uuid tenant_id FK
        string rule_name
        decimal min_amount
        decimal max_amount
        int min_approvers
        jsonb conditions "department, category"
        timestamp created_at
    }

    Approval {
        uuid id PK
        uuid po_id FK
        uuid approver_id FK
        uuid tenant_id FK
        int sequence
        string status "pending | approved | rejected"
        string comment
        timestamp actioned_at
    }

    PurchaseOrder ||--o{ POItem : "contains"
    PurchaseOrder ||--o{ Approval : "approval chain"
    PurchaseOrder }o--|| Vendor : "from"
```

## State Machine

```mermaid
stateDiagram-v2
    [*] --> Draft : created
    Draft --> PendingApproval : submitted
    PendingApproval --> Approved : all approvers accept
    PendingApproval --> Rejected : any approver rejects
    PendingApproval --> Draft : changes requested
    Approved --> Sent : PO issued to vendor
    Sent --> PartiallyReceived : partial goods receipt
    Sent --> Received : full goods receipt
    PartiallyReceived --> Received : remaining items received
    Sent --> Cancelled : vendor unable to fulfill
    Approved --> Cancelled : cancelled before sending
    Received --> [*]
    Rejected --> [*]
    Cancelled --> [*]

    note right of PendingApproval
        Routes through approval
        chain based on amount
        and department rules.
    end note
```

## Activity Diagram (Procurement Flow)

```mermaid
flowchart TD
    A[Requisition created] --> B[Draft PO]
    B --> C{Amount > threshold?}
    C -->|No| D[Auto-approve]
    C -->|Yes| E[Submit for approval]
    E --> F[Notify approvers]
    F --> G[Approver reviews]
    G --> H{Decision?}
    H -->|Approve| I{More approvers?}
    I -->|Yes| G
    I -->|No| D
    H -->|Reject| J[Notify requester]
    J --> K{Revise?}
    K -->|Yes| B
    K -->|No| L[Cancel PO]
    H -->|Request changes| K
    D --> M[Send PO to vendor]
    M --> N[Vendor fulfills]
    N --> O[Goods received]
    O --> P[Matching: PO vs Receipt vs Invoice]
    P --> Q[Payment processed]
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/purchase-orders` | List POs |
| POST | `/api/v1/purchase-orders` | Create PO |
| GET | `/api/v1/purchase-orders/{id}` | Get PO detail |
| PUT | `/api/v1/purchase-orders/{id}` | Update PO |
| PATCH | `/api/v1/purchase-orders/{id}/status` | Status transition |
| POST | `/api/v1/purchase-orders/{id}/receive` | Record goods receipt |
| GET | `/api/v1/approval-rules` | List approval rules |
| POST | `/api/v1/approval-rules` | Create rule |
