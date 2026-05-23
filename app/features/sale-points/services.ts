import type { SalePointsListData } from "@/app/features/sale-points/types"

const DEFAULT_SCREENS = [
  { label: "T",  resolution: "1920x1080" },
  { label: "R1", resolution: "1920x40" },
  { label: "R2", resolution: "1920x40" },
  { label: "R3", resolution: "1920x40" },
]

// TODO: replace with real API call via proxy (next.config.ts rewrites → BACKEND_URL)
export function getSalePoints(): SalePointsListData {
  return {
    groupTitle: "Pontos de Venda",
    currentPage: 1,
    totalPages: 5,
    items: [
      { id: "1",  name: "PDV Shopping Bourbon",   chain: "Pão de Açúcar",      city: "São Paulo",      brand: "Corona Light",    screens: DEFAULT_SCREENS, provider: "Xibo" },
      { id: "2",  name: "Supermercado Extra",      chain: "Extra Hipermercado", city: "Rio de Janeiro", brand: "Corona Light",    screens: DEFAULT_SCREENS, provider: "Veto" },
      { id: "3",  name: "Carrefour",               chain: "Carrefour Bairro",   city: "Belo Horizonte", brand: "Corona Light",    screens: DEFAULT_SCREENS, provider: "Xibo" },
      { id: "4",  name: "Atacadão",                chain: "Atacadão Atacarejo", city: "Curitiba",       brand: "Corona Premium",  screens: DEFAULT_SCREENS, provider: "Veto" },
      { id: "5",  name: "Grupo Pão de Açúcar",     chain: "Mini Extra",         city: "Salvador",       brand: "Corona Premium",  screens: DEFAULT_SCREENS, provider: "Veto" },
      { id: "6",  name: "Mercado Dia",              chain: "Dia%",               city: "Porto Alegre",   brand: "Corona Premium",  screens: DEFAULT_SCREENS, provider: "Xibo" },
      { id: "7",  name: "Lojas Americanas",         chain: "Americanas Express", city: "São Paulo",      brand: "Corona Branding", screens: DEFAULT_SCREENS, provider: "Xibo" },
      { id: "8",  name: "Pão de Açúcar",            chain: "Pão de Açúcar Mini", city: "Brasília",       brand: "Corona Light",    screens: DEFAULT_SCREENS, provider: "Xibo" },
      { id: "9",  name: "Supermercado Guanabara",   chain: "Guanabara",          city: "Rio de Janeiro", brand: "Corona Light",    screens: DEFAULT_SCREENS, provider: "Veto" },
      { id: "10", name: "Cia. do Lanche",            chain: "Lanchonete Cia.",    city: "São Paulo",      brand: "Corona Light",    screens: DEFAULT_SCREENS, provider: "Veto" },
      { id: "11", name: "Hipermercado Carrefour",    chain: "Carrefour Super",    city: "Belo Horizonte", brand: "Corona Light",    screens: DEFAULT_SCREENS, provider: "Veto" },
    ],
  }
}
