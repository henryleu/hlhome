<script setup lang="ts">
type TocLink = {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

defineProps<{ links: TocLink[] }>()
</script>

<template>
  <div class="lg:col-span-3 hidden lg:block justify-self-end">
    <div class="border-2 dark:border-gray-800 p-3 rounded-md min-w-[300px] dark:bg-slate-900">
      <h1 class="text-base font-bold mb-3 border-b dark:border-gray-800 pb-2">目录</h1>
      <NuxtLink
        v-for="link in links"
        :key="link.id"
        :to="`#${link.id}`"
        class="block text-base mb-3 hover:underline"
      >
        {{ link.text }}
      </NuxtLink>
    </div>
  </div>
</template>
