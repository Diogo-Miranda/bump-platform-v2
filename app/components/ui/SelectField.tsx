interface Option {
  value: string
  label: string
}

interface Props {
  name: string
  placeholder: string
  options?: Option[]
  defaultValue?: string
  required?: boolean
}

export default function SelectField({
  name,
  placeholder,
  options = [],
  defaultValue,
  required,
}: Props) {
  return (
    <div className="relative w-full">
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="h-16 w-full appearance-none rounded-lg border border-[#eaeaea] bg-[#f2f2f2] px-6 font-mono text-[16px] uppercase text-[#6e6e6e] outline-none focus:border-black/20 focus:bg-white transition-colors cursor-pointer"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {/* Chevron */}
      <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden="true">
          <path
            d="M1 1L7 7L13 1"
            stroke="#6e6e6e"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
