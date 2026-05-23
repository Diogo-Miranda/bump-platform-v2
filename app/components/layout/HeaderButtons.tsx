import StoreIcon from "@/app/components/ui/icons/StoreIcon"

interface Props {
  userInitials?: string
  theme?: 'light' | 'dark'
  buttons?: 'bumper' | 'store'
}

export default function HeaderButtons({
  userInitials = "NS",
  theme = 'light',
  buttons = 'bumper',
}: Props) {
  const isDark = theme === 'dark'

  return (
    <div className="flex items-center gap-3">
      {buttons === 'store' ? (
        /* Store icon button */
        <button
          style={{
            height: "clamp(40px, 5.64vh, 80px)",
            width: "clamp(40px, 5.64vh, 80px)",
            borderRadius: "50%",
            border: isDark ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.15)",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            cursor: "pointer",
          }}
        >
          <StoreIcon theme={theme} />
        </button>
      ) : (
        /* BUMPER.AI pill — w=189px h=64px at 2016×1134 */
        <div
          style={{
            height: "clamp(40px, 5.64vh, 80px)",
            width: "clamp(120px, 9.375vw, 240px)",
            borderRadius: "44.8px",
            border: isDark ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.05)",
            backdropFilter: "blur(4px)",
            background: isDark ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)",
            boxShadow: isDark ? "inset 0px 0px 2px 0px rgba(0,0,0,0.15)" : "inset 0px 0px 2px 0px rgba(255,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            paddingLeft: "clamp(16px, 1.59vw, 40px)",
            paddingRight: "clamp(16px, 1.59vw, 40px)",
            position: "relative",
            zIndex: 10,
            flexShrink: 0,
            transform: "translateX(-5px)",
          }}
        >
          <span
            className={isDark ? "font-mono text-black" : "font-mono text-white"}
            style={{ fontSize: "clamp(12px, 1.41vh, 20px)" }}
          >
            BUMPER.<em className="italic uppercase">AI</em>
          </span>
        </div>
      )}

      {/* NS avatar — w=h=64px at 2016×1134 */}
      <div
        style={{
          height: "clamp(40px, 5.64vh, 80px)",
          width: "clamp(40px, 5.64vh, 80px)",
          borderRadius: "50%",
          background: isDark ? "black" : "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginLeft: buttons === 'bumper' ? "-20px" : 0,
          position: "relative",
          zIndex: 0,
        }}
      >
        <span
          className={isDark ? "font-mono text-white" : "font-mono text-black"}
          style={{ fontSize: "clamp(11px, 1.41vh, 18px)" }}
        >
          {userInitials}
        </span>
      </div>
    </div>
  )
}
