---
type: Log
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
