<template>
  <div
    role="alert"
    :class="[
      'tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4',
      variantClasses,
      className
    ]"
  >
    <div class="tw-flex tw-items-start tw-gap-4">
      <span v-if="$slots.icon" class="tw-text-lg">
        <slot name="icon"></slot>
      </span>
      <div class="tw-flex-1">
        <h5 v-if="title" class="tw-mb-1 tw-font-medium tw-leading-none tracking-tight">
          {{ title }}
        </h5>
        <div :class="[title ? 'tw-text-sm' : '']">
          <slot></slot>
        </div>
      </div>
      <button
        v-if="dismissible"
        type="button"
        class="tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-white transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2"
        @click="$emit('close')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="tw-h-4 tw-w-4"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
        <span class="tw-sr-only">Close</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'TwAlert'
})

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'info' | 'success' | 'warning' | 'danger'
    title?: string
    dismissible?: boolean
    className?: string
  }>(),
  {
    variant: 'default',
    title: '',
    dismissible: false,
    className: ''
  }
)

defineEmits<{
  (e: 'close'): void
}>()

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'info':
      return 'tw-border-blue-200 tw-bg-blue-50 tw-text-blue-800'
    case 'success':
      return 'tw-border-green-200 tw-bg-green-50 tw-text-green-800'
    case 'warning':
      return 'tw-border-yellow-200 tw-bg-yellow-50 tw-text-yellow-800'
    case 'danger':
      return 'tw-border-red-200 tw-bg-red-50 tw-text-red-800'
    default:
      return 'tw-border-gray-200 tw-bg-gray-50 tw-text-gray-800'
  }
})
</script> 