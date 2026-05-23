import type { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
}

export default function GlassPill({ children, className = "" }: Props) {
  return (
    <div
      className={`flex items-center rounded-full border border-white/5 px-10 h-16 transition-opacity hover:opacity-80 ${className}`}
      style={{
        backdropFilter: "blur(4px)",
        background: "rgba(255,255,255,0.13)",
        boxShadow: "inset 0 0 2px rgba(255,255,255,0.5)",
      }}
    >
      {children}
    </div>
  )
}
