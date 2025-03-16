<template>
  <h3
    :class="[
      'tw-text-lg tw-font-semibold',
      className
    ]"
  >
    <slot></slot>
  </h3>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwCardTitle'
})

defineProps<{
  className?: string
}>()
</script> 