<template>
  <div :class="['tw-flex tw-items-center tw-justify-between', className]">
    <div class="tw-flex tw-flex-1 tw-justify-between sm:tw-hidden">
      <button
        :disabled="modelValue <= 1"
        :class="[
          'tw-relative tw-inline-flex tw-items-center tw-rounded-md tw-border tw-border-gray-300 tw-bg-white tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700',
          modelValue > 1
            ? 'hover:tw-bg-gray-50'
            : 'tw-opacity-50 tw-cursor-not-allowed'
        ]"
        @click="$emit('update:modelValue', modelValue - 1)"
      >
        上一页
      </button>
      <button
        :disabled="modelValue >= totalPages"
        :class="[
          'tw-relative tw-ml-3 tw-inline-flex tw-items-center tw-rounded-md tw-border tw-border-gray-300 tw-bg-white tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700',
          modelValue < totalPages
            ? 'hover:tw-bg-gray-50'
            : 'tw-opacity-50 tw-cursor-not-allowed'
        ]"
        @click="$emit('update:modelValue', modelValue + 1)"
      >
        下一页
      </button>
    </div>
    <div class="tw-hidden sm:tw-flex sm:tw-flex-1 sm:tw-items-center sm:tw-justify-between">
      <div>
        <p class="tw-text-sm tw-text-gray-700">
          显示第
          <span class="tw-font-medium">{{ startItem }}</span>
          到
          <span class="tw-font-medium">{{ endItem }}</span>
          条，共
          <span class="tw-font-medium">{{ total }}</span>
          条
        </p>
      </div>
      <div>
        <nav class="tw-isolate tw-inline-flex -tw-space-x-px tw-rounded-md tw-shadow-sm" aria-label="Pagination">
          <button
            :disabled="modelValue <= 1"
            class="tw-relative tw-inline-flex tw-items-center tw-rounded-l-md tw-px-2 tw-py-2 tw-text-gray-400 tw-ring-1 tw-ring-inset tw-ring-gray-300 hover:tw-bg-gray-50 focus:tw-z-20 focus:tw-outline-offset-0"
            @click="$emit('update:modelValue', modelValue - 1)"
          >
            <span class="tw-sr-only">上一页</span>
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
              class="tw-h-5 tw-w-5"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          
          <template v-for="page in displayedPages" :key="page">
            <span
              v-if="page === '...'"
              class="tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-text-sm tw-font-semibold tw-text-gray-700 tw-ring-1 tw-ring-inset tw-ring-gray-300 focus:tw-outline-offset-0"
            >
              ...
            </span>
            <button
              v-else
              :class="[
                'tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-text-sm tw-font-semibold focus:tw-z-20 focus:tw-outline-offset-0',
                page === modelValue
                  ? 'tw-z-10 tw-bg-blue-600 tw-text-white focus:tw-outline-none'
                  : 'tw-text-gray-900 tw-ring-1 tw-ring-inset tw-ring-gray-300 hover:tw-bg-gray-50'
              ]"
              @click="$emit('update:modelValue', Number(page))"
            >
              {{ page }}
            </button>
          </template>
          
          <button
            :disabled="modelValue >= totalPages"
            class="tw-relative tw-inline-flex tw-items-center tw-rounded-r-md tw-px-2 tw-py-2 tw-text-gray-400 tw-ring-1 tw-ring-inset tw-ring-gray-300 hover:tw-bg-gray-50 focus:tw-z-20 focus:tw-outline-offset-0"
            @click="$emit('update:modelValue', modelValue + 1)"
          >
            <span class="tw-sr-only">下一页</span>
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
              class="tw-h-5 tw-w-5"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'TwPagination'
})

const props = defineProps<{
  modelValue: number
  total: number
  perPage: number
  siblingCount?: number
  className?: string
}>()

const siblingCount = props.siblingCount ?? 1
const className = props.className ?? ''

defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const totalPages = computed(() => Math.ceil(props.total / props.perPage))
const startItem = computed(() => (props.modelValue - 1) * props.perPage + 1)
const endItem = computed(() => Math.min(props.modelValue * props.perPage, props.total))

const displayedPages = computed(() => {
  const totalPageNumbers = siblingCount * 2 + 3 // siblings on each side + first + last + current
  
  if (totalPages.value <= totalPageNumbers) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1)
  }
  
  const leftSiblingIndex = Math.max(props.modelValue - siblingCount, 1)
  const rightSiblingIndex = Math.min(props.modelValue + siblingCount, totalPages.value)
  
  const shouldShowLeftDots = leftSiblingIndex > 2
  const shouldShowRightDots = rightSiblingIndex < totalPages.value - 1
  
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 1 + 2 * siblingCount
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
    return [...leftRange, '...', totalPages.value]
  }
  
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 1 + 2 * siblingCount
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages.value - rightItemCount + i + 1
    )
    return [1, '...', ...rightRange]
  }
  
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    )
    return [1, '...', ...middleRange, '...', totalPages.value]
  }
  
  return []
})
</script> 