import { defaultPageParams, siteData } from '~/data'
import type { PageHead, PageParams } from '~/types/page'

const metaCache = new Map<string, PageHead>()

// get page head
export const usePageHead = (params?: PageParams): PageHead => {
  // hit cache
  const cacheKey = params?.path ?? defaultPageParams.path
  const cache = metaCache.get(cacheKey)
  if (cache) return cache

  // generate head
  const { path, title, description, image, ogImage, ogTitle } = params ?? defaultPageParams
  const url = `${siteData.url}${path}`
  const meta = [
    { name: 'description', content: description },
    // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
    { property: 'og:site_name', content: siteData.title },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:title', content: ogTitle || title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: ogImage || image },
    // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
    { name: 'twitter:site', content: siteData.twitterHandle },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: url },
    { name: 'twitter:title', content: ogTitle || title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage || image },
  ]
  const link = [
    { rel: 'canonical', href: url },
    { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
  ]
  const head = { title, meta, link }
  metaCache.set(cacheKey, head)
  return head
}
