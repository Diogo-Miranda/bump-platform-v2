export interface SalePoint {
  id: string
  name: string
  chain: string
  city: string
  brand: string
  screens: {
    t: string
    r1: string
    r2: string
    r3: string
  }
  provider: string
}

export interface SalePointsData {
  items: SalePoint[]
  currentPage: number
  totalPages: number
}
