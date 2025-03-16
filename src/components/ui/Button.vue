<template>
  <button
    :class="[
      'tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-font-medium tw-transition-colors tw-focus-visible:tw-outline-none tw-focus-visible:tw-ring-2 tw-focus-visible:tw-ring-offset-2 tw-disabled:tw-opacity-50 tw-disabled:tw-pointer-events-none',
      sizeClasses,
      variantClasses,
      roundedClasses,
      className
    ]"
    :disabled="disabled"
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot name="prefix" v-if="$slots.prefix"></slot>
    <slot></slot>
    <slot name="suffix" v-if="$slots.suffix"></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'TwButton'
})

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline' | 'ghost' | 'link'
    size?: 'sm' | 'md' | 'lg' | 'xl'
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    className?: string
  }>(),
  {
    variant: 'default',
    size: 'md',
    rounded: 'md',
    type: 'button',
    disabled: false,
    className: ''
  }
)

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'tw-h-8 tw-px-3 tw-text-xs'
    case 'lg':
      return 'tw-h-11 tw-px-8 tw-text-base'
    case 'xl':
      return 'tw-h-12 tw-px-10 tw-text-lg'
    default:
      return 'tw-h-10 tw-px-4 tw-py-2 tw-text-sm'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'tw-bg-primary tw-text-primary-foreground tw-hover:bg-primary/90'
    case 'success':
      return 'tw-bg-green-500 tw-text-white tw-hover:bg-green-600'
    case 'warning':
      return 'tw-bg-yellow-500 tw-text-white tw-hover:bg-yellow-600'
    case 'danger':
      return 'tw-bg-red-500 tw-text-white tw-hover:bg-red-600'
    case 'outline':
      return 'tw-border tw-border-input tw-bg-background tw-hover:tw-bg-accent tw-hover:tw-text-accent-foreground'
    case 'ghost':
      return 'tw-hover:tw-bg-accent tw-hover:tw-text-accent-foreground'
    case 'link':
      return 'tw-text-primary tw-underline-offset-4 tw-hover:tw-underline'
    default:
      return 'tw-bg-gray-100 tw-text-gray-900 tw-hover:tw-bg-gray-200'
  }
})

const roundedClasses = computed(() => {
  switch (props.rounded) {
    case 'none':
      return 'tw-rounded-none'
    case 'sm':
      return 'tw-rounded-sm'
    case 'lg':
      return 'tw-rounded-lg'
    case 'full':
      return 'tw-rounded-full'
    default:
      return 'tw-rounded-md'
  }
})
</script> 