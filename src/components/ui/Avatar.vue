<template>
  <div
    :class="[
      'tw-relative tw-flex tw-shrink-0 tw-overflow-hidden tw-rounded-full',
      sizeClasses,
      className
    ]"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="tw-aspect-square tw-h-full tw-w-full"
      @error="handleError"
    />
    <span
      v-else-if="initials"
      :class="[
        'tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-bg-gray-100 tw-text-gray-800',
        initialsClasses
      ]"
    >
      {{ initials }}
    </span>
    <span
      v-else
      class="tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-bg-gray-100 tw-text-gray-800"
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
        class="tw-h-6 tw-w-6"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </span>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({
  name: 'TwAvatar'
})

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    initials?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    className?: string
  }>(),
  {
    src: '',
    alt: '',
    initials: '',
    size: 'md',
    className: ''
  }
)

const imgError = ref(false)

const handleError = () => {
  imgError.value = true
}

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'tw-h-8 tw-w-8'
    case 'lg':
      return 'tw-h-12 tw-w-12'
    case 'xl':
      return 'tw-h-16 tw-w-16'
    default:
      return 'tw-h-10 tw-w-10'
  }
})

const initialsClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'tw-text-xs'
    case 'lg':
      return 'tw-text-base'
    case 'xl':
      return 'tw-text-lg'
    default:
      return 'tw-text-sm'
  }
})
</script> 