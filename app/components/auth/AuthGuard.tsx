import { getSession } from "@/app/lib/auth"
import { redirect } from "next/navigation"

export default async function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = await getSession()
  if (!token) redirect("/login")
  return <>{children}</>
}
