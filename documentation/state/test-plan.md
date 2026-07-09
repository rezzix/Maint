---
type: State/Section
title: Test plan
description: Planned test coverage for Maint — backend currently ships no tests
tags: [state, testing, plan]
timestamp: 2026-07-09
---

# Test plan

The Maint backend currently ships **no tests** — `backend/src/test/java/com/maint/` is an empty directory tree (0 `.java` files). This document is the planned coverage starting point; it will be filled in as tests are added.

## Planned scope

* **Backend unit tests** — mappers and any service logic once a service layer is extracted (business logic currently lives in controllers).
* **Backend integration tests** — per module controller, using `@SpringBootTest` with the dev H2 profile and the seeded tenants. Priority order follows implementation status in [Development status](/state/development-status.md): the implemented modules first (work order, facility, asset, inventory, user, tenant, …), then `compliance` and `reporting` once implemented.
* **API contract tests** — a runnable collection covering the `/api/v1/**` surface, executable against the dev profile.
* **Frontend tests** — Vitest + Vue Test Utils for components/stores (per the tech stack in [System Architecture](/charter/architecture.md)).

## Per-module specs

The domain behaviour each test plan should cover is defined in the [module specs](/charter/specs/index.md) (entity diagrams, state machines, activity diagrams). Use those as the contract source.