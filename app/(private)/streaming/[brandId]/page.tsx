import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getSession } from '@/app/lib/auth'
import { getBrands, findBrand } from '@/app/features/brands/services'
import { getStreamingByBrand } from '@/app/features/streaming/services'
import StreamingOverview from '@/app/components/streaming/StreamingOverview'

interface Props {
  params: Promise<{ brandId: string }>
  searchParams: Promise<{ date?: string }>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { brandId } = await params
  const { date } = await searchParams
  const token = await getSession()

  if (!token) return { title: 'Bump Platform' }

  try {
    const brands = await getBrands(token)
    const brand = findBrand(brands, brandId)
    const displayName = brand?.name ?? brandId
    const today = new Date().toISOString().split('T')[0]
    const data = await getStreamingByBrand(brandId, displayName, date ?? today, token)
    return { title: `${data.brandName} — Bump Platform` }
  } catch {
    return { title: `${brandId} — Bump Platform` }
  }
}

export default async function StreamingPage({ params, searchParams }: Props) {
  const { brandId } = await params
  const { date } = await searchParams
  const token = await getSession()

  if (!token) redirect('/login')

  const today = new Date().toISOString().split('T')[0]
  const brands = await getBrands(token)
  const brand = findBrand(brands, brandId)
  const displayName = brand?.name ?? brandId

  const data = await getStreamingByBrand(brandId, displayName, date ?? today, token)

  return <StreamingOverview data={data} />
}
