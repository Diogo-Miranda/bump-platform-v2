import { NextRequest, NextResponse } from "next/server"
import { fetchBackendToken } from "@/app/features/auth/services"
import { SESSION_COOKIE, SESSION_MAX_AGE } from "@/app/lib/auth"
import { decodeToken } from "@/app/lib/grants"

function resolveRedirect(accessToken: string): string {
  const payload = decodeToken(accessToken)
  if (payload?.grants.includes("platform:fullAccess")) return "/projects"
  return "/dashboard"
}

export async function POST(req: NextRequest) {
  const { username, password } = (await req.json()) as { username: string; password: string }

  const result = await fetchBackendToken(username, password)

  if (!result.ok) {
    if (result.status >= 500) {
      return NextResponse.json(
        { error: "Serviço indisponível, tente novamente mais tarde" },
        { status: 503 }
      )
    }
    return NextResponse.json(
      { error: "Usuário ou senha inválidos" },
      { status: 401 }
    )
  }

  const redirectUrl = resolveRedirect(result.accessToken)
  const res = NextResponse.json({ ok: true, redirectUrl })
  res.cookies.set(SESSION_COOKIE, result.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  })
  return res
}
