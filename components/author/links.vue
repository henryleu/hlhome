<script setup lang="ts">
import { authorData } from '~/data'
</script>

<template>
  <NuxtLink
    :to="authorData.github"
    target="_blank"
    class="px-2 py-1 lg:px-3 lg:py-2 bg-gray-300 text-gray-800 rounded-md dark:bg-slate-700 dark:text-[#F1F2F4]"
    aria-label="Github"
  >
    <Icon name="fa:github" size="1em" />
  </NuxtLink>
  <NuxtLink
    :to="authorData.twitter"
    target="_blank"
    class="px-2 py-1 lg:px-3 lg:py-2 bg-gray-300 text-gray-800 rounded-md dark:bg-slate-700 dark:text-[#F1F2F4]"
    aria-label="Twitter"
  >
    <Icon name="fa:twitter-square" size="1em" />
  </NuxtLink>
  <NuxtLink
    :to="authorData.stackoverflow"
    target="_blank"
    class="px-2 py-1 lg:px-3 lg:py-2 bg-gray-300 text-gray-800 rounded-md dark:bg-slate-700 dark:text-[#F1F2F4]"
    aria-label="StackOverflow"
  >
    <Icon name="fa:stack-overflow" size="1em" />
  </NuxtLink>
</template>
