<template>
  <div :class="['tw-w-full', className]">
    <div class="tw-border-b">
      <div class="tw-flex tw-flex-wrap -tw-mb-px">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          :class="[
            'tw-inline-flex tw-items-center tw-justify-center tw-px-4 tw-py-2 tw-text-sm tw-font-medium',
            modelValue === tab.value
              ? 'tw-border-b-2 tw-border-blue-500 tw-text-blue-600'
              : 'tw-border-b-2 tw-border-transparent tw-text-gray-500 hover:tw-border-gray-300 hover:tw-text-gray-700'
          ]"
          @click="$emit('update:modelValue', tab.value)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
    <div class="tw-py-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwTabs'
})

defineProps<{
  modelValue: string
  tabs: { label: string; value: string }[]
  className?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script> 