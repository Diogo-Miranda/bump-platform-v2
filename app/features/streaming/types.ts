export type DayPart = 'morning' | 'afternoon' | 'night'
export type WeatherType = 'sun' | 'rain' | 'cloud'

export interface ApiContentsMetadata {
  statics: string[]
  width: string
  height: string
  video: string
}

export interface ApiContent {
  content_type: string
  part_of_day: 'morning' | 'afternoon' | 'night'
  day_of_week: string
  contents_metadata: ApiContentsMetadata[]
  localization: string
  title: string
  weather: string
  status: string
}

export interface ApiBrandContentsResponse {
  data: {
    created_at: string
    contents: ApiContent[]
    created_by: string
  }
}

export interface StreamingItem {
  id: string
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
  status: 'active' | 'inactive'
}

export interface StreamingData {
  brandId: string
  brandName: string
  date: string
  items: StreamingItem[]
}

export type StreamingFilter =
  | 'latest'
  | 'network'
  | 'city'
  | 'shift'
  | 'completed'
