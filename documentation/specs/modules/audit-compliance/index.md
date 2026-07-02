---
type: Specification
title: Audit & Compliance Module
description: Immutable audit logging, compliance rule enforcement, data retention policies, review workflows
tags: [spec, audit, compliance, logging, retention]
timestamp: 2026-07-02
---

# Audit & Compliance

## Overview

Provides an immutable trail of all domain events, compliance rule definitions with automated checks, and configurable data retention policies.

## Entity Relationship Diagram

```mermaid
erDiagram
    AuditLog {
        uuid id PK
        uuid tenant_id FK
        string entity_type "WorkOrder | Asset | User | PurchaseOrder"
        uuid entity_id
        string event_type "CREATE | UPDATE | DELETE | STATUS_CHANGE | LOGIN | EXPORT"
        string action
        jsonb previous_state
        jsonb new_state
        string source_ip
        string user_agent
        uuid performed_by
        timestamp created_at
    }

    ComplianceRule {
        uuid id PK
        uuid tenant_id FK
        string name
        string code UK
        string description
        string category "safety | environmental | regulatory | internal"
        string severity "low | medium | high | critical"
        jsonb rule_definition "condition expression"
        string evaluation_frequency "realtime | daily | weekly | monthly"
        string notification_channel "email | slack | in-app"
        bool is_active
        timestamp created_at
    }

    ComplianceCheck {
        uuid id PK
        uuid rule_id FK
        uuid tenant_id FK
        string status "passed | failed | error"
        string result_details
        jsonb evidence
        uuid triggered_by
        timestamp checked_at
    }

    AuditReview {
        uuid id PK
        uuid tenant_id FK
        date review_date
        string reviewer_name
        string scope
        string findings
        string resolution
        string status "open | resolved | closed"
        timestamp created_at
        timestamp resolved_at
    }

    RetentionPolicy {
        uuid id PK
        uuid tenant_id FK
        string entity_type
        string data_category "audit_log | transaction | document | temp"
        int retention_days
        string action_on_expiry "archive | delete | anonymize"
        bool is_active
    }

    AuditLog ||--o{ AuditReview : "reviewed in"
    ComplianceRule ||--o{ ComplianceCheck : "results"
    AuditLog }o--|| Tenant : "scoped"
```

## State Machine (Compliance Check)

```mermaid
stateDiagram-v2
    [*] --> Pending : rule triggered / scheduled
    Pending --> Running : evaluation started
    Running --> Passed : conditions satisfied
    Running --> Failed : violation detected
    Running --> Error : system error
    Failed --> Open : non-conformance raised
    Open --> Resolved : corrective action taken
    Resolved --> Closed : verified
    Passed --> [*]
    Error --> [*]
    Closed --> [*]

    note right of Failed
        Notification sent per
        rule configuration.
        Auto-escalate if
        severity = critical.
    end note
```

## Activity Diagram (Audit Trail Flow)

```mermaid
flowchart TD
    A[User action on entity] --> B[Controller handles request]
    B --> C[Service processes business logic]
    C --> D[Repository persists data]
    D --> E[AuditAspect intercepts]
    E --> F[Capture: who, what, when, old/new state, IP]
    F --> G[Write AuditLog asynchronously]
    G --> H{Publish to RabbitMQ}

    subgraph Compliance[Compliance Engine]
        I[ComplianceEvaluator consumes event]
        I --> J[Evaluate relevant ComplianceRules]
        J --> K{Any violation?}
        K -->|Yes| L[Create ComplianceCheck: failed]
        L --> M[Send notification]
        K -->|No| N[Create ComplianceCheck: passed]
    end

    H --> I
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/audit-logs` | Query audit logs |
| GET | `/api/v1/audit-logs/{entityType}/{entityId}` | Logs for specific entity |
| GET | `/api/v1/compliance-rules` | List rules |
| POST | `/api/v1/compliance-rules` | Create rule |
| POST | `/api/v1/compliance-rules/{id}/evaluate` | Manual evaluation |
| GET | `/api/v1/compliance-checks` | Check results |
| GET | `/api/v1/audit-reviews` | List reviews |
| POST | `/api/v1/audit-reviews` | Create review |
| GET | `/api/v1/retention-policies` | List policies |
| POST | `/api/v1/retention-policies` | Create policy |
