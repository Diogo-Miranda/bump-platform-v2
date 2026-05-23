import { cookies } from "next/headers"

export const SESSION_COOKIE = "auth_token"
export const SESSION_MAX_AGE = 60 * 60 // 1 hour — matches backend JWT_EXPIRE_MINUTES

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value ?? null
}
