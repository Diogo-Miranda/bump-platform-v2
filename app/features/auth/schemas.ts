import type { LoginCredentials } from "@/app/features/auth/types"

export function validateLoginCredentials(credentials: LoginCredentials): string | null {
  if (!credentials.username.trim()) return "Username is required"
  if (!credentials.password.trim()) return "Password is required"
  return null
}
