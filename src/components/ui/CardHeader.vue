<template>
  <div
    :class="[
      'tw-flex tw-flex-col tw-space-y-1.5 tw-p-6',
      className
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwCardHeader'
})

defineProps<{
  className?: string
}>()
</script> 