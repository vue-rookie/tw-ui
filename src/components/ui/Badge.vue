<template>
  <div
    :class="[
      'tw-inline-flex tw-items-center tw-rounded-full tw-border tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors',
      variantClasses,
      className
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'TwBadge'
})

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline'
    className?: string
  }>(),
  {
    variant: 'default',
    className: ''
  }
)

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'tw-border-transparent tw-bg-blue-500 tw-text-white'
    case 'secondary':
      return 'tw-border-transparent tw-bg-gray-500 tw-text-white'
    case 'success':
      return 'tw-border-transparent tw-bg-green-500 tw-text-white'
    case 'warning':
      return 'tw-border-transparent tw-bg-yellow-500 tw-text-white'
    case 'danger':
      return 'tw-border-transparent tw-bg-red-500 tw-text-white'
    case 'outline':
      return 'tw-border-current tw-text-current'
    default:
      return 'tw-border-transparent tw-bg-gray-100 tw-text-gray-900'
  }
})
</script> 