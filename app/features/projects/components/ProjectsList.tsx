"use client"

import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import HeaderButtons from "@/app/components/layout/HeaderButtons"
import PageFooter from "@/app/components/layout/PageFooter"
import BumpLogo from "@/app/components/layout/BumpLogo"
import type { Brand } from "@/app/features/brands/types"

const LINE_HEIGHT = 128

function getBrandHeight(name: string): number {
  return name.trim().split(/\s+/).length * LINE_HEIGHT
}

interface Props {
  brands: Brand[]
}

export default function ProjectsList({ brands }: Props) {
  const router = useRouter()
  const listRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const targetRef = useRef(0)
  const [isScrollable, setIsScrollable] = useState(false)

  const listHeight = brands.reduce((sum, b) => sum + getBrandHeight(b.name), 0)

  useEffect(() => {
    setIsScrollable(listHeight > window.innerHeight)
  }, [listHeight])

  useEffect(() => {
    if (!isScrollable) return
    const el = listRef.current
    if (!el) return

    const AUTO_SPEED = 0.6

    const animate = () => {
      targetRef.current += AUTO_SPEED
      posRef.current += (targetRef.current - posRef.current) * 0.08

      if (posRef.current >= listHeight) {
        posRef.current -= listHeight
        targetRef.current -= listHeight
      }
      if (posRef.current < 0) {
        posRef.current += listHeight
        targetRef.current += listHeight
      }

      el.style.transform = `translateY(-${posRef.current}px)`
      rafRef.current = requestAnimationFrame(animate)
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      targetRef.current += e.deltaY * 0.8
    }

    rafRef.current = requestAnimationFrame(animate)
    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("wheel", handleWheel)
    }
  }, [isScrollable, listHeight])

  if (brands.length === 0) return null

  // Duplica apenas quando há scroll para o loop seamless
  const displayedBrands = isScrollable ? [...brands, ...brands] : brands

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Background */}
      <div aria-hidden="true" className="absolute inset-0">
        <img src="/cart-bg.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Header */}
      <header className="absolute top-8 left-8 right-8 z-10 flex items-center justify-between">
        <BumpLogo />
        <HeaderButtons />
      </header>

      {/* Left content */}
      <div
        className="absolute z-10 flex flex-col gap-8"
        style={{ left: "calc(12.5% + 26px)", top: "calc(12.5% + 26px)" }}
      >
        <p
          className="font-sans font-normal leading-none text-white"
          style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
        >
          Clientes
        </p>
        <p
          className="font-sans font-normal text-white"
          style={{ fontSize: "clamp(13px, 1vw, 15px)", lineHeight: "1.6", width: "clamp(260px, 25vw, 340px)" }}
        >
          Gerencie e visualize conteúdos para as principais marcas. Explore as possibilidades!
        </p>
        <button
          className="flex h-14 w-14 items-center justify-center rounded-full"
          aria-label="Adicionar cliente"
        >
          <img src="/group-b.svg" alt="" className="h-14 w-14" />
        </button>
      </div>

      {/* Brand list — paddingTop: 50vh inicia a lista do centro da tela */}
      <div
        className="absolute top-0 bottom-0 z-10 overflow-hidden"
        style={{ left: "calc(37.5% + 14px)", paddingTop: "30vh" }}
      >
        <div
          ref={listRef}
          className="flex flex-col"
          style={{ willChange: isScrollable ? "transform" : "auto" }}
        >
          {displayedBrands.map((brand, i) => {
            const words = brand.name.trim().split(/\s+/)
            return (
              <div
                key={`${brand.slug}-${i}`}
                onClick={() => router.push(`/streaming/${brand.slug}`)}
                className="cursor-pointer transition-opacity hover:opacity-70"
              >
                {words.map((word, wi) => (
                  <div
                    key={wi}
                    className="font-sans font-normal text-white"
                    style={{ fontSize: `${LINE_HEIGHT}px`, lineHeight: "1", height: `${LINE_HEIGHT}px`, overflow: "hidden" }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* ACESSAR button */}
      <button
        className="absolute z-10 rounded-[56px] font-mono text-[16px] uppercase text-white transition-colors hover:bg-white/20"
        style={{
          left: "calc(62.5% + 101px)",
          top: "calc(6.25% + 38px)",
          padding: "20px 42px",
          backdropFilter: "blur(3.6px)",
          background: "rgba(255,255,255,0.13)",
          border: "1px solid rgba(255,255,255,0.01)",
        }}
      >
        ACESSAR
      </button>

      <PageFooter showActionPills={false} />
    </div>
  )
}
