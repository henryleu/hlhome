<template>
  <div class="relative">
    <input
      :value="innerValue"
      placeholder="搜索"
      type="text"
      class="block w-full bg-[#F1F2F4] dark:bg-slate-900 text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 rounded-md border-gray-300 dark:border-gray-800 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pr-10"
      @input="handleInput"
      @keydown.enter="handleSearch"
      @blur="handleSearch"
    />
    <button
      v-show="hasValue"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
      @click="handleClear"
      @mousedown.prevent
    >
      <Icon name="mdi:close" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const model = defineModel({ type: String, required: true, default: '' })
const innerValue = ref(model.value)
const hasValue = ref(model.value.trim() !== '')

// Watch for external changes
watch(
  () => model.value,
  (newVal) => {
    innerValue.value = newVal
    hasValue.value = newVal.trim() !== ''
  },
)

const handleInput = (e) => {
  innerValue.value = e.target.value
  hasValue.value = e.target.value.trim() !== ''
}

const handleSearch = () => {
  const trimmedValue = innerValue.value.trim()
  if (trimmedValue !== model.value) {
    model.value = trimmedValue
  }
}

const handleClear = () => {
  innerValue.value = ''
  hasValue.value = false
  model.value = ''
}
</script>
