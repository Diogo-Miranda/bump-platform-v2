import { NextRequest, NextResponse } from "next/server"
import { getServiceAccountIdToken } from "@/app/lib/serviceAccount"

const BUMP_BACKEND_URL = process.env.BUMP_BACKEND_URL!

async function proxy(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const userToken = req.cookies.get("auth_token")?.value

  if (!userToken) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 })
  }

  const { path } = await params
  const search = req.nextUrl.search
  const url = `${BUMP_BACKEND_URL}/api/v1/${path.join("/")}${search}`
  const hasBody = !["GET", "HEAD", "DELETE"].includes(req.method)

  const saToken = await getServiceAccountIdToken()

  // In production: Cloud Run requires the OIDC token in Authorization.
  // The user JWT travels in X-User-Token so the backend can identify the user.
  // In development: keep the original behavior (user JWT in Authorization).
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(saToken
      ? {
          Authorization: `Bearer ${saToken}`,
          "X-User-Token": userToken,
        }
      : {
          Authorization: `Bearer ${userToken}`,
        }),
  }

  const upstream = await fetch(url, {
    method: req.method,
    headers,
    body: hasBody ? await req.text() : undefined,
  })

  const data = upstream.status !== 204 ? await upstream.json() : null
  return NextResponse.json(data, { status: upstream.status })
}

export const GET = proxy
export const POST = proxy
export const PUT = proxy
export const DELETE = proxy
