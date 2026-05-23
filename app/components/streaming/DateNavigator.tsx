'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  date: string // ISO: "2025-10-20"
}

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

function formatDisplay(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstWeekday(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

function toISO(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function DateNavigator({ date }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const [year, month] = date.split('-').map(Number)
  const [calYear, setCalYear] = useState(year)
  const [calMonth, setCalMonth] = useState(month - 1)

  function navigateTo(iso: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('date', iso)
    router.push(`?${params.toString()}`)
    setOpen(false)
  }

  function shiftMonth(dir: number) {
    const d = new Date(calYear, calMonth + dir, 1)
    setCalYear(d.getFullYear())
    setCalMonth(d.getMonth())
  }

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const daysInMonth = getDaysInMonth(calYear, calMonth)
  const firstWeekday = getFirstWeekday(calYear, calMonth)

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '491px',
          height: '116px',
          borderRadius: '64px',
          border: '1px solid #DADADA',
          background: '#FFF',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {/* Chevron icon */}
        <span style={{ position: 'absolute', left: '24px', display: 'flex', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9" fill="none" aria-hidden="true">
            <path d="M0.999999 1L9 8L17 1" stroke="#DADADA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        {/* Date label */}
        <p
          style={{
            color: '#000',
            textAlign: 'center',
            fontFamily: '"DM Sans"',
            fontSize: '64px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '108%',
          }}
        >
          {formatDisplay(date)}
        </p>
      </button>

      {/* Calendar dropdown */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 12px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '491px',
            background: '#FFF',
            borderRadius: '24px',
            border: '1px solid #DADADA',
            boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
            padding: '24px',
            zIndex: 50,
          }}
        >
          {/* Month navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <button
              onClick={() => shiftMonth(-1)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', fontFamily: '"DM Sans"', fontSize: '14px', color: '#000' }}
            >
              ‹
            </button>
            <span style={{ fontFamily: '"DM Sans"', fontSize: '16px', fontWeight: 500, color: '#000' }}>
              {MONTHS[calMonth]} {calYear}
            </span>
            <button
              onClick={() => shiftMonth(1)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', fontFamily: '"DM Sans"', fontSize: '14px', color: '#000' }}
            >
              ›
            </button>
          </div>

          {/* Weekday headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '8px' }}>
            {WEEKDAYS.map((wd) => (
              <span
                key={wd}
                style={{ textAlign: 'center', fontFamily: '"DM Sans"', fontSize: '11px', color: '#ADADAD', fontWeight: 500 }}
              >
                {wd}
              </span>
            ))}
          </div>

          {/* Day grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {Array.from({ length: firstWeekday }).map((_, i) => (
              <span key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const iso = toISO(calYear, calMonth, day)
              const isSelected = iso === date

              return (
                <button
                  key={day}
                  onClick={() => navigateTo(iso)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '36px',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: '"DM Sans"',
                    fontSize: '13px',
                    background: isSelected ? '#075EDD' : 'transparent',
                    color: isSelected ? '#FFF' : '#000',
                    fontWeight: isSelected ? 600 : 400,
                  }}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
