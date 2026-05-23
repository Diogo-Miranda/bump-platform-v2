export interface ApiBrand {
  name: string
  created_at: string
  updated_at: string
  created_by: string
}

export interface ApiBrandsResponse {
  data: ApiBrand[]
}

export interface Brand {
  name: string
  slug: string
}
