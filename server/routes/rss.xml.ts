import { Feed } from 'feed'
import { serverQueryContent } from '#content/server'
import { siteData, authorData } from '~/data'

const basePath = siteData.url

export default defineEventHandler(async (event) => {
  setHeader(event, 'content-type', 'text/xml')
  const docs = await serverQueryContent(event).sort({ date: -1 }).find()

  // Create feed with headers
  const feed = new Feed({
    title: siteData.title,
    description: siteData.description,
    id: basePath,
    link: basePath,
    language: 'zh_CN',
    favicon: `${basePath}/favicon.ico`,
    copyright: 'MIT',
    author: {
      name: authorData.name,
      email: authorData.email,
      link: basePath,
    },
  })

  // Add the feed items
  docs.forEach((doc) => {
    feed.addItem({
      title: doc.title || '',
      id: basePath + doc._path,
      link: basePath + doc._path,
      description: doc.description,
      content: doc.description,
      date: new Date(doc.date),
    })
  })

  return feed.rss2()
})
