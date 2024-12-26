<script setup lang="ts">
import { navbarData } from '~/data'

const route = useRoute()
const colorMode = useColorMode()
const setMode = (val: string) => (colorMode.preference = val)
const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <div class="py-5 border-b dark:border-gray-800 font-semibold">
    <div class="flex px-6 container max-w-5xl justify-between mx-auto items-baseline">
      <ul class="flex items-baseline space-x-5">
        <li class="text-base sm:text-2xl font-bold">
          <NuxtLink to="/" :class="{ 'underline underline-offset-4': isActive('/') }">
            {{ navbarData.title }}
          </NuxtLink>
        </li>
      </ul>
      <ul class="flex items-center space-x-3 sm:space-x-6 text-sm sm:text-lg">
        <li>
          <NuxtLink to="/" :class="{ 'underline underline-offset-4': isActive('/') }">
            首页
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/blogs" :class="{ 'underline underline-offset-4': isActive('/blogs') }">
            博客
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/tags" :class="{ 'underline underline-offset-4': isActive('/tags') }">
            标签
          </NuxtLink>
        </li>
        <li title="关于">
          <NuxtLink to="/about" :class="{ 'underline underline-offset-4': isActive('/about') }">
            关于
          </NuxtLink>
        </li>
        <li>
          <ClientOnly>
            <button
              v-if="colorMode.value === 'light'"
              name="light-mode"
              title="Light"
              class="hover:scale-110 transition-all ease-out hover:cursor-pointer"
              @click="setMode('dark')"
            >
              <Icon name="icon-park:moon" size="20" />
            </button>
            <button
              v-if="colorMode.value === 'dark'"
              name="dark-mode"
              title="Dark"
              class="hover:scale-110 transition-all ease-out hover:cursor-pointer"
              @click="setMode('light')"
            >
              <Icon name="noto:sun" size="20" />
            </button>
            <template #fallback>
              <!-- this will be rendered on server side -->
              <Icon name="svg-spinners:180-ring" size="20" />
            </template>
          </ClientOnly>
        </li>
      </ul>
    </div>
  </div>
</template>
