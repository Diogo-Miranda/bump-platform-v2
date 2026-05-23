import { fetchBackend } from "@/app/lib/fetchBackend"
import type { ApiBrandsResponse, Brand } from "@/app/features/brands/types"

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-")
}

export async function getBrands(token: string): Promise<Brand[]> {
  try {
    const res = await fetchBackend("/api/v1/brands/me", {
      userToken: token,
      cache: "no-store",
    })

    if (!res.ok) return []

    const json: ApiBrandsResponse = await res.json()

    if (!json.data?.length) return []

    return json.data.map((b) => ({ name: b.name, slug: slugify(b.name) }))
  } catch {
    return []
  }
}

export function findBrand(brands: Brand[], slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug)
}
