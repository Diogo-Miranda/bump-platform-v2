export default function WeatherSunIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sunny"
    >
      {/* Center circle */}
      <circle cx="12" cy="12" r="4" stroke="black" strokeWidth="1.5" />
      {/* Rays */}
      <line x1="12" y1="2" x2="12" y2="5" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="19" x2="12" y2="22" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="12" x2="5" y2="12" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="19" y1="12" x2="22" y2="12" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
