export interface CreateSalePointData {
  name: string
  product: string
  corridor: string
  screen1: string
  screen2: string
  screen3: string
  network: string
  location: string
  provider: string
}

export interface AddScreenData {
  pdvId: string
  screenName: string
  screenId: string
  provider: string
}

export function validateCreateSalePoint(data: CreateSalePointData): string | null {
  if (!data.name.trim()) return "Nome do PDV é obrigatório"
  if (!data.product.trim()) return "Produto é obrigatório"
  return null
}

export function validateAddScreen(data: AddScreenData): string | null {
  if (!data.pdvId) return "Selecione um PDV"
  if (!data.screenName.trim()) return "Nome da tela é obrigatório"
  if (!data.screenId.trim()) return "ID da tela é obrigatório"
  return null
}
