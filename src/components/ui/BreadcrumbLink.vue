<template>
  <a
    :href="href"
    :class="[
      'tw-text-sm tw-font-medium tw-underline-offset-4 hover:tw-underline',
      current ? 'tw-text-gray-900 tw-pointer-events-none' : 'tw-text-gray-500 hover:tw-text-gray-900',
      className
    ]"
    :aria-current="current ? 'page' : undefined"
  >
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwBreadcrumbLink'
})

defineProps<{
  href?: string
  current?: boolean
  className?: string
}>()
</script> 