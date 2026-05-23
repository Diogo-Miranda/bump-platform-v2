import Link from "next/link"

export default function NotAuthorized() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white flex flex-col items-center justify-center gap-8">
      <p className="font-mono text-[12px] text-[#d7d7d7] uppercase tracking-widest">403</p>

      <h1
        className="font-sans text-black leading-none text-center"
        style={{ fontSize: "clamp(40px, 5.56vw, 96px)" }}
      >
        Acesso não autorizado
      </h1>

      <p className="font-mono text-[16px] text-black">
        Você não tem permissão para acessar esta página.
      </p>

      <Link
        href="/dashboard"
        className="font-mono text-[16px] text-black uppercase underline underline-offset-4 hover:opacity-60 transition-opacity"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
