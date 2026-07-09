---
type: Index
title: Maint — CMMS Knowledge Bundle
description: Open Knowledge Format (OKF) bundle for a multi-tenant Computerized Maintenance Management System
tags: [cmms, maintenance, multi-tenant, okf, vuejs, spring-boot]
timestamp: 2026-07-02
---

# Maint — CMMS Knowledge Bundle

This bundle documents **Maint**, a multi-tenant Computerized Maintenance Management System powered by **Vue.js 3** (frontend) and **Spring Boot** (backend). The knowledge is split into two halves: a stable **Charter** (what Maint is and is meant to be) and a volatile **State** (where the implementation stands right now).

## Charter

The plan of record — architecture, module specs, UI design, and references. These documents change when the design changes, not on every commit.

→ [Charter index](/charter/index.md)

* [System architecture](/charter/architecture.md) — layers, multi-tenancy strategy, tech stack, security flow.
* [Module specs](/charter/specs/index.md) — one specification per module with entity (ERD) and state/activity diagrams.
* [UI design](/charter/ui-design/index.md) — design system, layout, navigation, reusable patterns, per-module wireframes.
* [References](/charter/references/index.md) — external material mirrored as OKF `Reference` concepts.
* [Master generation prompt](/charter/master-prompt.md) — the original prompt that seeded this bundle.

## State

Live tracking of implementation progress, plus the dev runbook and changelog. These documents track what is built, partial, or planned.

→ [State index](/state/index.md)

* [Development status](/state/development-status.md) — per-module implementation status from the live backend.
* [Quickstart](/state/quickstart.md) — running Maint locally (dev/prod profiles, seeder, quick-login).
* [Test plan](/state/test-plan.md) — planned coverage (backend ships no tests yet).
* [Changelog](/state/log.md) — dated history of this knowledge bundle.

## Conformance

This bundle conforms to [OKF v0.1](/charter/references/okf-spec.md).