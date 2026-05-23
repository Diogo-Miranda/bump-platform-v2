export type CardVariant = "dark" | "light"

interface BaseCard {
  id: string
  label: string
  index: string
  variant: CardVariant
}

export interface MetricCard extends BaseCard {
  kind: "metric"
  value: string
  subtitle?: string
}

export interface MetricBigNumberCard extends BaseCard {
  kind: "metric-big-number"
  value: string
  subtitle?: string
}

export interface FeedCard extends BaseCard {
  kind: "feed"
  lastUpdated: string
  items: string[]
  ellipse?: boolean
}

export type DashboardCard = MetricCard | MetricBigNumberCard | FeedCard

export interface DashboardData {
  title: string
  subtitle: string
  cards: DashboardCard[]
}
