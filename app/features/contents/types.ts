export interface ContentProject {
  id: string
  brandName: string
  title: string
  description: string
  items: ContentItem[]
}

export interface ContentItem {
  id: string
  name: string
  createdAt: string
}
