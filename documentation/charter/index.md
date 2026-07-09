---
type: Charter
title: Maint — charter
description: Stable description of what Maint is — vision, architecture, module specs, UI design, references
tags: [charter, vision, cmms]
timestamp: 2026-07-09
---

# Maint — charter

The stable description of what Maint is and is meant to be. This is the plan of record; progress against it is tracked in [State](/state/index.md).

## Vision & goals

**Maint** is a multi-tenant Computerized Maintenance Management System (CMMS) powered by **Vue.js 3** (frontend) and **Spring Boot** (backend). Multi-tenancy is achieved via row-level isolation in a shared database — every tenant-scoped table carries a `tenant_id`, resolved per request through a `TenantContextFilter`.

The functional scope spans twelve modules: tenant management, user & role management, facility management, asset management, work order management, preventive maintenance, inventory management, purchasing, vendor management, labor & crew management, reporting & analytics, and audit & compliance. See [System Architecture](/charter/architecture.md) for the full shape and deployment model.

## Contents

* [System architecture](/charter/architecture.md) — layers, multi-tenancy strategy, tech stack, frontend/backend architecture, security flow, cross-cutting concerns.
* [Module specs](/charter/specs/index.md) — one specification per module with entity (ERD) and state/activity diagrams.
* [UI design](/charter/ui-design/index.md) — design system, layout, navigation, reusable patterns, and per-module page wireframes.
* [References](/charter/references/index.md) — external material mirrored as OKF `Reference` concepts (incl. the OKF spec).
* [Master generation prompt](/charter/master-prompt.md) — the original prompt that seeded this knowledge bundle.