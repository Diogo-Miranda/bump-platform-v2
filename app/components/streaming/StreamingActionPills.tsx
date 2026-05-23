'use client'

interface Props {
  itemId: string
  status: 'online' | 'offline'
  video?: string
}

export default function StreamingActionPills({ itemId, status, video }: Props) {
  function handleViewAnimation() {
    if (video) window.open(video, '_blank', 'noopener,noreferrer')
  }

  function handleSettings() {
    console.log('settings', itemId)
  }

  function handleDelete() {
    console.log('delete', itemId)
  }

  function handleToggleStatus() {
    console.log('toggle status', itemId, status)
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Pill label="VER ANIMAÇÃO" onClick={handleViewAnimation} />
      <Pill label="CONFIGURAÇÕES" onClick={handleSettings} disabled />
      <Pill label="DELETAR" onClick={handleDelete} disabled />
      <Pill
        label={status === 'online' ? 'TORNAR OFFLINE' : 'TORNAR ONLINE'}
        onClick={handleToggleStatus}
        disabled
      />
    </div>
  )
}

function Pill({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="font-mono uppercase whitespace-nowrap transition-colors"
      style={{
        display: 'inline-flex',
        padding: '19px 26px',
        alignItems: 'center',
        gap: '16px',
        borderRadius: '51px',
        background: '#F2F2F2',
        border: 'none',
        fontSize: '13px',
        lineHeight: 1,
        color: disabled ? '#b0b0b0' : 'black',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {label}
    </button>
  )
}
