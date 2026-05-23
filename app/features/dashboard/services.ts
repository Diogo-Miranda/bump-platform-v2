import type { DashboardData } from "@/app/features/dashboard/types"

// TODO: replace with real API call via proxy (next.config.ts rewrites → BACKEND_URL)
export function getDashboardData(): DashboardData {
  return {
    title: "Dashboard Corona®",
    subtitle:
      "This project page is your gateway to managing and visualizing content.",
    cards: [
      {
        id: "view-per-store",
        kind: "metric",
        label: "View per Store",
        index: "01",
        variant: "dark",
        value: "127.3k",
        subtitle: "Grupo Pão de Açucar - SP",
      },
      {
        id: "context-feed",
        kind: "feed",
        label: "Context Feed",
        index: "02",
        variant: "light",
        lastUpdated: "Last update was 35min ago",
        ellipse: true,
        items: [
          "AI updated headline for São Paulo",
          "94% more views in last loop",
        ],
      },
      {
        id: "marcas-online",
        kind: "metric",
        label: "Marcas Online",
        index: "03",
        variant: "light",
        value: "127.3k",
        subtitle: "Grupo Pão de Açucar - SP",
      },
      {
        id: "conteudos-online",
        kind: "metric-big-number",
        label: "Conteúdos Online",
        index: "04",
        variant: "light",
        value: "32",
      },
    ],
  }
}
