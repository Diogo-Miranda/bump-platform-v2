'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="font-mono uppercase text-black transition-opacity hover:opacity-70"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '19px 32px',
        borderRadius: '51px',
        background: '#F2F2F2',
        border: 'none',
        cursor: 'pointer',
        fontSize: '13px',
        lineHeight: 1,
        boxShadow: '0 4px 16px 0 rgba(0,0,0,0.12)',
      }}
    >
      ← Voltar
    </button>
  )
}
