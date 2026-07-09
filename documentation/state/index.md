---
type: State
title: Maint — project state
description: Live tracking of where the Maint implementation stands — advancement summary, development status, quickstart, test plan, changelog
tags: [state, status, tracking]
timestamp: 2026-07-09
---

# Maint — project state

Live tracking of where the Maint implementation stands. The stable description of what Maint *is* — architecture, module specs, UI design — lives in the [Charter](/charter/index.md). This half records what is built, what is partial, and what is still planned, plus the dated [changelog](/state/log.md).

## Advancement summary

| Area | Status | Notes |
|---|---|---|
| Tenant management | Implemented | `module/tenant` + top-level `tenant`. |
| User & role management | Implemented | `module/user` (3 controllers). |
| Facility management | Implemented | `module/facility` (sites/buildings/zones/floors/categories). |
| Asset management | Implemented | `module/asset`. |
| Work order management | Implemented | `module/workorder`. |
| Preventive maintenance | Implemented | `module/pm`. |
| Inventory management | Implemented | `module/inventory`. |
| Purchasing | Implemented | `module/purchasing`. |
| Vendor management | Implemented | `module/vendor`. |
| Labor & crew management | Implemented | `module/labor`. |
| Audit & compliance | Partial | Audit implemented; `compliance` is a stub. |
| Reporting & analytics | Stub | `module/reporting` has no Java yet. |
| Cross-cutting (security, config, tenant) | Implemented | JWT, `TenantContextFilter`, seeder config. |
| Backend tests | Not started | `backend/src/test` has 0 `.java` files. |
| CI / coverage gating | Not started | No pipeline configured. |

## State contents

* [Development status](/state/development-status.md) — per-module implementation status with the live backend package map and naming-drift notes.
* [Quickstart](/state/quickstart.md) — how to run Maint in dev mode (profiles, seeder, quick-login).
* [Test plan](/state/test-plan.md) — planned coverage (backend ships no tests yet).
* [Changelog](/state/log.md) — dated history of this knowledge bundle.