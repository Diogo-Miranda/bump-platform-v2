"use client"

import SalePointsNav from "@/app/components/sale-points/SalePointsNav"
import FormField from "@/app/components/ui/FormField"
import SelectField from "@/app/components/ui/SelectField"
import type { AddScreenData } from "@/app/features/sale-points/schemas"
import { validateAddScreen } from "@/app/features/sale-points/schemas"

const PDV_OPTIONS = [
  { value: "pdv-zaffari-bourbon", label: "PDV – Zaffari Shopping Bourbon" },
  { value: "pdv-lorem-ipsum", label: "PDV – Lorem Ipsum dolor sit" },
  { value: "pdv-aenean", label: "PDV – Aenean sit amet" },
]

export default function AddScreen() {
  const handleSubmit = (formData: FormData) => {
    const data: AddScreenData = {
      pdvId: formData.get("pdvId") as string,
      screenName: formData.get("screenName") as string,
      screenId: formData.get("screenId") as string,
      provider: formData.get("provider") as string,
    }

    const error = validateAddScreen(data)
    if (error) return
    // TODO: POST via proxy → BACKEND_URL/api/screens
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <SalePointsNav active="adicionar-tela" />

      <main className="px-[calc(12.5%+26px)] pt-16 pb-32">
        <h1 className="font-sans text-[32px] text-black font-normal leading-none mb-16">
          Adicionar tela.
        </h1>

        <form action={handleSubmit} className="flex flex-col gap-4">
          {/* Row 1 — PDV selector */}
          <div className="w-[404px]">
            <SelectField
              name="pdvId"
              placeholder="SELECIONAR PDV"
              options={PDV_OPTIONS}
              required
            />
          </div>

          {/* Row 2 — screen fields */}
          <div className="grid grid-cols-3 gap-4">
            <FormField
              name="screenName"
              placeholder="TELA #1 (NOME EX. RÉGUA/CHECKOUT)"
              required
            />
            <FormField name="screenId" placeholder="TELA ID" required />
            <FormField name="provider" placeholder="PROVEDOR (EX. XIBO)" />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="flex h-16 items-center rounded-full bg-[#075edd] px-10 font-mono text-[16px] text-white transition-opacity hover:opacity-80 cursor-pointer"
            >
              ADICIONAR TELA
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
