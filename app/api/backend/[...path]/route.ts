import { NextRequest, NextResponse } from "next/server"
import { fetchBackend } from "@/app/lib/fetchBackend"

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
  const hasBody = !["GET", "HEAD", "DELETE"].includes(req.method)

  const upstream = await fetchBackend(`/api/v1/${path.join("/")}${search}`, {
    method: req.method,
    userToken,
    body: hasBody ? await req.text() : undefined,
  })

  const data = upstream.status !== 204 ? await upstream.json() : null
  return NextResponse.json(data, { status: upstream.status })
}

export const GET = proxy
export const POST = proxy
export const PUT = proxy
export const DELETE = proxy
