<template>
  <li class="tw-inline-flex tw-items-center tw-gap-1.5">
    <slot></slot>
    <svg
      v-if="!isLast"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="tw-h-3 tw-w-3"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  </li>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwBreadcrumbItem'
})

defineProps<{
  isLast?: boolean
}>()
</script> 