<template>
  <div class="tw-relative">
    <select
      :id="id"
      :value="modelValue"
      :disabled="disabled"
      :class="[
        'tw-flex tw-h-10 tw-w-full tw-appearance-none tw-rounded-md tw-border tw-border-gray-200 tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-white focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50',
        className
      ]"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <slot></slot>
    </select>
    <div class="tw-pointer-events-none tw-absolute tw-right-3 tw-top-1/2 tw-transform -tw-translate-y-1/2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="tw-h-4 tw-w-4 tw-opacity-50"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TwSelect'
})

withDefaults(
  defineProps<{
    id?: string
    modelValue?: string
    placeholder?: string
    disabled?: boolean
    className?: string
  }>(),
  {
    id: '',
    modelValue: '',
    placeholder: '',
    disabled: false,
    className: ''
  }
)

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}>()
</script> 