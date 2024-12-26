<script setup lang="ts">
interface Props {
  title: string
  count: number
}

withDefaults(defineProps<Props>(), {
  title: 'No title available',
  count: 0,
})

const color = [
  // Warm colors
  '#FF6B6B', // Coral red
  '#FF8E72', // Peach
  '#FFA45C', // Light orange
  '#FFB84C', // Marigold
  '#FFD93D', // Golden yellow
  '#F4D03F', // Sunflower

  // Cool colors
  '#4ECDC4', // Turquoise
  '#45B7D1', // Sky blue
  '#2E86DE', // Ocean blue
  '#4834D4', // Royal blue
  '#686DE0', // Periwinkle
  '#30336B', // Deep blue

  // Nature colors
  '#6AB04C', // Grass green
  '#BADC58', // Light green
  '#45B649', // Forest green
  '#78E08F', // Mint
  '#3DBB3D', // Fresh green
  '#2ECC71', // Emerald

  // Purple & Pink tones
  '#BE2EDD', // Bright purple
  '#8E44AD', // Royal purple
  '#D980FA', // Light purple
  '#FF78CB', // Pink
  '#E056FD', // Magenta
  '#FF4B8B', // Rose
]
// get a random number
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const picAColor = ref(`${color.at(getRandomInt(0, color.length - 1))}`)
</script>

<template>
  <div
    class="text-[#F1F2F4] px-5 py-3 rounded hover:underline rand-bg-color hover:scale-[1.05] transition-all duration-500"
  >
    <NuxtLink :to="`/tags/${title.toLocaleLowerCase()}`" class="text-lg font-extrabold">
      <h1>#{{ title }}({{ count }})</h1>
    </NuxtLink>
  </div>
</template>

<style scoped>
.rand-bg-color {
  background-color: v-bind(picAColor);
}
</style>
