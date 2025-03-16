<template>
  <p
    :class="[
      'tw-text-sm tw-text-gray-500',
      className
    ]"
  >
    <slot></slot>
  </p>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwCardDescription'
})

defineProps<{
  className?: string
}>()
</script> 