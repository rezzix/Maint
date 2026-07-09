---
type: Charter/Reference
title: Maint — Master Generation Prompt
description: The original prompt used to bootstrap this OKF documentation bundle
tags: [charter, reference, prompt, meta, okf]
timestamp: 2026-07-02
---

# Maint — Master Generation Prompt

The original prompt that seeded this OKF knowledge bundle, preserved verbatim as a reference for how the documentation was scoped and generated.

> I want to build a documentation in OKF format (see reference folder) for a multi-tenant Computerized Maintenance Management System using vuejs 3 in the frontend and spring boot for the backend, i want you to generate a standard architecture document and specification folder with as many subfolders as modules, each module has a spec md file with entity diagram and state machine diagram or activity diagram if needed for clarification. please ask me as many questions as needed to complete your understanding for the task before proceeding.
>
> The application runs on H2 in dev mode and in postgres in prod mode
>
> in dev mode a seeder creates 3 tenants with locations, users, equipments and all that is needed for different tests. the login screen shows a quick login card that lists the users by tenant and role to choose from, the login is automatic after a user is chosen.
>
> in prod mode the seeder does not initialize the database