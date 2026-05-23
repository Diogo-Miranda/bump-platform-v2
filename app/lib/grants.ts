import { getSession } from "@/app/lib/auth"

// Known grants issued by the backend. Extend as new roles are documented.
export type Grant = "read" | "write" | "platform:fullAccess" | (string & {})

export interface JwtPayload {
  sub: string
  grants: Grant[]
  iat: number
  exp: number
}

// ---------------------------------------------------------------------------
// Token decoding
// JWT payload is base64url-encoded — decoding does not require the secret.
// Verification happens on the backend; the HTTP-only cookie prevents tampering.
// ---------------------------------------------------------------------------

function decodeBase64Url(str: string): string {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/")
  const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=")
  return Buffer.from(padded, "base64").toString("utf-8")
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null
    return JSON.parse(decodeBase64Url(parts[1])) as JwtPayload
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Grant helpers — accept a raw token string
// ---------------------------------------------------------------------------

export function getGrants(token: string): Grant[] {
  return decodeToken(token)?.grants ?? []
}

export function hasGrant(token: string, grant: Grant): boolean {
  return getGrants(token).includes(grant)
}

export function hasAnyGrant(token: string, grants: Grant[]): boolean {
  const tokenGrants = getGrants(token)
  return grants.some((g) => tokenGrants.includes(g))
}

export function hasAllGrants(token: string, grants: Grant[]): boolean {
  const tokenGrants = getGrants(token)
  return grants.every((g) => tokenGrants.includes(g))
}

// ---------------------------------------------------------------------------
// Server-side helpers — read from the session cookie automatically
// Only call these from Server Components or Route Handlers
// ---------------------------------------------------------------------------

export async function getSessionPayload(): Promise<JwtPayload | null> {
  const token = await getSession()
  if (!token) return null
  return decodeToken(token)
}

export async function getSessionGrants(): Promise<Grant[]> {
  const token = await getSession()
  if (!token) return []
  return getGrants(token)
}

export async function sessionHasGrant(grant: Grant): Promise<boolean> {
  const token = await getSession()
  if (!token) return false
  return hasGrant(token, grant)
}

export async function sessionHasAnyGrant(grants: Grant[]): Promise<boolean> {
  const token = await getSession()
  if (!token) return false
  return hasAnyGrant(token, grants)
}
