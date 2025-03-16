<template>
  <div
    v-if="modelValue === value"
    :class="['tw-w-full', className]"
    role="tabpanel"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwTabPanel'
})

defineProps<{
  modelValue: string
  value: string
  className?: string
}>()
</script> 