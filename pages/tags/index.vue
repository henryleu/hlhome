<script lang="ts" setup>
import { makeFirstCharUpper } from '@/utils/helper'
import { useBlog } from '@/composables/useBlog'
import { tagsPage } from '~/data'

const { fetchTags } = useBlog()
const { data: allTags } = await fetchTags()

useHead({
  title: tagsPage.title,
  meta: [
    {
      name: 'description',
      content: tagsPage.description,
    },
  ],
})

// Generate OG Image
const cfg = useRuntimeConfig()
defineOgImage({
  props: {
    title: tagsPage.title,
    description: tagsPage.description,
    siteName: cfg.public.site,
  },
})
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <TagHero />
    <div class="flex flex-wrap px-6 mt-12 gap-3">
      <TagLabel
        v-for="topic in allTags"
        :key="topic[0]"
        :title="makeFirstCharUpper(topic[0])"
        :count="topic[1]"
      />
    </div>
  </main>
</template>
