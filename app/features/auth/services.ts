type TokenResult =
  | { ok: true; accessToken: string }
  | { ok: false; status: number }

export async function fetchBackendToken(username: string, password: string): Promise<TokenResult> {
  try {
    const res = await fetch(`${process.env.BUMP_BACKEND_URL}/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        client_id: process.env.OAUTH2_CLIENT_ID,
        client_secret: process.env.OAUTH2_CLIENT_SECRET,
      }),
      cache: "no-store",
    })

    if (!res.ok) return { ok: false, status: res.status }

    const data = (await res.json()) as { access_token: string }
    return { ok: true, accessToken: data.access_token }
  } catch {
    return { ok: false, status: 503 }
  }
}
