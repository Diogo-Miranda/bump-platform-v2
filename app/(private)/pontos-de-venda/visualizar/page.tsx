import SalePointsList from "@/app/components/sale-points/SalePointsList"
import { getSalePointsList } from "@/app/features/sale-points/services"

export default function SalePointsListPage() {
  const data = getSalePointsList()
  return <SalePointsList data={data} />
}
