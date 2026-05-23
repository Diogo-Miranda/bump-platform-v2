import type { DashboardData } from "@/app/features/dashboard/types"
import PageHeader from "@/app/components/layout/PageHeader"
import PageFooter from "@/app/components/layout/PageFooter"
import CardsCarousel from "@/app/components/dashboard/CardsCarousel"

interface Props {
  data: DashboardData
}

export default function DashboardOverview({ data }: Props) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#1a1a2e]">
      {/* Background image — TODO: replace with actual dashboard bg asset */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center scale-x-[-1]"
        style={{ backgroundImage: "url('/dash-bg.jpg')" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

      <PageHeader />

      {/* Main content */}
      <main className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <h1
          className="font-sans text-white text-center leading-none"
          style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
        >
          {data.title}
        </h1>

        <p className="font-sans text-white text-center text-[16px] leading-relaxed max-w-[634px]">
          {data.subtitle}
        </p>

        <CardsCarousel cards={data.cards} />
      </main>

      <PageFooter />
    </div>
  )
}
