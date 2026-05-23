import SalePointsList from "@/app/components/sale-points/SalePointsList"
import { getSalePoints } from "@/app/features/sale-points/services"

export default function SalePointsListPage() {
  const data = getSalePoints()
  return <SalePointsList data={data} />
}
