export default function WeatherRainIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rainy"
    >
      {/* Cloud */}
      <path
        d="M6 16a4 4 0 0 1-.5-7.97A5 5 0 0 1 16 9h1a3 3 0 0 1 0 6H6z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Rain drops */}
      <line x1="8" y1="19" x2="8" y2="21" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="19" x2="12" y2="21" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="19" x2="16" y2="21" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="21" x2="10" y2="23" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="21" x2="14" y2="23" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
