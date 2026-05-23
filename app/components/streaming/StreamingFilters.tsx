'use client'

import { useState } from 'react'
import type { StreamingFilter } from '@/app/features/streaming/types'

const FILTERS: { value: StreamingFilter; label: string }[] = [
  { value: 'latest', label: 'Últimos publicados' },
  { value: 'network', label: 'Rede' },
  { value: 'city', label: 'Cidade' },
  { value: 'shift', label: 'Turno' },
  { value: 'completed', label: 'Streaming concluídos' },
]

interface Props {
  onFilterChange?: (filter: StreamingFilter) => void
}

export default function StreamingFilters({ onFilterChange }: Props) {
  const [active, setActive] = useState<StreamingFilter>('latest')

  function handleSelect(filter: StreamingFilter) {
    setActive(filter)
    onFilterChange?.(filter)
  }

  return (
    <div>
      <p
        className="font-mono uppercase"
        style={{ fontSize: '12px', color: '#000', lineHeight: 1 }}
      >
        filtros
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
        {FILTERS.map(({ value, label }) => {
          const disabled = value !== 'latest'
          return (
            <button
              key={value}
              onClick={() => !disabled && handleSelect(value)}
              disabled={disabled}
              className="font-mono uppercase whitespace-nowrap transition-colors"
              style={{
                display: 'inline-flex',
                padding: '19px 26px',
                alignItems: 'center',
                gap: '16px',
                borderRadius: '51px',
                border: `1px solid ${disabled ? '#d0d0d0' : '#075EDD'}`,
                background: active === value ? '#075EDD' : '#FFF',
                color: active === value ? '#FFF' : disabled ? '#b0b0b0' : '#075EDD',
                boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.10)',
                fontSize: '13px',
                lineHeight: 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                marginLeft: value === 'completed' ? 'auto' : undefined,
              }}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
