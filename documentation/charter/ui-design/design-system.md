---
type: Charter/Specification
title: Design System
description: PrimeVue theme customization, colour tokens, typography, spacing, icons
tags: [ui, design-system, theme, primevue]
timestamp: 2026-07-02
---

# Design System

## Theme

Maint uses a **custom PrimeVue theme** built with the PrimeVue 4 design token API. The theme is defined in `src/assets/theme/` using CSS custom properties.

### Colour Palette

```mermaid
graph LR
    subgraph Primary[Primary - Blue]
        P50[50 #EFF6FF]
        P100[100 #DBEAFE]
        P200[200 #BFDBFE]
        P300[300 #93C5FD]
        P400[400 #60A5FA]
        P500[500 #3B82F6]
        P600[600 #2563EB]
        P700[700 #1D4ED8]
        P800[800 #1E40AF]
        P900[900 #1E3A8A]
    end

    subgraph Surface[Neutral / Surface]
        S0[0 #FFFFFF]
        S50[50 #F8FAFC]
        S100[100 #F1F5F9]
        S200[200 #E2E8F0]
        S300[300 #CBD5E1]
        S400[400 #94A3B8]
        S500[500 #64748B]
        S600[600 #475569]
        S700[700 #334155]
        S800[800 #1E293B]
        S900[900 #0F172A]
    end

    subgraph Semantic[Semantic]
        SUCCESS[#10B981]
        WARNING[#F59E0B]
        DANGER[#EF4444]
        INFO[#3B82F6]
    end
```

### Typography

| Token | Value | Usage |
|---|---|---|
| `font-family` | `Inter, system-ui, sans-serif` | All text |
| `font-family-mono` | `JetBrains Mono, monospace` | Code, IDs, serial numbers |
| `font-size-sm` | `0.875rem` | Metadata, footnotes |
| `font-size-base` | `1rem` | Body text |
| `font-size-lg` | `1.125rem` | Sub-headings |
| `font-size-xl` | `1.25rem` | Page titles |
| `font-size-2xl` | `1.5rem` | Section headings |
| `line-height` | `1.5` | Body |
| `font-weight-medium` | `500` | Buttons, labels |
| `font-weight-semibold` | `600` | Table headers |
| `font-weight-bold` | `700` | Strong emphasis |

### Spacing

Based on a 4px grid: `{0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10}rem` corresponding to `{0, 4, 8, 16, 24, 32, 48, 64, 80, 96, 128, 160}px`.

### Icons

- **Library**: PrimeIcons (PrimeVue built-in)
- **Fallback**: Material Symbols outlined
- **Size**: `1rem` for inline, `1.25rem` for sidebar nav, `1.5rem` for action buttons
