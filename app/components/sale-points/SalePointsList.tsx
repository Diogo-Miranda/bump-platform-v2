import type { SalePoint, SalePointsListData } from "@/app/features/sale-points/types"
import SalePointsNav from "@/app/components/sale-points/SalePointsNav"

interface Props {
  data: SalePointsListData
}

export default function SalePointsList({ data }: Props) {
  return (
    <div className="min-h-screen w-full bg-white">
      <SalePointsNav active="visualizar" />

      {/* Content */}
      <main className="px-[calc(12.5%+26px)] pt-16 pb-32">
        {/* Group title */}
        <h1 className="font-sans text-[32px] text-black font-normal leading-none mb-8">
          {data.groupTitle}
        </h1>

        {/* Divider */}
        <div className="h-px w-full bg-black/10 mb-0" />

        {/* PDV rows */}
        <div className="flex flex-col">
          {data.items.map((item) => (
            <PdvRow key={item.id} item={item} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination current={data.currentPage} total={data.totalPages} />
      </main>
    </div>
  )
}

function PdvRow({ item }: { item: SalePoint }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-start gap-24 py-8">
        {/* Left: info columns */}
        <div className="flex items-start gap-14 text-[16px] text-black">
          {/* Name */}
          <p className="font-sans font-bold leading-snug w-[276px]">{item.name}</p>

          {/* Brand */}
          <p className="font-sans font-normal leading-snug w-[100px]">{item.brand}</p>

          {/* Screens */}
          <div className="font-sans font-normal leading-snug w-[171px]">
            <p>{item.screens.length} {item.screens.length === 1 ? "Tela" : "Telas"}</p>
            <br />
            {item.screens.map((s) => (
              <p key={s.label}>{s.label}: {s.resolution}</p>
            ))}
          </div>

          {/* Provider */}
          <p className="font-sans font-normal leading-snug whitespace-nowrap">
            Provider: {item.provider}
          </p>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-4 ml-auto">
          {(["VISUALIZAR", "AGENDAR", "EDITAR"] as const).map((label) => (
            <button
              key={label}
              className="flex items-center justify-center rounded-full border border-black/[0.01] bg-black/10 px-10 py-5 font-mono text-[16px] text-black backdrop-blur-[3.6px] whitespace-nowrap transition-opacity hover:opacity-70 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Row divider */}
      <div className="h-px w-full bg-black/10" />
    </div>
  )
}

function Pagination({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-10 mt-12">
      {/* Prev arrow */}
      <button aria-label="Previous page" className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
        <ChevronLeftIcon />
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-10">
        {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={[
              "font-mono text-[16px] transition-opacity cursor-pointer",
              page === current ? "text-black" : "text-black/40 hover:text-black",
            ].join(" ")}
          >
            {String(page).padStart(2, "0")}
          </button>
        ))}
      </div>

      {/* Next arrow */}
      <button aria-label="Next page" className="cursor-pointer hover:opacity-70 transition-opacity">
        <ChevronRightIcon />
      </button>
    </div>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 3L5 8L10 13" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 3L11 8L6 13" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
