import Link from "next/link"
import PageHeader from "@/app/components/layout/PageHeader"
import PageFooter from "@/app/components/layout/PageFooter"
import { GlassPill } from "@/app/components/dashboard/DashboardOverview"

const ACTIONS = [
  { id: "add", label: "ADICIONAR CONTEUDO", href: "/conteudo/adicionar" },
  { id: "archive", label: "ACESSAR ARQUIVO DE CONTEUDO", href: "/conteudo/arquivo" },
]

export default function ContentsOverview() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Background image — store scene */}
      {/* TODO: replace src with a permanent store/supermarket brand asset */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.figma.com/api/mcp/asset/9507c244-0338-406d-81ca-e0cac9a17748')",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

      <PageHeader />

      {/* Main content */}
      <main className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8">
        {/* Title */}
        <h1
          className="font-sans text-white text-center leading-none"
          style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
        >
          Conteúdo
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-white text-center text-[16px] leading-relaxed max-w-[1244px]">
          This project page is your gateway to managing and visualizing content.
        </p>

        {/* Action pills */}
        <div className="flex items-center gap-4 mt-4">
          {ACTIONS.map((action) => (
            <Link key={action.id} href={action.href}>
              <GlassPill>
                <span className="font-mono text-[16px] text-white">{action.label}</span>
              </GlassPill>
            </Link>
          ))}
        </div>
      </main>

      {/* Plus button — bottom right */}
      <div className="absolute bottom-24 right-8 z-10">
        <button
          aria-label="Add"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white transition-opacity hover:opacity-80"
        >
          <PlusIcon />
        </button>
      </div>

      <PageFooter />
    </div>
  )
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 1V19M1 10H19"
        stroke="#171717"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
