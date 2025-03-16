<template>
  <div class="tw-relative tw-inline-block">
    <div
      @mouseenter="isVisible = true"
      @mouseleave="isVisible = false"
      @focus="isVisible = true"
      @blur="isVisible = false"
    >
      <slot></slot>
    </div>
    <Transition
      enter-active-class="tw-transition tw-duration-200 tw-ease-out"
      enter-from-class="tw-opacity-0 tw-scale-95"
      enter-to-class="tw-opacity-100 tw-scale-100"
      leave-active-class="tw-transition tw-duration-150 tw-ease-in"
      leave-from-class="tw-opacity-100 tw-scale-100"
      leave-to-class="tw-opacity-0 tw-scale-95"
    >
      <div
        v-if="isVisible"
        :class="[
          'tw-absolute tw-z-50 tw-rounded-md tw-bg-gray-900 tw-px-3 tw-py-1.5 tw-text-xs tw-text-white',
          positionClasses,
          className
        ]"
        role="tooltip"
      >
        {{ text }}
        <div
          :class="[
            'tw-absolute tw-h-2 tw-w-2 tw-rotate-45 tw-bg-gray-900',
            arrowPositionClasses
          ]"
        ></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({
  name: 'TwTooltip'
})

const props = withDefaults(
  defineProps<{
    text: string
    position?: 'top' | 'right' | 'bottom' | 'left'
    className?: string
  }>(),
  {
    position: 'top',
    className: ''
  }
)

const isVisible = ref(false)

const positionClasses = computed(() => {
  switch (props.position) {
    case 'right':
      return 'tw-left-full tw-top-1/2 tw-ml-2 -tw-translate-y-1/2'
    case 'bottom':
      return 'tw-top-full tw-left-1/2 tw-mt-2 -tw-translate-x-1/2'
    case 'left':
      return 'tw-right-full tw-top-1/2 tw-mr-2 -tw-translate-y-1/2'
    default:
      return 'tw-bottom-full tw-left-1/2 tw-mb-2 -tw-translate-x-1/2'
  }
})

const arrowPositionClasses = computed(() => {
  switch (props.position) {
    case 'right':
      return 'tw-left-0 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2'
    case 'bottom':
      return 'tw-top-0 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2'
    case 'left':
      return 'tw-right-0 tw-top-1/2 tw-translate-x-1/2 -tw-translate-y-1/2'
    default:
      return 'tw-bottom-0 tw-left-1/2 -tw-translate-x-1/2 tw-translate-y-1/2'
  }
})
</script> 