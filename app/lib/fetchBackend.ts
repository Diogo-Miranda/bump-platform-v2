import { getServiceAccountIdToken } from "@/app/lib/serviceAccount"

type FetchBackendOptions = Omit<RequestInit, "headers"> & {
  userToken?: string
  headers?: Record<string, string>
}

/**
 * Fetch wrapper for all server-side calls to BUMP_BACKEND_URL.
 * When SA_KEY is set, attaches the OIDC token to Authorization (required by
 * Cloud Run) and moves the user JWT to X-User-Token. Without SA_KEY (local
 * dev without a key), falls back to sending the user JWT in Authorization.
 */
export async function fetchBackend(
  path: string,
  { userToken, headers = {}, ...init }: FetchBackendOptions = {}
): Promise<Response> {
  const baseUrl = process.env.BUMP_BACKEND_URL
  if (!baseUrl) throw new Error("BUMP_BACKEND_URL is not set")

  const saToken = await getServiceAccountIdToken()

  const authHeaders: Record<string, string> = {
    ...(saToken
      ? { Authorization: `Bearer ${saToken}` }
      : userToken
        ? { Authorization: `Bearer ${userToken}` }
        : {}),
    ...(userToken ? { "X-User-Token": userToken } : {}),
  }

  return fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...headers,
    },
  })
}
