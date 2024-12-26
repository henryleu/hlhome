<script lang="ts" setup>
import { siteData, authorData, homePage } from '~/data'

useHead({
  title: '首页',
  meta: [
    {
      name: 'description',
      content: homePage.title + homePage.description,
    },
  ],
})

// Generate OG Image
defineOgImageComponent('About', {
  headline: 'Greetings 👋',
  title: siteData.title,
  description: siteData.description,
  link: authorData.image,
})
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <MainHero />
    <MainRecent />
    <MainTrending />
  </main>
</template>
