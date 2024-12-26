export interface BlogPost {
  path: string
  title: string
  description: string
  image: string
  alt: string
  ogImage: string
  ogTitle: string
  tags: string[]
  published: boolean
  private?: string | boolean
  date: string
  createdAt: string | Date
  updatedAt: string | Date
  [key: string]: any
}

export interface BlogQuery {
  tag?: string
  search?: string
  sort?: 'asc' | 'desc'
}

export interface PagedBlogQuery extends BlogQuery {
  pageSize: number
  pageNo: number
}
