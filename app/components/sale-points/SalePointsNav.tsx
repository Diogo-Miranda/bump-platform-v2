import Link from "next/link"
import BumpLogo from "@/app/components/layout/BumpLogo"

export type SalePointsTab = "visualizar" | "criar" | "adicionar-tela"

const NAV_ITEMS: { id: SalePointsTab; label: string; href: string }[] = [
  {
    id: "visualizar",
    label: "ACESSAR PONTOS DE VENDA",
    href: "/pontos-de-venda/visualizar",
  },
  {
    id: "criar",
    label: "CRIAR PONTO DE VENDA",
    href: "/pontos-de-venda/criar",
  },
  {
    id: "adicionar-tela",
    label: "ADICIONAR TELA",
    href: "/pontos-de-venda/adicionar-tela",
  },
]

interface Props {
  active: SalePointsTab
  userInitials?: string
}

export default function SalePointsNav({ active, userInitials = "NS" }: Props) {
  return (
    <header className="flex items-center justify-between px-8 py-8">
      {/* B logo */}
      <Link href="/dashboard" className="shrink-0">
        <BumpLogo />
      </Link>

      {/* Nav pills */}
      <nav className="flex items-center gap-4">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === active
          return (
            <Link
              key={item.id}
              href={item.href}
              className={[
                "flex h-16 items-center rounded-full px-10 font-mono text-[16px] transition-opacity hover:opacity-80 whitespace-nowrap",
                isActive
                  ? "bg-[#075edd] text-white"
                  : "border border-black/5 bg-black/10 text-black backdrop-blur-[3.6px]",
              ].join(" ")}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User avatar */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-black">
        <span className="font-mono text-[16px] text-white">{userInitials}</span>
      </div>
    </header>
  )
}
