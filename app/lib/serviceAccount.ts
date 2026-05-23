import { JWT } from "google-auth-library"

// OIDC tokens are valid for 1 hour; refresh 5 minutes before expiry
const TOKEN_TTL_MS = 55 * 60 * 1000

let cachedToken: { value: string; expiresAt: number } | null = null

interface ServiceAccountCredentials {
  client_email: string
  private_key: string
}

export async function getServiceAccountIdToken(): Promise<string | null> {
  if (process.env.NODE_ENV !== "production") return null

  const saKey = process.env.SA_KEY
  const audience = process.env.BUMP_BACKEND_URL
  if (!saKey || !audience) return null

  const now = Date.now()
  if (cachedToken && cachedToken.expiresAt > now) {
    return cachedToken.value
  }

  const credentials = JSON.parse(saKey) as ServiceAccountCredentials
  const jwt = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
  })

  const token = await jwt.fetchIdToken(audience)

  cachedToken = { value: token, expiresAt: now + TOKEN_TTL_MS }
  return token
}
