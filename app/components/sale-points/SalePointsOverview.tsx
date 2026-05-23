"use client"

import { useState } from "react"
import type { SalePointsData } from "@/app/features/sale-points/types"

const ITEMS_PER_PAGE = 9

interface Props {
  data: SalePointsData
}

export default function SalePointsOverview({ data }: Props) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.items.length / ITEMS_PER_PAGE)
  const pageItems = data.items.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white">
      {/* Header */}
      <header className="absolute top-8 left-8 right-8 flex items-center justify-between z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40" fill="none">
            <path d="M22.8299 11.0905C17.0165 11.0905 14.4964 15.216 13.3739 24.3519L13.2574 24.3004V0H0.010589V24.5988H0V40H22.7452C22.7452 40 22.8087 40 22.8299 40C29.7128 40 32 32.7675 32 25.5453C32 18.323 29.7022 11.0905 22.8299 11.0905Z" fill="black"/>
          </svg>
        <div className="flex items-center gap-4">
          <button className="group flex items-center justify-center h-16 w-16 transition-colors hover:bg-black" style={{ borderRadius: "64px", border: "2px solid #000" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
              <path className="transition-colors group-hover:fill-white" d="M18.1387 0C18.7037 0.000208023 19.2047 0.351501 19.4014 0.873047L19.4365 0.979492L21.1299 6.9082C21.318 7.56649 20.9786 8.2706 20.3408 8.5127V16.75C20.3408 18.2688 19.1096 19.5 17.5908 19.5H3.59082C2.07204 19.5 0.84082 18.2688 0.84082 16.75V8.5127C0.202939 8.27064 -0.136336 7.56653 0.0517578 6.9082L1.74512 0.979492L1.78027 0.873047C1.97695 0.351493 2.47791 0.000179162 3.04297 0H18.1387ZM14.5908 7.62402C14.1725 7.86803 13.4357 8.2747 12.8115 8.4668C12.0185 8.7108 11.3145 8.84472 10.5908 8.84473C9.86709 8.84473 9.16314 8.7108 8.37012 8.4668C7.74559 8.27461 7.00808 7.868 6.58984 7.62402C6.16706 7.8707 5.43254 8.27568 4.81152 8.4668C4.19766 8.65568 3.48481 8.70629 2.85156 8.7041C2.67831 8.7035 2.50709 8.69794 2.34082 8.69043V16.75C2.34082 17.4404 2.90046 18 3.59082 18H17.5908C18.2811 18 18.8408 17.4403 18.8408 16.75V8.69043C18.6745 8.69794 18.5034 8.70349 18.3301 8.7041C17.6968 8.7063 16.984 8.65567 16.3701 8.4668C15.7488 8.27559 15.0135 7.87067 14.5908 7.62402ZM7.37695 6.34668C7.78336 6.58217 8.3735 6.89843 8.81152 7.0332C9.5114 7.24854 10.0611 7.34473 10.5908 7.34473C11.1205 7.34472 11.6702 7.24854 12.3701 7.0332C12.8081 6.89841 13.3983 6.58216 13.8047 6.34668L13.8027 6.32715L13.4014 1.5H7.78027L7.37695 6.34668ZM1.54785 7.125C1.92343 7.16577 2.38535 7.20245 2.85645 7.2041C3.43087 7.20611 3.96841 7.15678 4.37012 7.0332C4.83696 6.88954 5.47352 6.54138 5.875 6.30566L6.27637 1.5H3.15625L1.54785 7.125ZM15.3066 6.30566C15.7081 6.54139 16.3447 6.88956 16.8115 7.0332C17.2132 7.15677 17.7508 7.20611 18.3252 7.2041C18.7959 7.20245 19.2574 7.16573 19.6328 7.125L18.0254 1.5H14.9053L15.3066 6.30566Z" fill="black"/>
            </svg>
          </button>
          <button className="group flex h-16 w-16 items-center justify-center rounded-full border-2 border-black transition-colors hover:bg-black">
            <span className="font-mono text-[16px] text-black transition-colors group-hover:text-white">NS</span>
          </button>
        </div>
      </header>

      {/* Headline */}
      <div
        className="absolute z-10 flex flex-col gap-8"
        style={{ left: "clamp(100px, 12.15vw, 260px)", top: "clamp(80px, 10vh, 140px)" }}
      >
        <h1
          className="font-sans text-black leading-none"
          style={{ fontSize: "clamp(48px, 5.56vw, 96px)" }}
        >
          Pontos de Venda
        </h1>
        <p className="font-sans text-black text-[16px] leading-relaxed max-w-[659px]">
          Manage and visualize content for top brands. Explore the possibilities!
        </p>
      </div>

      {/* Vertical divider */}
      <div
        className="absolute z-10 bg-black"
        style={{
          width: "2px",
          left: "61.25%",
          top: "clamp(80px, 11vh, 140px)",
          height: "clamp(48px, 5.56vw, 64px)",
        }}
      />

      {/* Add button */}
      <div
        className="absolute z-10 flex items-center"
        style={{
          left: "67%",
          top: "clamp(80px, 10vh, 140px)",
          height: "clamp(48px, 5.56vw, 96px)",
        }}
      >
        <button className="flex items-center rounded-full border-2 border-black font-mono text-[16px] text-black uppercase hover:bg-black hover:text-white transition-colors whitespace-nowrap" style={{ paddingTop: "15px", paddingBottom: "15px", paddingLeft: "25px", paddingRight: "25px" }}>
          ADICIONAR PONTO DE VENDA
        </button>
      </div>

      {/* Table */}
      <div
        className="absolute"
        style={{
          top: "clamp(200px, 35.27vh, 500px)",
          left: "clamp(100px, 12.15vw, 260px)",
          right: "clamp(16px, 1.85vw, 48px)",
          bottom: "clamp(120px, 22.83vh, 320px)",
        }}
      >
        <table className="w-full border-collapse text-[12px] text-black font-sans">
          <tbody>
            {pageItems.map((pdv) => (
              <tr key={pdv.id} className="border-b border-[#DADADA]" style={{ height: "clamp(30px, 4.48vh, 70px)" }}>
                <td className="px-4 align-middle">{pdv.name}</td>
                <td className="px-4 align-middle">{pdv.chain}</td>
                <td className="px-4 align-middle">{pdv.city}</td>
                <td className="px-4 align-middle">{pdv.brand}</td>
                <td className="px-4 align-middle">t {pdv.screens.find(s => s.label === "T")?.resolution}</td>
                <td className="px-4 align-middle">r1 {pdv.screens.find(s => s.label === "R1")?.resolution}</td>
                <td className="px-4 align-middle">r2 {pdv.screens.find(s => s.label === "R2")?.resolution}</td>
                <td className="px-4 align-middle">r3 {pdv.screens.find(s => s.label === "R3")?.resolution}</td>
                <td className="px-4 align-middle">{pdv.provider}</td>
                <td className="px-4 align-middle text-right">
                  <a href="#" className="font-mono uppercase underline whitespace-nowrap hover:opacity-60">
                    VISUALIZAR
                  </a>
                </td>
                <td className="px-4 align-middle text-right">
                  <a href="#" className="font-mono uppercase underline whitespace-nowrap hover:opacity-60">
                    EDITAR
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="absolute z-10 flex items-center gap-6"
        style={{
          left: "clamp(100px, 12.15vw, 260px)",
          bottom: "clamp(60px, 11.46vh, 160px)",
        }}
      >
        <button
          aria-label="Anterior"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-black hover:opacity-80 transition-opacity disabled:opacity-30"
        >
          <ArrowLeftIcon />
        </button>
        <span className="font-mono text-[12px]">
          <span className="text-black">{String(currentPage).padStart(2, "0")}</span>
          <span className="text-[#d7d7d7]">/{String(totalPages).padStart(2, "0")}</span>
        </span>
        <button
          aria-label="Próximo"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-black hover:opacity-80 transition-opacity disabled:opacity-30"
        >
          <ArrowRightIcon />
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-10">
        <nav className="flex items-center gap-4">
          <a href="#" className="font-mono text-[12px] text-black uppercase underline">CONTATO</a>
          <a href="#" className="font-mono text-[12px] text-black uppercase underline">TERMOS DE USO</a>
        </nav>
        <p className="font-mono text-[12px] text-black whitespace-pre">{`NYC   UTC-4   40.71°N 74.00°W`}</p>
      </div>
    </div>
  )
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M15 8H1M1 8L7 2M1 8L7 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 8H15M15 8L9 2M15 8L9 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
