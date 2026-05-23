# SECURITY.md

Project: bump-platform-v2
Stack: Next.js (App Router) + NextAuth

This document defines mandatory backend protection rules.

---

## 1. Core Principle

The backend (app/api) is **internal-only**.

It MUST be accessible only by the application frontend.

No public API exposure is allowed.

---

## 2. API Exposure Policy

All routes inside:

app/api/

MUST:

* Require authenticated session
* Validate server-side
* Reject unauthenticated requests
* Never expose sensitive data

API routes are NEVER public.

No exceptions.

---

## 3. Access Control

Every route handler MUST:

1. Validate session via NextAuth (server-side)
2. Reject if session is missing
3. Enforce authorization rules
4. Return minimal safe data

Forbidden:

* Anonymous API access
* Tokenless access
* Trusting client-side validation
* Role checks in frontend only

---

## 4. Frontend → Backend Communication

Backend must only accept:

* Requests with valid session
* Same-origin requests

Forbidden:

* Public REST API usage
* External third-party consumption
* Open CORS policies

CORS must remain restricted (default same-origin).

---

## 5. Data Protection Rules

* Never expose internal IDs unnecessarily
* Never return full objects if partial is enough
* No stack traces in production
* No secrets in responses
* No secrets in client components

Environment variables:

* Server-only variables MUST NOT be prefixed with NEXT_PUBLIC_
* Sensitive values stay server-side

---

## 6. Validation Rules

All input MUST:

* Be validated server-side
* Use schema validation (Zod preferred)
* Sanitize before use

Client validation is optional.
Server validation is mandatory.

---

## 7. Authorization Rules

Authentication ≠ Authorization.

Each route MUST verify:

* User identity
* Resource ownership
* Role/permission (if applicable)

Never rely on frontend role checks.

---

## 8. Middleware Enforcement

middleware.ts MUST:

* Protect all non-public routes
* Prevent direct access to private pages
* Redirect unauthenticated users to /login

Middleware MUST NOT expose logic details.

---

## 9. Error Handling

Production:

* Return generic error messages
* Do not expose stack traces
* Log sensitive errors server-side only

---

## 10. Prohibited Patterns

* Public API endpoints
* API keys in client components
* Business logic in frontend
* Disabling auth checks for testing without isolation
* Returning raw database responses

---

## 11. Security Priority Rule

Security overrides convenience.

If a feature conflicts with these rules,
security rules take precedence.

This backend is internal and must remain private.
