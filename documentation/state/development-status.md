---
type: State/Section
title: Development status
description: Per-module implementation status derived from the live Maint backend, with build-layout and naming drift notes
tags: [state, status, implementation, backend]
timestamp: 2026-07-09
---

# Development status

Per-module implementation status, derived from the live backend source tree (`backend/src/main/java/com/maint/`). **Implemented** = a backend package with a controller (and entities/repositories); **stub** = package directory exists but contains no Java; **absent** = no package.

## Build layout

The backend is a **single-module Gradle project** (`rootProject.name = "maint"` in `backend/settings.gradle.kts`). This differs from the aspirational "Multi-Module Gradle Project" diagram in [System Architecture](/charter/architecture.md) (which depicts separate `api-gateway`, `core`, `tenant-management`, … Gradle modules) — that diagram represents the intended target architecture, not the current build.

## Cross-cutting — present

`security/` (JWT filter, `TenantContextFilter`, 1 service), `config/` (3 files), `tenant/` (top-level, 5 files), plus `module/tenant` for tenant CRUD.

## Per-module status

| Spec module | Backend package | Status | Notes |
|---|---|---|---|
| Tenant management | `module/tenant` (+ top-level `tenant`) | Implemented | 1 controller, 5 files. |
| User & role management | `module/user` | Implemented | 3 controllers, 9 files (users + roles + auth helpers). |
| Facility management | `module/facility` | Implemented | 1 controller, 9 files (sites/buildings/zones/floors/categories). |
| Asset management | `module/asset` | Implemented | 1 controller, 5 files. |
| Work order management | `module/workorder` | Implemented | 1 controller, 5 files. **Naming drift**: code `workorder` vs spec `work-order-management`. |
| Preventive maintenance | `module/pm` | Implemented | 1 controller, 5 files. **Naming drift**: code `pm` vs spec `preventive-maintenance`. |
| Inventory management | `module/inventory` | Implemented | 1 controller, 5 files. |
| Purchasing | `module/purchasing` | Implemented | 1 controller, 5 files. |
| Vendor management | `module/vendor` | Implemented | 1 controller, 3 files. |
| Labor & crew management | `module/labor` | Implemented | 1 controller, 3 files. **Naming drift**: code `labor` vs spec `labor-crew-management`. |
| Audit & compliance | `module/audit` + `module/compliance` | Partial | `module/audit` implemented (1 controller, 3 files); `module/compliance` is a **stub** (0 Java files). Top-level `audit/` also empty. |
| Reporting & analytics | `module/reporting` | Stub | Package exists with **0 Java files** — not yet implemented. **Naming drift**: code `reporting` vs spec `reporting-analytics`. |

No module package ships a dedicated `*Service` class — business logic currently lives in the controllers (or is yet to be extracted). Entities, repositories, and mappers round out the 57 files under `module/`.

## Test coverage — Not started

`backend/src/test/java/com/maint/` exists as a directory tree but contains **0 `.java` files**. See the [test plan](/state/test-plan.md) for planned coverage.