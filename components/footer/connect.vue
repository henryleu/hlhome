<script setup lang="ts">
import { authorData, siteData } from '~/data'

// 添加控制弹窗显示的响应式变量
const showWeixinPopup = ref(false)
</script>

<template>
  <div>
    <p class="text-black dark:text-zinc-300 text-base font-semibold">联系我</p>
    <p class="dark:text-zinc-300">
      {{ authorData.connect }}
    </p>
    <div class="w-full flex justify-between gap-5 px-4">
      <a
        :href="`mailto: ${siteData.mailAddress}`"
        class="block text-center w-28 bg-sky-700 p-2 rounded-lg text-[#F1F2F4] mt-3 text-sm"
      >
        发邮件
      </a>
      <button
        class="block text-center w-28 bg-sky-700 p-2 rounded-lg text-[#F1F2F4] mt-3 text-sm"
        @click="showWeixinPopup = true"
      >
        加微信
      </button>
    </div>

    <!-- 添加微信二维码弹出层 -->
    <div
      v-if="showWeixinPopup"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showWeixinPopup = false"
    >
      <div class="bg-white dark:bg-zinc-800 p-4 rounded-lg relative max-w-sm" @click.stop>
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          @click="showWeixinPopup = false"
        >
          ✕
        </button>
        <img src="/henryleu_weixin.jpg" alt="微信二维码" class="w-full h-auto" />
      </div>
    </div>
  </div>
</template>
