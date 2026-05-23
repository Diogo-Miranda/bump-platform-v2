export interface Screen {
  label: string
  resolution: string
}

export interface SalePoint {
  id: string
  name: string
  chain: string
  city: string
  brand: string
  screens: Screen[]
  provider: string
}

export interface SalePointsData {
  items: SalePoint[]
  currentPage: number
  totalPages: number
}

export interface SalePointsListData extends SalePointsData {
  groupTitle: string
}
