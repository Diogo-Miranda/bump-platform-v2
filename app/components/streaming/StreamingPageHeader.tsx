import { Suspense } from 'react'
import DateNavigator from '@/app/components/streaming/DateNavigator'

interface Props {
  brandName: string
  description: string
  date: string
}

export default function StreamingPageHeader({ brandName, description, date }: Props) {
  return (
    <div
      className="flex items-start justify-between"
      style={{ paddingTop: 'clamp(80px, 10vh, 140px)', paddingBottom: '4%' }}
    >
      {/* Left — brand title + description */}
      <div className="flex flex-col gap-4 max-w-[356px]">
        <div
          className="font-sans font-normal leading-none"
          style={{ fontSize: 'clamp(20px, 1.85vw, 32px)' }}
        >
          <p>
            <em className="not-italic font-normal text-[#075edd]">NOW</em>
            <span className="text-black"> Streaming</span>
          </p>
          <p className="text-black">/ {brandName}</p>
        </div>
        <p
          className="font-sans font-normal text-black leading-[1.6]"
          style={{ fontSize: '16px' }}
        >
          {description}
        </p>
      </div>

      {/* Right — date navigator */}
      <Suspense fallback={null}>
        <DateNavigator date={date} />
      </Suspense>
    </div>
  )
}
