# AGENTS.md - Coding Agent Guidelines

This document provides guidelines for AI coding agents working in this repository.

## Project Overview

This is a **React 19 portfolio website** with a TUI/ASCII grid aesthetic, built with:
- **React 19.1** with TypeScript 5.8
- **Vite 7** as the build tool
- **Tailwind CSS 4** for styling
- **Custom TUI Grid System** for terminal-style layouts

Design inspirations: Oxide, Polar, Buka Studio, Fumadocs, Axiom

## Commands

### Development

```bash
npm run dev       # Start dev server (binds to 127.0.0.1)
npm run preview   # Preview production build
```

### Building

```bash
npm run build     # Production build (runs tsc -b first)
npx tsc -b        # TypeScript type checking only
```

## Project Structure

```
src/
├── App.tsx              # Main application component
├── main.tsx             # Entry point (StrictMode)
├── index.css            # Global styles, TUI theme, utilities
├── components/
│   └── tui-grid.tsx     # TUI grid components (GridCell, TuiSection, etc.)
└── lib/utils.ts         # cn() helper for class merging
```

## TUI Grid System

The portfolio uses a custom grid system inspired by terminal UIs:

### Components

- **`TuiSection`** - Full-width section with top/bottom borders (viewport edge-to-edge)
- **`TuiGrid`** - CSS Grid container for columns
- **`GridCell`** - Cell with optional borders and corner crosses (SVG +)
- **`Container`** - Centered content wrapper with left/right borders (defined in App.tsx)

### Layout Pattern

Horizontal lines span full viewport, vertical lines bound the content area:

```
|←─────────── viewport ───────────→|
+----------------------------------+  ← TuiSection border (full-width)
|        |  Container  |           |  ← Container with border-l/r
+----------------------------------+  ← TuiSection border (full-width)
```

### Usage

```tsx
import { GridCell, TuiGrid, TuiSection } from "@/components/tui-grid"

<TuiSection>
  <Container>
    <TuiGrid cols={2}>
      <GridCell borders={["right"]} corners={["tr", "br"]}>
        Left column
      </GridCell>
      <GridCell>
        Right column
      </GridCell>
    </TuiGrid>
  </Container>
</TuiSection>
```

### CSS Classes

- `.tui-cell` - Standard cell padding (1.5rem)
- `.tui-section` - Full-width section with top/bottom borders
- `.text-display` - Large display text (clamp 2-4rem)
- `.text-heading` - Section headings
- `.text-body` - Body text (0.875rem)
- `.text-small` - Small text (0.75rem)
- `.text-label` - Uppercase labels (0.625rem)
- `.cursor-blink` - Blinking cursor effect

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** with `noUnusedLocals`, `noUnusedParameters`
- **Target ES2022** - modern JavaScript features available
- **ESM project** (`"type": "module"` in package.json)

### Imports

Use path aliases (`@/`) over relative paths:
```typescript
import { cn } from "@/lib/utils"
import { GridCell } from "@/components/tui-grid"
```

Import order: 1) React/external libs, 2) Internal `@/` modules, 3) Relative imports

### React Components

- **Function declarations** preferred over arrow functions for components
- **Default exports** for page/main components
- **Named exports** for utilities and reusable components

### Styling

Use the `cn()` utility for conditional/merged classes:
```typescript
<div className={cn("base-class", isActive && "active-class")} />
```

Theme colors (CSS variables):
- `--background` / `--foreground` - Main colors
- `--muted` / `--muted-foreground` - Subdued colors
- `--border` - Border color
- `--accent` / `--accent-foreground` - Accent color (teal)

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `tui-grid.tsx` |
| Components | PascalCase | `GridCell` |
| Functions/vars | camelCase | `showCorners` |
| Types/Interfaces | PascalCase | `GridCellProps` |

### Error Handling

- Handle null/undefined with optional chaining (`?.`) and nullish coalescing (`??`)
- Use non-null assertion (`!`) only when certain

## Design Principles

1. **Full-width horizontal borders** - `TuiSection` borders span entire viewport
2. **Contained vertical borders** - `Container` adds left/right borders at max-width
3. **Intersection crosses** - SVG `+` marks where grid borders meet
4. **Monospace typography** - Terminal/code aesthetic throughout
5. **Dark-first** - Dark theme is default, add `.light` class for light mode

## Adding New Sections

```tsx
<TuiSection>
  <Container>
    <div className="tui-cell border-b border-border">
      <span className="text-label">section title</span>
    </div>
    <TuiGrid cols={2}>
      <GridCell className="tui-cell" borders={["right"]} corners={["tr", "br"]}>
        Content left
      </GridCell>
      <GridCell className="tui-cell">
        Content right
      </GridCell>
    </TuiGrid>
  </Container>
</TuiSection>
```

## Important Notes

- Vite dev server runs on `127.0.0.1` (localhost only)
- React 19 is used - be aware of new features
- `TuiSection` has `showCorners={false}` by default (full-width sections)
- Use JetBrains Mono or similar monospace font for best results
- `overflow-x-hidden` is set on html/body to prevent horizontal scroll
