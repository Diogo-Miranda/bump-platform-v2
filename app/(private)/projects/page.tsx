import { withGrant } from '@/app/lib/withGrant'
import { getSession } from '@/app/lib/auth'
import { getBrands } from '@/app/features/brands/services'
import ProjectsList from '@/app/features/projects/components/ProjectsList'

async function ProjectsPage() {
  const token = await getSession()
  const brands = token ? await getBrands(token) : []

  return <ProjectsList brands={brands} />
}

export default withGrant('platform:fullAccess', ProjectsPage)
