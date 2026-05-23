import { NextRequest, NextResponse } from 'next/server'

const BUMP_BACKEND_URL = process.env.BUMP_BACKEND_URL!

async function proxy(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const token = req.cookies.get('auth_token')?.value

  if (!token) {
    return NextResponse.json({ detail: 'Not authenticated' }, { status: 401 })
  }

  const { path } = await params
  const search = req.nextUrl.search
  const url = `${BUMP_BACKEND_URL}/api/v1/${path.join('/')}${search}`
  const hasBody = !['GET', 'HEAD', 'DELETE'].includes(req.method)

  const upstream = await fetch(url, {
    method: req.method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: hasBody ? await req.text() : undefined,
  })

  const data = upstream.status !== 204 ? await upstream.json() : null
  return NextResponse.json(data, { status: upstream.status })
}

export const GET    = proxy
export const POST   = proxy
export const PUT    = proxy
export const DELETE = proxy
