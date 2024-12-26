<script lang="ts" setup>
import { blogsPage } from '~/data'
import type { PagedBlogQuery } from '~/types/blog'

const query = reactive<PagedBlogQuery>({
  pageSize: 5,
  pageNo: 1,
  sort: 'desc',
  search: '',
})
const { fetchPagedBlogs } = useBlog()
const { data } = fetchPagedBlogs(query)

watch(
  () => query.search,
  () => (query.pageNo = 1),
)

function onPreviousPageClick() {
  if (query.pageNo > 1) query.pageNo--
}

function onNextPageClick() {
  if (query.pageNo < data.value.pages) query.pageNo++
}

useHead({
  title: blogsPage.title,
  meta: [
    {
      name: 'description',
      content: blogsPage.description,
    },
  ],
})

// Generate OG Image
const cfg = useRuntimeConfig()
defineOgImage({
  props: {
    title: blogsPage.title,
    description: blogsPage.description,
    siteName: cfg.public.site,
  },
})

// Add these computed properties
const prevButtonClass = computed(() => ({
  'text-sky-700 dark:text-sky-400': query.pageNo > 1,
}))

const nextButtonClass = computed(() => ({
  'text-sky-700 dark:text-sky-400': query.pageNo < data.value.pages,
}))
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <ArchiveHero />
    <div class="px-6">
      <SearchInput v-model="query.search" />
    </div>
    <div v-auto-animate class="space-y-5 my-5 px-4">
      <template v-for="post in data.list" :key="post._path">
        <ArchiveCard
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
      </template>

      <ArchiveCard v-if="!data.list.length" title="No Post Found" image="/not-found.jpg" />
    </div>

    <div class="flex justify-center items-center space-x-6">
      <button :disabled="query.pageNo <= 1" @click="onPreviousPageClick">
        <Icon name="mdi:code-less-than" size="30" :class="prevButtonClass" />
      </button>
      <p>{{ query.pageNo }} / {{ data.pages }}</p>
      <button :disabled="query.pageNo >= data.pages" @click="onNextPageClick">
        <Icon name="mdi:code-greater-than" size="30" :class="nextButtonClass" />
      </button>
    </div>
  </main>
</template>
