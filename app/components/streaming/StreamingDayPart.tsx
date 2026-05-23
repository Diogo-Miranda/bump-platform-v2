import type { DayPart, WeatherType } from '@/app/features/streaming/types'
import StreamingContentPreview from '@/app/components/streaming/StreamingContentPreview'
import StreamingActionPills from '@/app/components/streaming/StreamingActionPills'
import WeatherSunIcon from '@/app/components/ui/icons/WeatherSunIcon'
import WeatherRainIcon from '@/app/components/ui/icons/WeatherRainIcon'

const DAY_PART_LABEL: Record<DayPart, string> = {
  morning: 'Manhã',
  afternoon: 'Tarde',
  night: 'Noite',
}

interface Props {
  dayPart: DayPart
  title: string
  timeRange?: string
  weather: string
  weekday: string
  location: string
  weatherIcon?: WeatherType
  statics: string[]
  video?: string
  activePdvs?: number
  impressions?: string
  itemId: string
  status: 'active' | 'inactive'
}

export default function StreamingDayPart({
  dayPart,
  title,
  timeRange,
  weather,
  weekday,
  location,
  weatherIcon,
  statics,
  video,
  activePdvs,
  impressions,
  itemId,
  status,
}: Props) {
  return (
    <div className="relative" style={{ paddingLeft: '1%', paddingRight: '1%' }}>
      {/* Vertical line — left side */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px bg-[#dadada]"
        aria-hidden="true"
      />

      {/* Day part header */}
      <div className="flex items-baseline justify-between">
        <p
          className="font-sans font-normal text-black leading-[1.08]"
          style={{ fontSize: 'clamp(40px, 3.7vw, 64px)' }}
        >
          {DAY_PART_LABEL[dayPart]}
        </p>
        {timeRange && (
          <p
            className="font-sans font-normal text-black leading-[1.08]"
            style={{ fontSize: 'clamp(40px, 3.7vw, 64px)' }}
          >
            {timeRange}
          </p>
        )}
      </div>

      {/* Campaign info */}
      <div style={{ marginTop: '5%' }}>
        <p
          className="font-sans font-normal text-black underline leading-[1.1] mb-2"
          style={{ fontSize: 'clamp(18px, 1.85vw, 32px)' }}
        >
          {title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10%', flexWrap: 'nowrap' }}>
            <span
              className="font-sans font-normal text-[#d7d7d7] leading-[1.1] whitespace-nowrap"
              style={{ fontSize: 'clamp(18px, 1.85vw, 32px)' }}
            >
              {weather}
            </span>
            {weekday && (
              <span
                className="font-sans font-normal text-[#d7d7d7] leading-[1.1] whitespace-nowrap"
                style={{ fontSize: 'clamp(18px, 1.85vw, 32px)' }}
              >
                {weekday}
              </span>
            )}
            <span
              className="font-sans font-normal text-[#d7d7d7] leading-[1.1] whitespace-nowrap"
              style={{ fontSize: 'clamp(18px, 1.85vw, 32px)' }}
            >
              {location}
            </span>
          </div>
          {weatherIcon && (
            weatherIcon === 'sun' ? <WeatherSunIcon /> : <WeatherRainIcon />
          )}
        </div>
      </div>

      {/* Content preview */}
      <div style={{ marginTop: '5%' }}>
        <StreamingContentPreview statics={statics} video={video} />
      </div>

      {/* Stats + Action pills */}
      {(activePdvs !== undefined || impressions !== undefined) && (
        <div style={{ marginTop: '5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            {activePdvs !== undefined && (
              <p className="font-sans font-normal text-black text-[16px] leading-[1.4]">
                Online em {activePdvs} PDV&apos;s
              </p>
            )}
            {impressions !== undefined && (
              <p className="font-sans font-normal text-black text-[16px] leading-[1.4]">
                Número de impressões {impressions}
              </p>
            )}
          </div>
          <StreamingActionPills itemId={itemId} status={status === 'active' ? 'online' : 'offline'} video={video} />
        </div>
      )}

      {/* Action pills only (no stats) */}
      {activePdvs === undefined && impressions === undefined && (
        <div style={{ marginTop: '5%', display: 'flex', justifyContent: 'flex-end' }}>
          <StreamingActionPills itemId={itemId} status={status === 'active' ? 'online' : 'offline'} video={video} />
        </div>
      )}
    </div>
  )
}
