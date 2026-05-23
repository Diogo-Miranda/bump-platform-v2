"use client"

import SalePointsNav from "@/app/components/sale-points/SalePointsNav"
import FormField from "@/app/components/ui/FormField"
import SelectField from "@/app/components/ui/SelectField"
import type { CreateSalePointData } from "@/app/features/sale-points/schemas"
import { validateCreateSalePoint } from "@/app/features/sale-points/schemas"

const SCREEN_OPTIONS = [
  { value: "testeira-1920x400", label: "Testeira 1920×400" },
  { value: "regua-1920x40", label: "Régua 1920×40" },
  { value: "checkout-1920x1080", label: "Check-out 1920×1080" },
]

export default function CreateSalePoint() {
  const handleSubmit = (formData: FormData) => {
    const data: CreateSalePointData = {
      name: formData.get("name") as string,
      product: formData.get("product") as string,
      corridor: formData.get("corridor") as string,
      screen1: formData.get("screen1") as string,
      screen2: formData.get("screen2") as string,
      screen3: formData.get("screen3") as string,
      network: formData.get("network") as string,
      location: formData.get("location") as string,
      provider: formData.get("provider") as string,
    }

    const error = validateCreateSalePoint(data)
    if (error) return
    // TODO: POST via proxy → BACKEND_URL/api/sale-points
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <SalePointsNav active="criar" />

      <main className="px-[calc(12.5%+26px)] pt-16 pb-32">
        <h1 className="font-sans text-[32px] text-black font-normal leading-none mb-16">
          Criar Ponto de Venda
        </h1>

        <form action={handleSubmit} className="flex flex-col gap-4">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-4">
            <FormField
              name="name"
              placeholder="DIGITE AQUI O NOME DO PDV"
              required
            />
            <FormField name="product" placeholder="PRODUTO" required />
            <FormField name="corridor" placeholder="CORREDOR/DEPARTAMENTO" />
          </div>

          {/* Row 2 — screen selects */}
          <div className="grid grid-cols-3 gap-4">
            <SelectField
              name="screen1"
              placeholder="TELA #1"
              options={SCREEN_OPTIONS}
            />
            <SelectField
              name="screen2"
              placeholder="TELA #2"
              options={SCREEN_OPTIONS}
            />
            <SelectField
              name="screen3"
              placeholder="TELA #3"
              options={SCREEN_OPTIONS}
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-3 gap-4">
            <FormField name="network" placeholder="REDE" />
            <FormField name="location" placeholder="LOCALIZAÇÃO" />
            <FormField name="provider" placeholder="PROVEDOR" />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="flex h-16 items-center rounded-full bg-[#075edd] px-10 font-mono text-[16px] text-white transition-opacity hover:opacity-80 cursor-pointer"
            >
              CRIAR PONTO DE VENDA
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
