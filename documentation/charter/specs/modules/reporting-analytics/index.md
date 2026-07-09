---
type: Charter/Specification
title: Reporting & Analytics Module
description: Dashboards, KPI definitions, scheduled reports, data export
tags: [spec, reporting, analytics, dashboard, kpi]
timestamp: 2026-07-02
---

# Reporting & Analytics

## Overview

Provides configurable dashboards, KPI tracking, and scheduled report generation. Supports multiple output formats and automated email distribution.

## Entity Relationship Diagram

```mermaid
erDiagram
    Dashboard {
        uuid id PK
        uuid tenant_id FK
        string name
        string description
        string layout_type "grid | flex"
        bool is_default
        string refresh_interval "5m | 15m | 1h | manual"
        uuid created_by
        timestamp created_at
        timestamp updated_at
    }

    DashboardWidget {
        uuid id PK
        uuid dashboard_id FK
        uuid tenant_id FK
        string widget_type "chart | table | metric | gauge | heatmap"
        string title
        jsonb config "data source, filters, dimensions"
        int position_x
        int position_y
        int width
        int height
        timestamp created_at
    }

    KPIDefinition {
        uuid id PK
        uuid tenant_id FK
        string name
        string code UK
        string description
        string category "maintenance | inventory | cost | safety"
        string formula "total_wo / total_assets"
        string unit "percent | count | hours | currency"
        decimal target_value
        decimal warning_threshold
        decimal critical_threshold
        string aggregation "sum | avg | min | max | count"
        string data_source "sql_query | elasticsearch"
        string query_text
        bool is_active
    }

    ScheduledReport {
        uuid id PK
        uuid tenant_id FK
        string name
        string report_type "pdf | excel | csv | html"
        jsonb parameters
        string schedule_cron
        jsonb email_recipients
        string status "active | paused | expired"
        string file_url "last generated"
        timestamp last_generated_at
        timestamp next_run_at
    }

    KPIValue {
        uuid id PK
        uuid kpi_id FK
        uuid tenant_id FK
        decimal value
        timestamp recorded_at
        jsonb dimensions "site_id, asset_category"
    }

    Dashboard ||--o{ DashboardWidget : "contains"
    KPIDefinition ||--o{ KPIValue : "records"
```

## State Machine (Scheduled Report)

```mermaid
stateDiagram-v2
    [*] --> Active : created / enabled
    Active --> Generating : cron triggers
    Generating --> Active : generated + delivered
    Generating --> Failed : error during generation
    Failed --> Active : next schedule retries
    Active --> Paused : manually paused
    Paused --> Active : resumed
    Active --> Expired : end_date reached / max runs exceeded
    Paused --> Expired : end_date reached
    Expired --> [*]
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/dashboards` | List dashboards |
| POST | `/api/v1/dashboards` | Create dashboard |
| PUT | `/api/v1/dashboards/{id}/widgets` | Configure widgets |
| GET | `/api/v1/kpis` | List KPI definitions |
| POST | `/api/v1/kpis` | Define KPI |
| GET | `/api/v1/kpis/{id}/values` | Get KPI time series |
| POST | `/api/v1/scheduled-reports` | Schedule report |
| POST | `/api/v1/reports/generate` | Generate one-off report |
| GET | `/api/v1/reports/export` | Export data (CSV/Excel) |
