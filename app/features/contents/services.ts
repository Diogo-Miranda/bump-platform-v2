import type { ContentProject } from "@/app/features/contents/types"

// TODO: replace with real API call via proxy → BACKEND_URL/api/content-projects
export async function getContentProject(id: string): Promise<ContentProject> {
  return {
    id,
    brandName: "Corona",
    title: "Corona Conteúdo e Campanhas",
    description:
      "This project page is your gateway to managing and visualizing content.",
    items: [],
  }
}
