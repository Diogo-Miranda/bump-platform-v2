import ContentProject from "@/app/components/contents/ContentProject"
import { getContentProject } from "@/app/features/contents/services"

export default async function AddContentPage() {
  const data = await getContentProject("default")
  return <ContentProject data={data} />
}
