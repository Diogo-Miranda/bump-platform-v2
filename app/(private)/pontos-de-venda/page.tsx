import SalePointsOverview from "@/app/components/sale-points/SalePointsOverview"
import { getSalePoints } from "@/app/features/sale-points/services"

export default function SalePointsPage() {
  const data = getSalePoints()
  return <SalePointsOverview data={data} />
}
