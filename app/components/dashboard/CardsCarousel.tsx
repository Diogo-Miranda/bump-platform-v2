"use client"

import { useRef, useEffect } from "react"
import type { DashboardCard, MetricCard, MetricBigNumberCard, FeedCard } from "@/app/features/dashboard/types"

const CARD_WIDTH = 404
const CARD_GAP = 16
const ITEM_WIDTH = CARD_WIDTH + CARD_GAP
const AUTO_SPEED = 0.5

export default function CardsCarousel({ cards }: { cards: DashboardCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const targetRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const totalWidth = cards.length * ITEM_WIDTH

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const animate = () => {
      targetRef.current += AUTO_SPEED
      posRef.current += (targetRef.current - posRef.current) * 0.08

      if (posRef.current >= totalWidth) {
        posRef.current -= totalWidth
        targetRef.current -= totalWidth
      }
      if (posRef.current < 0) {
        posRef.current += totalWidth
        targetRef.current += totalWidth
      }

      el.style.transform = `translateX(-${posRef.current}px)`
      rafRef.current = requestAnimationFrame(animate)
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      targetRef.current += (e.deltaX || e.deltaY) * 0.8
    }

    rafRef.current = requestAnimationFrame(animate)
    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("wheel", handleWheel)
    }
  }, [totalWidth])

  return (
    <div className="w-full overflow-hidden" style={{ paddingLeft: "30px" }}>
      <div
        ref={trackRef}
        className="flex"
        style={{ gap: `${CARD_GAP}px`, willChange: "transform" }}
      >
        {[...cards, ...cards].map((card, i) => (
          <DashCard key={`${card.id}-${i}`} card={card} />
        ))}
      </div>
    </div>
  )
}

function DashCard({ card }: { card: DashboardCard }) {
  const bg =
    card.variant === "dark"
      ? "bg-[rgba(47,47,47,0.5)]"
      : "bg-[rgba(255,255,255,0.07)]"

  const height =
    card.kind === "feed"
      ? "clamp(280px, 33.7vh, 420px)"
      : card.kind === "metric-big-number"
      ? "clamp(260px, 32.5vh, 430px)"
      : "clamp(240px, 29.3vh, 382px)"

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border border-white/35 overflow-hidden transition-colors duration-300 hover:bg-white ${bg}`}
      style={{
        width: `${CARD_WIDTH}px`,
        flexShrink: 0,
        height,
        backdropFilter: "blur(7.58px)",
        padding: "clamp(16px, 2.5vw, 32px)",
      }}
    >
      {/* Inner glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: "inset 0 0 2px rgba(255,255,255,0.5)" }}
      />

      {card.kind === "metric" ? (
        <MetricCardContent card={card} />
      ) : card.kind === "metric-big-number" ? (
        <MetricBigNumberCardContent card={card} />
      ) : (
        <FeedCardContent card={card} />
      )}
    </div>
  )
}

function CardHeader({ label, index }: { label: string; index: string }) {
  return (
    <div className="flex items-start justify-between text-white group-hover:text-black text-[16px] relative z-10 transition-colors duration-300">
      <span className="font-sans font-bold uppercase leading-none">{label}</span>
      <span className="font-sans font-light leading-none">{index}</span>
    </div>
  )
}

function MetricBigNumberCardContent({ card }: { card: MetricBigNumberCard }) {
  const fontSize = "clamp(80px, 14.1vh, 220px)"

  return (
    <>
      <CardHeader label={card.label} index={card.index} />
      <div
        className="relative z-10 flex flex-1 flex-col items-start w-full"
        style={{ marginTop: "clamp(48px, 11.3vh, 160px)" }}
      >
        <p className="font-sans text-white group-hover:text-black leading-none w-full text-left transition-colors duration-300" style={{ fontSize }}>
          {card.value}
        </p>
        {card.subtitle && (
          <p className="font-sans text-white/70 group-hover:text-black/70 w-full leading-snug transition-colors duration-300" style={{ fontSize: "clamp(11px, 1.3vh, 14px)" }}>
            {card.subtitle}
          </p>
        )}
      </div>
    </>
  )
}

function MetricCardContent({ card }: { card: MetricCard }) {
  const fontSize = "clamp(48px, 8.5vh, 120px)"

  return (
    <>
      <CardHeader label={card.label} index={card.index} />
      <div
        className="relative z-10 flex flex-1 flex-col items-start gap-3 w-full"
        style={{ marginTop: "clamp(48px, 11.3vh, 160px)" }}
      >
        <p className="font-sans text-white group-hover:text-black leading-none w-full text-left transition-colors duration-300" style={{ fontSize }}>
          {card.value}
        </p>
        {card.subtitle && (
          <p className="font-sans text-white/70 group-hover:text-black/70 w-full leading-snug transition-colors duration-300" style={{ fontSize: "clamp(11px, 1.3vh, 14px)" }}>
            {card.subtitle}
          </p>
        )}
      </div>
    </>
  )
}

function FeedCardContent({ card }: { card: FeedCard }) {
  return (
    <>
      <CardHeader label={card.label} index={card.index} />
      <p className="relative z-10 mt-3 font-sans text-white/50 group-hover:text-black/50 text-[12px] leading-none transition-colors duration-300">
        {card.lastUpdated}
      </p>

      <div className="relative z-10 flex flex-1 items-center justify-center">
        {card.ellipse && (
          <>
            <img src="/ellipse.svg" alt="" aria-hidden="true" className="h-[18px] group-hover:hidden" />
            <img src="/ellipse-black.svg" alt="" aria-hidden="true" className="h-[18px] hidden group-hover:block" />
          </>
        )}
      </div>

      <ul className="relative z-10 flex flex-col gap-3 list-none">
        {card.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-white/60 group-hover:bg-black/60 transition-colors duration-300" />
            <span className="font-sans text-white group-hover:text-black leading-snug transition-colors duration-300" style={{ fontSize: "clamp(14px, 2vh, 22px)" }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}
