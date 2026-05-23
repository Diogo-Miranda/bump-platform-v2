interface Props {
  coordinates?: string
  showActionPills?: boolean
}

export default function PageFooter({
  coordinates = "NYC   UTC-4   40.71°N 74.00°W",
  showActionPills = true,
}: Props) {
  return (
    <>  
      {/* Nav links — 400px from left, 41px from bottom at 2016×1134 */}
      <nav
        className="absolute z-10 flex items-center"
        style={{
          left: "clamp(150px, 19.84vw, 500px)",
          bottom: "clamp(20px, 3.62vh, 55px)",
          gap: "clamp(20px, 1.98vw, 55px)",
        }}
      >
        <a
          href="#"
          className="font-mono text-white uppercase"
          style={{ fontSize: "clamp(12px, 1.41vh, 20px)" }}
        >
          Contato
        </a>
        <a
          href="#"
          className="font-mono text-white uppercase"
          style={{ fontSize: "clamp(12px, 1.41vh, 20px)" }}
        >
          Termos de uso
        </a>
      </nav>

      {/* Location info — 162px from right, 41px from bottom at 2016×1134 */}
      <p
        className="absolute z-10 font-mono text-white whitespace-pre"
        style={{
          right: "clamp(60px, 8.04vw, 200px)",
          bottom: "clamp(20px, 3.62vh, 55px)",
          fontSize: "clamp(12px, 1.41vh, 20px)",
        }}
      >
        {coordinates}
      </p>

      {/* Action pills — 239px from right, 92px from bottom at 2016×1134 */}
      {showActionPills && <div
        className="absolute z-10 flex items-center"
        style={{
          right: "clamp(80px, 11.86vw, 300px)",
          bottom: "clamp(50px, 8.11vh, 130px)",
          gap: "clamp(20px, 1.98vw, 55px)",
        }}
      >
        <FooterPill label="Conteúdo" />
        <FooterPill label="Ponto de Venda" />
        <FooterArrow />
      </div>}
    </>
  )
}

function FooterPill({ label }: { label: string }) {
  return (
    <div
      className="flex items-center rounded-full border border-white/5"
      style={{
        paddingLeft: "32px",
        paddingRight: "32px",
        height: "64px",
        flexShrink: 0,
        backdropFilter: "blur(4px)",
        background: "rgba(255,255,255,0.1)",
        boxShadow: "inset 0 0 2px rgba(255,255,255,0.5)",
      }}
    >
      <span
        className="font-mono text-white uppercase"
        style={{ fontSize: "clamp(12px, 1.41vh, 20px)" }}
      >
        {label}
      </span>
    </div>
  )
}

function FooterArrow() {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-white"
      style={{ height: "64px", width: "64px", flexShrink: 0 }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M1 8H15M15 8L9 2M15 8L9 14"
          stroke="#171717"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
