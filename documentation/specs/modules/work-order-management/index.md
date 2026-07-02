---
type: Specification
title: Work Order Management Module
description: Corrective and planned work order lifecycle — creation, assignment, execution, closure
tags: [spec, work-order, maintenance, task]
timestamp: 2026-07-02
---

# Work Order Management

## Overview

Core module for managing maintenance tasks. Supports **corrective** (reactive) and **planned** (from PM) work orders. Includes task breakdown, technician assignment, parts reservation, and cost tracking.

## Entity Relationship Diagram

```mermaid
erDiagram
    WorkOrder {
        uuid id PK
        uuid tenant_id FK
        uuid asset_id FK
        uuid site_id FK
        uuid pm_plan_id FK "nullable"
        uuid requested_by FK
        uuid assigned_to FK "technician"
        uuid approved_by FK
        string wo_number UK
        string title
        string description
        string type "corrective | preventive | predictive | emergency"
        string priority "low | medium | high | critical"
        string status "open | assigned | in-progress | on-hold | completed | closed | cancelled"
        date target_date
        datetime started_at
        datetime completed_at
        decimal estimated_hours
        decimal actual_hours
        decimal estimated_cost
        decimal actual_cost
        string failure_code
        string resolution_notes
        timestamp created_at
        timestamp updated_at
    }

    WorkOrderTask {
        uuid id PK
        uuid work_order_id FK
        uuid tenant_id FK
        uuid assigned_to FK
        int sequence
        string description
        string status "pending | in-progress | completed | skipped"
        decimal estimated_hours
        decimal actual_hours
        timestamp completed_at
    }

    WorkOrderPart {
        uuid id PK
        uuid work_order_id FK
        uuid part_id FK
        uuid tenant_id FK
        int quantity_required
        int quantity_used
        decimal unit_cost
        string source "stock | purchased"
    }

    WorkOrderAttachment {
        uuid id PK
        uuid work_order_id FK
        uuid tenant_id FK
        string file_name
        string file_url
        string file_type "image | pdf | video"
        timestamp uploaded_at
    }

    WorkOrder ||--o{ WorkOrderTask : "breaks down into"
    WorkOrder ||--o{ WorkOrderPart : "uses"
    WorkOrder ||--o{ WorkOrderAttachment : "has"
    WorkOrder }o--|| Asset : "concerns"
```

## State Machine

```mermaid
stateDiagram-v2
    [*] --> Open : created (corrective or from PM)
    Open --> Assigned : technician assigned
    Assigned --> InProgress : technician starts work
    InProgress --> OnHold : waiting for parts / info
    OnHold --> InProgress : parts received / info resolved
    InProgress --> Completed : all tasks done
    Completed --> Closed : supervisor review & approval
    Completed --> InProgress : rework required
    Closed --> Cancelled : void (before billing)
    Open --> Cancelled : duplicate / invalid
    Assigned --> Cancelled : cancelled by admin

    note right of Completed
        All tasks marked done.
        Awaiting review.
    end note

    note right of Closed
        Final state for
        reporting and billing.
    end note
```

## Activity Diagram (Corrective Flow)

```mermaid
flowchart TD
    A[Failure reported] --> B[Create WorkOrder<br/>type=corrective]
    B --> C[Set priority based on<br/>asset criticality + impact]
    C --> D[Assign technician]
    D --> E[Technician receives notification]
    E --> F[Technician starts work]
    F --> G{Need parts?}
    G -->|Yes| H[Reserve from inventory]
    H --> I{In stock?}
    I -->|No| J[Create purchase requisition]
    J --> K[Wait for parts]
    K --> F
    I -->|Yes| L[Technician completes task]
    G -->|No| L
    L --> M[Record time + parts used]
    M --> N[Supervisor reviews]
    N --> O{Quality check?}
    O -->|Fail| P[Mark rework -> InProgress]
    O -->|Pass| Q[Close WorkOrder]
    Q --> R[Update asset status + history]
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/work-orders` | List work orders |
| POST | `/api/v1/work-orders` | Create work order |
| GET | `/api/v1/work-orders/{id}` | Get detail |
| PUT | `/api/v1/work-orders/{id}` | Update work order |
| PATCH | `/api/v1/work-orders/{id}/status` | Transition status |
| POST | `/api/v1/work-orders/{id}/assign` | Assign technician |
| POST | `/api/v1/work-orders/{id}/parts` | Add part usage |
| GET | `/api/v1/work-orders/{id}/timeline` | Get status timeline |
