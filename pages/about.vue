<script setup lang="ts">
import { aboutPage } from '~/data'

useHead({
  title: '关于',
  meta: [
    {
      name: 'description',
      content: aboutPage.aboutAuthor,
    },
  ],
})

defineOgImageComponent('About', {
  headline: 'Greetings 👋',
  title: aboutPage.title,
  description: aboutPage.description,
  link: aboutPage.image,
})
</script>

<template>
  <div class="py-5">
    <div class="sm:grid grid-cols-10 px-6 py-5 sm:py-9 gap-5 container max-w-5xl mx-auto">
      <div class="col-span-6">
        <div class="flex justify-between">
          <div>
            <h1 class="text-xl sm:text-4xl pb-2 font-bold">
              {{ aboutPage.title }}
            </h1>
            <div class="my-3 space-x-2 md:space-x-3 py-5">
              <AuthorLinks />
            </div>
          </div>
          <div class="sm:hidden block col-span-3 pb-5 dark:text-[#F1F2F4]">
            <div class="relative aspect-[10/10]">
              <NuxtImg
                :src="aboutPage.image"
                width="500"
                height="500"
                quality="50"
                class="rounded-md absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <h4 class="text-base sm:text-2xl font-semibold pb-7 sm:pb-12">
          {{ aboutPage.description }}
        </h4>
        <p class="text-base sm:text-xl">{{ aboutPage.aboutAuthor }}</p>
      </div>
      <div class="hidden sm:block col-start-8 col-span-3">
        <div class="relative aspect-[10/10]">
          <NuxtImg
            :src="aboutPage.image"
            width="500"
            height="500"
            quality="50"
            class="rounded-md absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>
