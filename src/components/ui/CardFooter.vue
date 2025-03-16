<template>
  <div
    :class="[
      'tw-flex tw-items-center tw-p-6 tw-pt-0',
      className
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwCardFooter'
})

defineProps<{
  className?: string
}>()
</script> 