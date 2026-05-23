'use client'

import { useState } from 'react'

interface Props {
  statics: string[]
  video?: string
}

function ImageWithFallback({ src }: { src: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#f5f5f5]">
        <span className="font-mono text-[#b0b0b0] uppercase" style={{ fontSize: '11px' }}>
          Erro ao carregar imagem
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt=""
      className="absolute inset-0 w-full h-full object-cover object-center"
      onError={() => setFailed(true)}
    />
  )
}

export default function StreamingContentPreview({ statics }: Props) {
  return (
    <div className="w-full overflow-hidden">
      {statics[0] && (
        <div className="relative w-full h-[100px] overflow-hidden">
          <ImageWithFallback src={statics[0]} />
        </div>
      )}

      {statics[1] && (
        <div className="relative w-full h-[100px] overflow-hidden" style={{ marginTop: '1%' }}>
          <ImageWithFallback src={statics[1]} />
        </div>
      )}
    </div>
  )
}
