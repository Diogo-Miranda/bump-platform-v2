# Grants (Permissions)

Grants are string-based permissions embedded inside the JWT and used to control access to platform resources. The frontend should read the `grants` array from the decoded JWT to conditionally render UI elements and restrict navigation.

---

## How Grants Work

1. User logs in → backend issues a JWT with the grants assigned to that user
2. Frontend decodes the JWT (without verifying the signature — that's the backend's job)
3. Frontend checks if the required grant is present before showing a feature or route
4. Every API request is independently validated by the backend — frontend checks are UI-only

```
JWT payload
└── grants: ["read", "write", "admin", "users:create"]
```

---

## Grant Reference

| Grant | Description | Who has it |
|-------|-------------|------------|
| `read` | Read any resource (brands, users) | Regular users |
| `write` | Create and update resources | Editors |
| `admin` | Full platform access | Administrators |
| `users:create` | Register new users | Service clients (client credentials flow) |

---

## How to Read Grants on the Frontend

The JWT is a Base64-encoded string. The payload (second segment) can be decoded without a library:

### JavaScript

```js
function parseJwt(token) {
  const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
}

const payload = parseJwt(access_token);
// { sub: "john_doe", grants: ["read", "write"], exp: 1713483600, iat: ... }

const grants = payload.grants ?? [];

function hasGrant(grant) {
  return grants.includes(grant);
}
```

### TypeScript

```ts
interface JwtPayload {
  sub: string;
  grants: string[];
  iat: number;
  exp: number;
}

function parseJwt(token: string): JwtPayload {
  const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
}

const payload = parseJwt(access_token);
const hasGrant = (grant: string) => payload.grants.includes(grant);
```

---

## Usage Patterns

### Protect a route

```ts
// React Router example
if (!hasGrant("admin")) {
  return <Navigate to="/unauthorized" />;
}
```

### Conditionally render a button

```tsx
{hasGrant("write") && (
  <button onClick={createBrand}>New Brand</button>
)}
```

### Show admin-only sections

```tsx
{hasGrant("admin") && <AdminPanel />}
```

---

## Token Expiration

Always check the `exp` claim before using the token. If expired, redirect to login.

```ts
function isTokenExpired(token: string): boolean {
  const { exp } = parseJwt(token);
  return Date.now() >= exp * 1000;
}

if (isTokenExpired(access_token)) {
  // redirect to /login
}
```

---

## Endpoint × Grant Matrix

| Endpoint | Method | Required Grant |
|----------|--------|----------------|
| `POST /api/v1/users` | Create user | `users:create` |
| `GET /api/v1/users` | List users | _(authenticated)_ |
| `GET /api/v1/users/{username}` | Get user | _(authenticated)_ |
| `PUT /api/v1/users/{username}` | Update user | _(authenticated)_ |
| `DELETE /api/v1/users/{username}` | Delete user | _(authenticated)_ |
| `POST /api/v1/brands` | Create brand | _(authenticated)_ |
| `GET /api/v1/brands/me` | List my brands | _(authenticated)_ |
| `GET /api/v1/brands/{id}` | Get brand | _(authenticated)_ |
| `PUT /api/v1/brands/{id}` | Update brand | _(authenticated)_ |
| `DELETE /api/v1/brands/{id}` | Delete brand | _(authenticated)_ |

> _(authenticated)_ means any valid JWT is accepted — no specific grant required beyond being logged in.

---

## Security Reminder

Frontend grant checks are **UX only** — they control what the user sees, not what they can do. The backend enforces every grant independently on each request. Never rely solely on frontend checks for security.
