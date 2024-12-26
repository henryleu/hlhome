<script lang="ts" setup>
const route = useRoute()
const tag = computed(() => {
  const name = route.params.tag || ''
  let strName = ''
  if (Array.isArray(name)) strName = name.at(0) || ''
  else strName = name
  return strName
})
const { fetchBlogsByTag } = useBlog()
const { data, error } = await fetchBlogsByTag(tag.value)

if (error.value) navigateTo('/404')

useHead({
  title: tag.value,
  meta: [
    {
      name: 'description',
      content: `你将在这里找到所有与 ${tag.value} 相关的博客`,
    },
  ],
})

// Generate OG Image
const cfg = useRuntimeConfig()
defineOgImage({
  props: {
    title: tag.value?.toUpperCase(),
    description: `You will find all the ${tag.value} related post here`,
    siteName: cfg.public.site,
  },
})
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600 px-4">
    <TagTopic />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <BlogCard
        v-for="post in data"
        :key="post.title"
        :path="post.path"
        :title="post.title"
        :date="post.date"
        :description="post.description"
        :image="post.image"
        :alt="post.alt"
        :og-image="post.ogImage"
        :tags="post.tags"
        :published="post.published"
      />
      <BlogEmpty v-if="data?.length === 0" />
    </div>
  </main>
</template>
