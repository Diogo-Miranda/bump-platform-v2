interface Props {
  name: string
  placeholder: string
  defaultValue?: string
  required?: boolean
}

export default function FormField({ name, placeholder, defaultValue, required }: Props) {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      required={required}
      className="h-16 w-full rounded-lg border border-[#eaeaea] bg-[#f2f2f2] px-6 font-mono text-[16px] uppercase text-[#6e6e6e] outline-none placeholder:text-[#6e6e6e] focus:border-black/20 focus:bg-white transition-colors"
    />
  )
}
