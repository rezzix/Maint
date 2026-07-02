---
type: Specification
title: Labor & Crew Management Module
description: Technician profiles, crew assignments, certifications, time tracking, skills matrix
tags: [spec, labor, crew, technician, certification, time-tracking]
timestamp: 2026-07-02
---

# Labor & Crew Management

## Overview

Manages the workforce — technician profiles, crew groupings, certifications, and time entries against work orders.

## Entity Relationship Diagram

```mermaid
erDiagram
    Technician {
        uuid id PK
        uuid user_id FK
        uuid tenant_id FK
        string employee_code
        string job_title
        string department
        decimal hourly_rate
        string shift "day | night | rotating"
        string status "available | busy | off-duty | on-leave"
        string phone
        string emergency_contact
        jsonb skills "['welding', 'electrical', 'hvac']"
        date hire_date
        timestamp created_at
    }

    Crew {
        uuid id PK
        uuid tenant_id FK
        string name
        string description
        uuid lead_technician_id FK
        string status "active | inactive | disbanded"
        timestamp created_at
    }

    CrewMember {
        uuid crew_id FK
        uuid technician_id FK
        uuid tenant_id FK
        string role "lead | member | trainee"
        date joined_at
    }

    Certification {
        uuid id PK
        uuid technician_id FK
        uuid tenant_id FK
        string name
        string issuing_authority
        string certificate_number
        date issue_date
        date expiry_date
        string status "active | expired | revoked"
        string attachment_url
    }

    TimeEntry {
        uuid id PK
        uuid technician_id FK
        uuid work_order_id FK
        uuid tenant_id FK
        date work_date
        decimal hours_worked
        string work_type "regular | overtime | standby"
        string description
        string status "draft | submitted | approved | rejected"
        uuid approved_by
        timestamp created_at
    }

    Technician ||--o{ Certification : "holds"
    Technician ||--o{ TimeEntry : "logs"
    Technician ||--o{ CrewMember : "member of"
    Crew ||--o{ CrewMember : "has"
    CrewMember }o--|| Technician : ""
    CrewMember }o--|| Crew : ""
```

## State Machine (Technician Status)

```mermaid
stateDiagram-v2
    [*] --> Available : shift starts / off-leave returns
    Available --> Busy : assigned to work order
    Busy --> Available : work order completed
    Busy --> OffDuty : shift ends
    Available --> OffDuty : shift ends / clock out
    Available --> OnLeave : approved leave
    OnLeave --> Available : leave ends
    OffDuty --> Available : next shift starts
```

## Activity Diagram (Time Entry & Approval)

```mermaid
flowchart TD
    A[Technician completes work] --> B[Create TimeEntry<br/>hours + description]
    B --> C[Submit for approval]
    C --> D[Supervisor reviews]
    D --> E{Valid?}
    E -->|Yes| F[Approve]
    E -->|No| G[Reject with reason]
    G --> H[Notify technician]
    H --> I{Revise?}
    I -->|Yes| B
    I -->|No| J[Cancel entry]
    F --> K[Update WO actual_hours]
    K --> L[Calculate labor cost]
    L --> M[Post to costing]
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/technicians` | List technicians |
| POST | `/api/v1/technicians` | Create technician |
| GET | `/api/v1/crews` | List crews |
| POST | `/api/v1/crews` | Create crew |
| POST | `/api/v1/crews/{id}/members` | Add member |
| GET | `/api/v1/technicians/{id}/certifications` | List certs |
| POST | `/api/v1/certifications` | Add certification |
| POST | `/api/v1/time-entries` | Log time |
| PATCH | `/api/v1/time-entries/{id}/approve` | Approve entry |
