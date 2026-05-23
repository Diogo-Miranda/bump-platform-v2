import { fetchBackend } from "@/app/lib/fetchBackend"
import type { ApiBrandContentsResponse, StreamingData } from "@/app/features/streaming/types"

const DAY_OF_WEEK_PT: Record<string, string> = {
  sunday: "Domingo",
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sábado",
}

export async function getStreamingByBrand(
  brandSlug: string,
  brandDisplayName: string,
  date: string,
  token: string
): Promise<StreamingData> {
  const res = await fetchBackend(
    `/api/v1/brand-contents/${brandSlug}/${date}/signed`,
    { userToken: token, cache: "no-store" }
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
      status: c.status === "active" ? "active" : "inactive",
    })),
  }
}
