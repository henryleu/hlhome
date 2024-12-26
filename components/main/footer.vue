<script setup lang="ts">
const route = useRoute()

const path = computed(() => route.fullPath.replace('/', ''))
</script>

<template>
  <div class="py-5 border-t dark:border-gray-800 mt-5 text-zinc-700 dark:text-zinc-300">
    <div class="px-6 container max-w-5xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3">
        <FooterSite v-if="path === 'about'" />
        <FooterDeveloper v-else />
        <FooterLink />
        <FooterConnect />
      </div>

      <div
        class="w-full flex justify-center items-center gap-4 border-t dark:border-gray-800 mt-5 p-2"
      >
        <span>©2024-2035</span>
        <span>转载无妨 愿君悦读</span>
        <a
          href="https://github.com/henryleu/hlhome"
          target="_blank"
          rel="nofollow"
          class="underline"
          >看代码</a
        >
        <a href="/rss.xml" aria-label="Website RSS Feed">
          <span class="px-3"><Icon name="bi:rss-fill" /></span
        ></a>
      </div>
    </div>
  </div>
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
