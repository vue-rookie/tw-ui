<template>
  <div
    :class="[
      'tw-p-6 tw-pt-0',
      className
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwCardContent'
})

defineProps<{
  className?: string
}>()
</script> 