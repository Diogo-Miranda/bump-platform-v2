import type { ApiBrandContentsResponse, StreamingData } from '@/app/features/streaming/types'

const DAY_OF_WEEK_PT: Record<string, string> = {
  sunday: 'Domingo',
  monday: 'Segunda-feira',
  tuesday: 'Terça-feira',
  wednesday: 'Quarta-feira',
  thursday: 'Quinta-feira',
  friday: 'Sexta-feira',
  saturday: 'Sábado',
}

export async function getStreamingByBrand(
  brandSlug: string,
  brandDisplayName: string,
  date: string,
  token: string
): Promise<StreamingData> {
  const backendUrl = process.env.BUMP_BACKEND_URL
  if (!backendUrl) throw new Error('BUMP_BACKEND_URL is not set')

  const res = await fetch(
    `${backendUrl}/api/v1/brand-contents/${brandSlug}/${date}/signed`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )

  if (res.status === 404) {
    return { brandId: brandSlug, brandName: brandDisplayName, date, items: [] }
  }

  if (!res.ok) throw new Error(`Failed to fetch streaming data: ${res.status}`)

  const json: ApiBrandContentsResponse = await res.json()

  return {
    brandId: brandSlug,
    brandName: brandDisplayName,
    date,
    items: json.data.contents.map((c, i) => ({
      id: String(i),
      dayPart: c.part_of_day,
      title: c.title,
      weather: c.weather,
      weekday: DAY_OF_WEEK_PT[c.day_of_week] ?? c.day_of_week,
      location: c.localization,
      statics: c.contents_metadata[0]?.statics ?? [],
      video: c.contents_metadata[0]?.video,
      status: c.status === 'active' ? 'active' : 'inactive',
    })),
  }
}
