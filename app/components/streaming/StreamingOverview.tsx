import type { StreamingData } from '@/app/features/streaming/types'
import PageHeader from '@/app/components/layout/PageHeader'
import PageFooter from '@/app/components/layout/PageFooter'
import StreamingPageHeader from '@/app/components/streaming/StreamingPageHeader'
import StreamingFilters from '@/app/components/streaming/StreamingFilters'
import StreamingDayPart from '@/app/components/streaming/StreamingDayPart'
import BackButton from '@/app/components/ui/BackButton'

interface Props {
  data: StreamingData
}

const DESCRIPTION =
  'Gerencie e visualize conteúdos para as principais marcas. Explore as possibilidades!'

export default function StreamingOverview({ data }: Props) {
  return (
    <div className="relative min-h-screen w-screen bg-white">
      <PageHeader theme="dark" buttons="store" />

      {/* Content wrapper — inline style bypasses the global margin:0 reset in globals.css */}
      <div style={{ marginLeft: '14%', marginRight: '14%' }}>
        <StreamingPageHeader
          brandName={data.brandName}
          description={DESCRIPTION}
          date={data.date}
        />

        <StreamingFilters />

        {data.items.length === 0 ? (
          <div
            className="flex items-center justify-center text-center text-[#6b7280]"
            style={{ paddingTop: '8%', paddingBottom: '8%', fontSize: 'clamp(14px, 1.1vw, 18px)' }}
          >
            Não há conteúdo publicado para a data selecionada.
          </div>
        ) : (
          data.items.map((item, index) => (
            <div key={item.id} style={{ paddingTop: index === 0 ? '5%' : '10%' }}>
              <StreamingDayPart
                dayPart={item.dayPart}
                title={item.title}
                timeRange={item.timeRange}
                weather={item.weather}
                weekday={item.weekday}
                location={item.location}
                weatherIcon={item.weatherIcon}
                statics={item.statics}
                video={item.video}
                activePdvs={item.activePdvs}
                impressions={item.impressions}
                itemId={item.id}
                status={item.status}
              />
            </div>
          ))
        )}

        <div style={{ height: 'clamp(80px, 12vh, 160px)' }} />
      </div>

      <PageFooter showActionPills={false} />

      {/* Floating back button */}
      <div className="fixed bottom-8 left-8 z-50">
        <BackButton />
      </div>
    </div>
  )
}
