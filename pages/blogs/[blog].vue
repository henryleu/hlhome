<script setup lang="ts">
const { path } = useRoute()
const { fetchBlog } = useBlog()
const { data, error } = await fetchBlog(path)

if (error.value || !data.value) navigateTo('/404')

const head = usePageHead({
  path,
  title: data.value?.title || '',
  description: data.value?.description || '',
  image: data.value?.image || '',
})
useHead(head)

// Generate OG Image
defineOgImageComponent('Test', {
  headline: 'Greetings 👋',
  title: data.value?.title || '',
  description: data.value?.description || '',
  link: data.value?.ogImage || '',
})

const isMounted = ref(false)

// 等待组件挂载后再显示 TOC
onMounted(() => {
  setTimeout(() => {
    isMounted.value = true
  }, 500)
})
</script>

<template>
  <div v-cloak>
    <!-- BlogToc -->
    <ClientOnly>
      <div
        class="lg:block fixed top-24 toc-left w-64 opacity-0 transition-opacity duration-200"
        :class="{ 'opacity-100': data && isMounted }"
        style="left: calc(50% + 520px)"
      >
        <Transition name="fade">
          <BlogToc :links="data?.body.toc?.links || []" />
        </Transition>
      </div>
    </ClientOnly>

    <!-- BlogContent -->
    <div class="relative px-6 container max-w-5xl mx-auto">
      <div class="relative">
        <BlogHeader
          v-if="data"
          :title="data.title"
          :image="data.image"
          :alt="data.alt"
          :date="data.date"
          :description="data.description"
          :tags="data.tags"
        />
        <div
          class="prose prose-pre:max-w-xs sm:prose-pre:max-w-full prose-sm sm:prose-base md:prose-lg prose-h1:no-underline max-w-5xl mx-auto prose-zinc dark:prose-invert prose-img:rounded-lg"
        >
          <ContentRenderer v-if="data" :value="data">
            <template #empty>
              <p>没有内容</p>
            </template>
          </ContentRenderer>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 仅影响 opacity 的 fade 过渡 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
