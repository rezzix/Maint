---
type: Charter/Specification
title: UI Patterns
description: Reusable interface patterns used across modules — data tables, dialogs, forms, wizards, empty states
tags: [ui, patterns, datatable, dialog, form]
timestamp: 2026-07-02
---

# UI Patterns

## DataTable (List View)

Every module has a primary list page that follows this pattern:

```mermaid
graph TB
    subgraph ListPage
        H[Toolbar:<br/>Title + Create button + Export]
        F[Filter Bar:<br/>DateRange + Dropdowns + TextInput + Clear]
        T[PrimeVue DataTable]
        P[Paginator]
    end

    T --- COLS
    subgraph COLS[Columns]
        C1[Identifier Tag]
        C2[Primary Field]
        C3[Status Badge]
        C4[Assigned To]
        C5[Date]
        C6[Actions Menu]
    end
```

### DataTable Features

- **Sortable** columns (single-column sort)
- **Filterable** — column-level text match where relevant
- **Selectable** rows (single-click selects, checkbox for batch actions)
- **Stateful** — column order, width, and visibility persist per user
- **Lazy loading** — server-side pagination, sorting, filtering
- **Row expansion** — shows related sub-items inline (e.g., tasks under a WO)
- **Inline editing** — editable cells for quick status changes

### Status Badge Convention

| Severity | `Severity` prop | Example |
|---|---|---|
| Active / Success | `success` | Operational, Completed, Approved |
| Warning | `warn` | Pending, On-Hold, Expiring |
| Danger | `danger` | Broken, Overdue, Rejected |
| Info | `info` | In-Progress, Assigned |
| Neutral | `contrast` / `secondary` | Draft, Closed, Inactive |

## Detail Panel

```mermaid
graph LR
    subgraph DetailLayout
        LEFT[Left Column<br/>Primary fields]
        DIVIDER[Divider]
        RIGHT[Right Column<br/>Metadata & Status]
    end

    subgraph Tabs[Tab Panel below]
        T1[Related Items<br/>e.g. Tasks]
        T2[History<br/>e.g. Audit Log]
        T3[Attachments]
    end

    DetailLayout --> Tabs
```

- **Desktop**: side-by-side columns
- **Mobile**: stacked sections

## Dialog (Create / Edit)

- **Size**: small (400px) for simple forms, medium (600px) for standard, large (900px) for complex
- **Position**: centered, closable via overlay click or `X` button
- **Footer**: Cancel + Save / Save & New
- **Validation**: inline messages below each field, disabled Submit until valid

## Wizard (Multi-Step)

Used for: Asset registration, Work Order creation with task breakdown, PO approval.

```mermaid
graph LR
    S1[StepBar]

    subgraph Step1[Step 1: Basic Info]
        A1[Fields: name, type, priority]
    end

    subgraph Step2[Step 2: Details]
        A2[Fields: location, assignment]
    end

    subgraph Step3[Step 3: Review]
        A3[Read-only summary + Submit]
    end

    S1 --> Step1 --> Step2 --> Step3
```

## Empty State

When a module has no data (or filtered results are empty):

```mermaid
graph TB
    subgraph EmptyStateCard
        ICON[Empty icon<br/>PrimeVue InlineMessage / custom SVG]
        TITLE[Title: No work orders yet]
        DESC[Description: Create your first work order]
        CTA[Primary button: Create Work Order]
    end
```

## Loading State

- **Initial load**: DataTable shows `skeleton` rows (4–10)
- **Action loading**: Overlay spinner on the triggering button
- **Page transition**: Topbar loading bar (`NProgress`-style via PrimeVue `ProgressBar`)

## Confirmation Dialog

Used for destructive or impactful actions (delete, cancel, reject):

| Element | Value |
|---|---|
| Header | `Confirm action` |
| Message | `Are you sure you want to delete WO-0042?` |
| Reject button | `Cancel` |
| Accept button | `Delete` (red) |
