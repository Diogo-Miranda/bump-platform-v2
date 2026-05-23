# CODE-STYLE.md

Project: bump-platform-v2
Stack: Next.js (App Router) + TypeScript (strict) + TailwindCSS

This document defines mandatory frontend and UI standards.

---

# 1. Core Principles

1. Reuse > Create
2. Componentize everything
3. Keep pages thin
4. Tailwind only (no inline styles)
5. Separation of structure, logic, and presentation
6. Follow modern Next.js frontend market patterns

---

# 2. Component Reuse Policy (MANDATORY)

Before creating a new component, Claude MUST:

1. Search for an existing component
2. Extend existing component if possible
3. Only create new component if strictly necessary

Forbidden:

* Duplicated UI components
* Slightly modified copies
* Inline repeated markup

Shared UI belongs in:

app/components/ui/

---

# 3. Page Architecture Rule

Pages MUST NOT contain:

* Business logic
* Large JSX blocks
* Inline styling logic
* Repeated layout structures

Pages MUST:

* Import composed components
* Stay under ~100 lines
* Act as orchestration layer only

Correct pattern:

page.tsx
→ imports Section components
→ Sections import UI components

---

# 4. Component Layers

## 4.1 UI Components (Atomic)

Location:

app/components/ui/

Examples:

* Button
* Input
* Card
* Badge
* Modal

Rules:

* Pure
* No business logic
* No data fetching
* Fully reusable
* Accept props only

---

## 4.2 Feature Components

Location:

app/features/<feature>/components/

Rules:

* Can use feature hooks
* Can handle domain logic
* Can compose UI components
* Must remain reusable inside feature scope

---

## 4.3 Layout Components

Location:

app/components/layout/

Examples:

* Navbar
* Sidebar
* Container
* PageWrapper

Layout must be centralized.
Never duplicate layout markup inside pages.

---

# 5. TailwindCSS Standards

Project uses Tailwind only.

Rules:

* No CSS files per component
* No inline style={{}}
* No styled-components
* No CSS modules unless explicitly required

## 5.1 Class Organization Pattern

Classes must follow order:

1. Layout (flex, grid, position)
2. Spacing (p, m, gap)
3. Size (w, h)
4. Typography
5. Colors
6. Effects (shadow, border, ring)
7. State (hover, focus)

Example:

className="flex items-center gap-4 p-4 w-full text-sm font-medium bg-white rounded-lg shadow-sm hover:bg-gray-50"

---

## 5.2 Conditional Classes

Use:

* clsx or class-variance-authority (recommended)

Forbidden:

* Long template string concatenations
* Inline conditional chaos

---

# 6. Styling Strategy (Market Pattern)

Use Design System Pattern:

* Centralized UI primitives
* Variant-based components
* Composable layouts
* Minimal page-level styling

All styling should live inside components.

Pages should not contain Tailwind-heavy blocks.

---

# 7. Component Best Practices

All components MUST:

* Be typed
* Have explicit props interface
* Avoid any
* Avoid excessive re-renders
* Use Server Components by default
* Use "use client" only when necessary

---

# 8. Server vs Client Components

Default: Server Component.

Use "use client" only when:

* Using state
* Using hooks
* Using browser APIs
* Using event handlers

Never mark entire layout as client unnecessarily.

---

# 9. Naming Conventions

* PascalCase → Components
* camelCase → variables/functions
* UPPER_CASE → constants
* Folder names → lowercase

---

# 10. Composition Pattern (Preferred)

Prefer composition over configuration.

Good:

<Card>
  <CardHeader />
  <CardContent />
</Card>

Avoid:

<Card title="..." description="..." showBorder />

---

# 11. Performance Rules

* Avoid unnecessary client components
* Avoid deep prop drilling
* Avoid inline function recreation in heavy trees
* Memo only when needed

---

# 12. Forbidden Patterns

* Massive page.tsx files
* Inline duplicated Tailwind blocks
* Business logic inside UI components
* Fetching directly inside UI components
* Mixing layout and domain logic

---

# 13. Creation Rules

When creating new UI:

1. Check if UI component exists
2. If not, create inside components/ui/
3. If domain-specific, create inside feature
4. Keep styling inside component
5. Keep page minimal

---

# 14. Routing & Proxy Convention (MANDATORY)

Middleware is DEPRECATED in this project.

Use `next.config.ts` instead:

## Redirects

Simple route redirects (e.g. `/` → `/login`) MUST be declared in `next.config.ts`:

```ts
async redirects() {
  return [{ source: "/", destination: "/login", permanent: false }]
}
```

## API Proxy

All backend API calls MUST be proxied through `next.config.ts` rewrites:

```ts
async rewrites() {
  return [{ source: "/api/:path*", destination: `${process.env.BACKEND_URL}/api/:path*` }]
}
```

Forbidden:
* `middleware.ts` for routing or auth checks
* Direct backend calls from the client
* Hardcoded backend URLs

Backend URL MUST come from `BACKEND_URL` environment variable (server-only, no NEXT_PUBLIC_ prefix).

## Auth Protection

Route protection MUST use layout-level guards:

`app/(private)/layout.tsx` → `<AuthGuard>{children}</AuthGuard>`

---

# 15. Architectural Priority

If speed conflicts with maintainability,
maintainability wins.

If duplication is easier,
abstraction wins.

This project prioritizes scalability over shortcuts.
