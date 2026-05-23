import DashboardOverview from "@/app/components/dashboard/DashboardOverview"
import { getDashboardData } from "@/app/features/dashboard/services"

export default function DashboardPage() {
  const data = getDashboardData()
  return <DashboardOverview data={data} />
}
