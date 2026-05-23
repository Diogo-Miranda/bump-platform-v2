import PageHeader from "@/app/components/layout/PageHeader"
import PageFooter from "@/app/components/layout/PageFooter"
import type { ContentProject } from "@/app/features/contents/types"

interface Props {
  data: ContentProject
}

export default function ContentProject({ data }: Props) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#075edd]">
      <PageHeader />

      <main className="absolute inset-0 px-[calc(12.5%+26px)] pt-[calc(12.5%+26px)]">
        {/* Title row */}
        <div className="flex items-start gap-16">
          {/* Left: brand info */}
          <div className="flex flex-col gap-6">
            <h1 className="font-sans text-[32px] text-white font-normal leading-none whitespace-nowrap">
              {data.title}
            </h1>
            <p className="font-sans text-[16px] text-white leading-relaxed w-[194px]">
              {data.description}
            </p>
          </div>

          {/* ADD NEW pill */}
          <button
            className="flex h-16 items-center px-10 rounded-full font-mono text-[16px] text-white transition-opacity hover:opacity-80 cursor-pointer whitespace-nowrap"
            style={{
              backdropFilter: "blur(3.6px)",
              background: "rgba(255,255,255,0.13)",
              border: "1px solid rgba(255,255,255,0.01)",
            }}
          >
            ADD NEW
          </button>
        </div>

        {/* Content area — empty state, items will go here */}
        <div className="mt-16 flex-1" />
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
