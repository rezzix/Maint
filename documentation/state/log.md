---
type: State/Log
title: Bundle Changelog
description: Track significant changes to the Maint knowledge bundle
tags: [changelog]
timestamp: 2026-07-02
---

## 2026-07-02

- Initial bundle creation
- Architecture document
- 12 module specification files with entity and state diagrams
- UI Design document (layout, design system, navigation, patterns, 12 module page wireframes)

## 2026-07-03

- H2 changed from in-memory to file-based (`backend/data/maint.mv.db`) for data persistence across restarts
- Added Zone and Floor entities to complete the facility hierarchy
- Dev seeder rewritten with rich test data: 40+ assets, 30+ WOs, 14 PM plans, 28 parts, 6 vendors, 7 POs, 6 technicians across 3 tenants

## 2026-07-09

- Reorganized the bundle into **Charter** (stable) + **State** (volatile) halves, matching the smart-trip/Nemo convention.
- Moved `architecture.md`, `specs/`, `ui-design/`, `references/` under `charter/`; moved `log.md` under `state/`; relocated `prompts.txt` to `charter/master-prompt.md` as a reference doc with OKF frontmatter.
- Split `architecture.md`: extracted the Profiles & Environments, Seeder (Dev Mode), and Quick-Login Card sections into a new `state/quickstart.md`; left a pointer in `charter/architecture.md`.
- Authored new state docs: `state/index.md` (advancement table across 12 modules + cross-cutting + tests/CI), `state/development-status.md` (per-module implementation status from the live backend, single-module Gradle build vs the aspirational multi-module diagram, naming drift, zero tests), `state/test-plan.md` (stub), and `charter/index.md` (vision + TOC).
- Converted all internal links to bundle-absolute (`](/charter/…)`, `](/state/…)`), depth-independent and robust to future moves.
- Retyped frontmatter: `type: Charter/*` for charter docs, `type: State/*` for state docs, root `index.md` → `type: Index`.
- Deleted `specs/modules.md` (empty 0-byte stray).
