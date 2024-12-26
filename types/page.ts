export type PageParams = {
  path: string
  title: string
  description: string
  image: string
  ogImage?: string
  ogTitle?: string
}

export type PageMetaItem = {
  name?: string
  property?: string
  hid?: string
  content: string
}

export type PageLinkItem = {
  rel: string
  href: string
}

export type PageHead = {
  title: string
  meta: PageMetaItem[]
  link: PageLinkItem[]
}
