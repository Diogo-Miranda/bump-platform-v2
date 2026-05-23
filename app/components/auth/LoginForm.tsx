"use client"

import { useState } from "react"
import type { LoginCredentials } from "@/app/features/auth/types"
import BumpLogo from "@/app/components/layout/BumpLogo"
import { validateLoginCredentials } from "@/app/features/auth/schemas"

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const credentials: LoginCredentials = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    }

    const validationError = validateLoginCredentials(credentials)
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError(null)

    const authRes = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: credentials.username, password: credentials.password }),
    }).catch(() => null)

    setLoading(false)

    if (!authRes?.ok) {
      const body = (await authRes?.json().catch(() => ({}))) as { error?: string }
      setError(body.error ?? "Erro de autenticação")
      return
    }

    const { redirectUrl } = (await authRes.json()) as { redirectUrl: string }
    window.location.href = redirectUrl
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#b3b3b3]">
      {/* Blurred radial gradient — ambient light effect */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: "1900px",
          height: "1193px",
          left: "-68px",
          top: "-76px",
          filter: "blur(100px)",
          background:
            "radial-gradient(ellipse 94% 95% at 49% 39%, rgba(7,94,221,1) 0%, rgba(22,151,236,1) 20.38%, rgba(36,207,251,1) 40.76%, rgba(70,199,235,1) 54.2%, rgba(104,191,219,1) 67.65%, rgba(161,203,214,1) 76.37%, rgba(218,215,209,1) 85.1%, rgba(237,237,237,1) 100%)",
        }}
      />

      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/login-bg.png')" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/10 mix-blend-multiply" />

      {/* Header */}
      <header className="absolute top-8 left-8 right-8 flex items-start justify-between">
        <BumpLogo />

        <p className="font-mono text-[16px] text-white uppercase text-right max-w-[259px] leading-[1.2]">
          Bump<em className="italic">Media</em>
          {`® we own the last minute before purchase.`}
        </p>
      </header>

      {/* Main content */}
      <main className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-8">
        <h1
          className="font-sans text-white text-center leading-tight max-w-[1244px]"
          style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
        >
          Olá, pronto para transformar segundos de conversa em conversão?
        </h1>

        <div className="flex flex-col items-start gap-8">
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <input
              type="text"
              name="username"
              placeholder="USERNAME"
              autoComplete="username"
              className="h-16 w-[404px] rounded-lg border border-[#eaeaea] bg-white px-6 text-center font-mono text-[16px] uppercase text-[#6e6e6e] outline-none placeholder:text-[#6e6e6e] focus:ring-2 focus:ring-white/50"
            />
            <input
              type="password"
              name="password"
              placeholder="SENHA"
              autoComplete="current-password"
              className="h-16 w-[404px] rounded-lg border border-[#eaeaea] bg-white px-6 text-center font-mono text-[16px] uppercase text-[#6e6e6e] outline-none placeholder:text-[#6e6e6e] focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              aria-label="Entrar"
              disabled={loading}
              className="flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              <ArrowRightIcon />
            </button>
          </form>

          {error && (
            <p className="font-mono text-[14px] text-white uppercase">{error}</p>
          )}

          <a
            href="#"
            className="font-mono text-[16px] text-white uppercase underline underline-offset-2 whitespace-nowrap"
          >
            Esqueci minha senha
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-12 left-0 right-0 flex items-center justify-center">
        <div className="flex w-full max-w-5xl items-center justify-between px-8">
          <nav className="flex items-center gap-10">
            <a href="#" className="font-mono text-[16px] text-white uppercase">
              Contato
            </a>
            <a href="#" className="font-mono text-[16px] text-white uppercase">
              Termos de uso
            </a>
          </nav>
          <p className="font-mono text-[16px] text-white whitespace-pre">
            {`NYC   UTC-4   40.71°N 74.00°W`}
          </p>
        </div>
      </footer>
    </div>
  )
}

function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 8H15M15 8L9 2M15 8L9 14"
        stroke="#171717"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
