import HeaderButtons from "@/app/components/layout/HeaderButtons"
import BumpLogo from "@/app/components/layout/BumpLogo"

interface Props {
  userInitials?: string
  theme?: 'light' | 'dark'
  buttons?: 'bumper' | 'store'
}

export default function PageHeader({
  userInitials = "NS",
  theme = 'light',
  buttons = 'bumper',
}: Props) {
  return (
    <header className="absolute top-8 left-8 right-8 flex items-center justify-between z-10">
      <BumpLogo theme={theme} />
      <HeaderButtons userInitials={userInitials} theme={theme} buttons={buttons} />
    </header>
  )
}
