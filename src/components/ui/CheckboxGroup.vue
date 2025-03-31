<template>
  <div 
    class="tw-checkbox-group"
    :class="[
      { 'tw-checkbox-group-disabled': disabled },
      { 'tw-checkbox-group-button': button },
      size ? `tw-checkbox-group-${size}` : ''
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'

interface CheckboxGroupProps {
  modelValue: (string | number | boolean)[]
  disabled?: boolean
  min?: number
  max?: number
  button?: boolean
  border?: boolean
  size?: 'small' | 'default' | 'large'
}

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  disabled: false,
  min: undefined,
  max: undefined,
  button: false,
  border: false,
  size: 'default'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number | boolean)[]): void
  (e: 'change', value: (string | number | boolean)[]): void
}>()

// 提供上下文给子组件
provide('checkboxGroup', {
  name: 'checkboxGroup',
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  min: computed(() => props.min),
  max: computed(() => props.max),
  button: computed(() => props.button),
  border: computed(() => props.border),
  size: computed(() => props.size),
  updateValue: (value: (string | number | boolean)[]) => {
    // 确保传递新的数组引用
    emit('update:modelValue', [...value])
    emit('change', [...value])
  }
})
</script>

<style scoped lang="scss">
.tw-checkbox-group {
  @apply tw-inline-flex tw-flex-wrap tw-gap-2;
}

.tw-checkbox-group-disabled {
  @apply tw-opacity-75;
}

.tw-checkbox-group-button {
  @apply tw-inline-flex tw-flex-wrap tw-gap-0;
}

.tw-checkbox-group-button:not(.tw-checkbox-group-disabled) {
  @apply tw-shadow-sm tw-rounded-md tw-overflow-hidden;
}

.tw-checkbox-group-small {
  @apply tw-gap-1;
}

.tw-checkbox-group-large {
  @apply tw-gap-3;
}

:deep(.tw-checkbox-wrapper) {
  @apply tw-mb-0 tw-mr-0;
}

:deep(.tw-checkbox-group-button .tw-checkbox-wrapper) {
  @apply tw-mb-0 tw-mr-0;
}

:deep(.tw-checkbox-group-button .tw-checkbox-wrapper .tw-checkbox-button-inner) {
  @apply tw-rounded-none tw-border-r tw-border-gray-300;
}

:deep(.tw-checkbox-group-button .tw-checkbox-wrapper:first-child .tw-checkbox-button-inner) {
  @apply tw-rounded-l-md;
}

:deep(.tw-checkbox-group-button .tw-checkbox-wrapper:last-child .tw-checkbox-button-inner) {
  @apply tw-rounded-r-md tw-border-r-0;
}

:deep(.tw-checkbox-group-button .tw-checkbox-wrapper-button.tw-checkbox-checked:not(:first-child) .tw-checkbox-button-inner) {
  @apply tw-border-l-blue-500;
}

:deep(.tw-checkbox-group-button .tw-checkbox-wrapper-button.tw-checkbox-checked:not(:last-child) .tw-checkbox-button-inner) {
  @apply tw-border-r-blue-500;
}

:deep(.tw-checkbox-group-button .tw-checkbox-wrapper-button.tw-checkbox-checked + .tw-checkbox-wrapper-button .tw-checkbox-button-inner) {
  @apply tw-border-l-blue-500;
}
</style> 