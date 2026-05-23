interface Props {
  className?: string
  theme?: 'light' | 'dark'
}

export default function BumpLogo({ className, theme = 'light' }: Props) {
  return (
    <img
      src={theme === 'dark' ? '/logo-dark.svg' : '/logo.svg'}
      alt="Bump"
      width={32}
      height={40}
      className={className}
    />
  )
}
