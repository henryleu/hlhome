import type { ParsedContent } from '@nuxt/content'
import type { BlogPost, PagedBlogQuery } from '~/types/blog'

function getBlog(content: ParsedContent): BlogPost {
  return {
    ...content,
    path: content._path as string,
    title: content.title || '无标题',
    description: content.description || '无描述',
    image: content.image || '/not-found.jpg',
    alt: content.alt || '无替代数据',
    ogImage: content.ogImage || '/not-found.jpg',
    ogTitle: content.ogTitle || '无og标题',
    tags: content.tags || [],
    published: content.published || false,
    private: content.private === 'true',
    date: content.date ? formatDate(new Date(content.date)) : '无日期',
    createdAt: new Date(content.createdAt),
    updatedAt: new Date(content.updatedAt || content.createdAt),
  }
}

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = date.getHours()
  const minute = String(date.getMinutes()).padStart(2, '0')
  const period = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12

  return `${year}-${month}-${day} ${hour12}:${minute} ${period}`
}

export const useBlog = () => {
  const fetchBlog = async (path: string) => {
    const {
      data: article,
      error,
      refresh,
    } = await useAsyncData(`blog-get-${path}`, () => queryContent(path).findOne())

    const data = computed<BlogPost | undefined>(() => {
      if (!article.value) return undefined
      return getBlog(article.value)
    })

    return { data, error, refresh }
  }

  const fetchRecentBlogs = async (limit: number = 6) => {
    return useAsyncData(`recent-blogs`, async () => {
      const query = queryContent('/blogs')
      const list = await query.limit(limit).sort({ date: -1 }).find()
      return list.map((content) => getBlog(content))
    })
  }

  /**
   * todo: sort by views and likes, implement it later
   *
   * @param limit
   * @returns
   */
  const fetchTrendingBlogs = async (limit: number = 6) => {
    return useAsyncData(`trending-blogs`, async () => {
      const query = queryContent('/blogs')
      const list = await query.limit(limit).sort({ date: -1 }).find()
      return list.map((content) => getBlog(content))
    })
  }

  const fetchBlogsByTag = async (tag: string) => {
    return useAsyncData(`tag-${tag}`, async () => {
      if (!tag) return []
      const query = queryContent('/blogs')
      query.where({ tags: { $contains: tag } })
      const list = await query.sort({ date: -1 }).find()
      return list.map((content) => getBlog(content))
    })
  }

  const fetchPagedBlogs = (params: PagedBlogQuery = { pageSize: 10, pageNo: 1 }) => {
    const { data: totalData } = useAsyncData(
      `blogs-count-${JSON.stringify(params)}`,
      async () => {
        const query = queryContent('/blogs')
        if (params.tag) {
          query.where({ tags: { $contains: params.tag } })
        }
        if (params.search) {
          query.where({ title: { $regex: new RegExp(params.search, 'i') } })
        }
        return await query.count()
      },
      { watch: [params] },
    )

    const { data: listData } = useAsyncData(
      `blogs-list-${JSON.stringify(params)}`,
      async () => {
        const query = queryContent('/blogs')
        if (params.tag) {
          query.where({ tags: { $contains: params.tag } })
        }
        if (params.search) {
          query.where({ title: { $regex: new RegExp(params.search, 'i') } })
        }
        const list = await query
          .skip((params.pageNo - 1) * params.pageSize)
          .limit(params.pageSize)
          .sort({ date: params.sort === 'desc' ? -1 : 1 })
          .find()
        return list.map((content) => getBlog(content))
      },
      { watch: [params] },
    )

    const data = computed(() => {
      const list = listData.value || []
      const total = totalData.value || 0
      const pages = Math.ceil(total / params.pageSize)
      return { list, total, pages }
    })

    return {
      data,
      refresh: async () => {
        return await Promise.all([
          refreshNuxtData(`blogs-count-${JSON.stringify(params)}`),
          refreshNuxtData(`blogs-list-${JSON.stringify(params)}`),
        ])
      },
    }
  }

  const fetchTags = async () => {
    const { data } = await useAsyncData('all-blog-tags', () =>
      queryContent('/blogs').sort({ _id: -1 }).find(),
    )

    const allTags = new Map()
    for (const blog of data.value || []) {
      const tags: Array<string> = blog.tags || []
      for (const tag of tags) {
        allTags.set(tag, (allTags.get(tag) || 0) + 1)
      }
    }

    return { data: allTags }
  }

  return {
    fetchBlog,
    fetchRecentBlogs,
    fetchTrendingBlogs,
    fetchBlogsByTag,
    fetchPagedBlogs,
    fetchTags,
  }
}
