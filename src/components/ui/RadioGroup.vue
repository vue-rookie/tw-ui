<template>
  <div 
    class="tw-radio-group"
    :class="[
      { 'tw-radio-group-disabled': disabled },
      { 'tw-radio-group-button': button },
      size ? `tw-radio-group-${size}` : ''
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'

interface RadioGroupProps {
  modelValue: string | number | boolean
  disabled?: boolean
  button?: boolean
  border?: boolean
  size?: 'small' | 'default' | 'large'
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  disabled: false,
  button: false,
  border: false,
  size: 'default'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void
  (e: 'change', value: string | number | boolean): void
}>()

// 提供上下文给子组件
provide('radioGroup', {
  name: 'radioGroup',
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  button: computed(() => props.button),
  border: computed(() => props.border),
  size: computed(() => props.size),
  updateValue: (value: string | number | boolean) => {
    emit('update:modelValue', value)
    emit('change', value)
  }
})
</script>

<style scoped lang="scss">
.tw-radio-group {
  @apply tw-inline-flex tw-flex-wrap tw-gap-2;
}

.tw-radio-group-disabled {
  @apply tw-opacity-75;
}

.tw-radio-group-button {
  @apply tw-inline-flex tw-flex-wrap tw-gap-0;
}

.tw-radio-group-button:not(.tw-radio-group-disabled) {
  @apply tw-shadow-sm tw-rounded-md tw-overflow-hidden;
}

.tw-radio-group-small {
  @apply tw-gap-1;
}

.tw-radio-group-large {
  @apply tw-gap-3;
}

:deep(.tw-radio-wrapper) {
  @apply tw-mb-0 tw-mr-0;
}

:deep(.tw-radio-group-button .tw-radio-wrapper) {
  @apply tw-mb-0 tw-mr-0;
}

:deep(.tw-radio-group-button .tw-radio-wrapper .tw-radio-button-inner) {
  @apply tw-rounded-none tw-border-r tw-border-gray-300;
}

:deep(.tw-radio-group-button .tw-radio-wrapper:first-child .tw-radio-button-inner) {
  @apply tw-rounded-l-md;
}

:deep(.tw-radio-group-button .tw-radio-wrapper:last-child .tw-radio-button-inner) {
  @apply tw-rounded-r-md tw-border-r-0;
}

:deep(.tw-radio-group-button .tw-radio-wrapper-button.tw-radio-checked + .tw-radio-wrapper-button .tw-radio-button-inner) {
  @apply tw-border-l-blue-500;
}

:deep(.tw-radio-group-button .tw-radio-wrapper-button.tw-radio-checked:not(:last-child) .tw-radio-button-inner) {
  @apply tw-border-r-blue-500;
}
</style> 