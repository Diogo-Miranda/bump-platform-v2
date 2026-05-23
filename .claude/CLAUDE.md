# CLAUDE.md

Project: bump-platform-v2
Stack: Next.js (App Router) + TypeScript (strict) + NextAuth

Claude MUST follow this structure exactly.

---

## 1. Root (fixed)

Allowed:

* app/
* public/
* node_modules/
* middleware.ts
* next.config.ts
* tsconfig.json
* package.json
* .env
* .gitignore

Forbidden:

* src/
* Root restructuring
* Monorepo
* Extra root folders

---

## 2. App Structure

All code inside `app/`.

app/

* login/            → ONLY public page
* (private)/        → all protected routes
* api/
* components/
* features/
* lib/
* services/
* store/
* hooks/
* types/
* config/
* layout.tsx
* page.tsx
* globals.css

No alternative structure allowed.

---

## 3. Routing Rules (MANDATORY)

* `/login` = ONLY public route
* `/` MUST redirect to `/login`
* All other routes MUST be private
* All private pages MUST require authenticated session

Future public pages must be configurable (not hardcoded).

---

## 4. Auth System (NextAuth REQUIRED)

Use NextAuth for authentication.

Auth logic MUST be centralized and extensible.

Create:

app/lib/auth.ts
app/components/auth/AuthGuard.tsx
middleware.ts

Rules:

* No inline session checks inside pages
* No duplicated auth logic
* No client-only guards

---

## 5. Auth Architecture

### Public Routes Control

Create a single source of truth:

app/config/publicRoutes.ts

Example structure:

export const PUBLIC_ROUTES = ["/login"];

Middleware and AuthGuard MUST use this list.

To add a new public page, only modify PUBLIC_ROUTES.

---

## 6. Middleware Rules

middleware.ts MUST:

1. Check if route is public
2. If not public → require session
3. If no session → redirect to /login
4. If route is "/" → redirect to /login

Middleware must NOT contain business logic.

---

## 7. Layout Protection

Private routes must live inside:

app/(private)/

Private layout must wrap children with AuthGuard.

Pattern:

(private)/layout.tsx
→ <AuthGuard>{children}</AuthGuard>

---

## 8. Feature Pattern (mandatory)

app/features/<feature>/

Must contain:

* services.ts
* schemas.ts
* types.ts
* hooks.ts (optional)

Rules:

* No business logic in UI
* Pages stay thin
* route.ts → services.ts

---

## 9. API Pattern

app/api/<domain>/route.ts

route.ts → features/<feature>/services.ts

Thin controller only.

---

## 10. Imports

Absolute imports only.

Forbidden: ../../../

---

## 11. Code Rules

* TypeScript strict
* No any
* Typed functions
* Server logic server-side
* No duplicated validation

---

## 12. Generation Rules

When creating a new feature:

1. Create app/features/<feature>/
2. Add services.ts
3. Add schemas.ts
4. Add types.ts
5. Add hooks.ts if needed
6. Add API route
7. Respect auth structure

---

This file overrides architectural improvisation.
