<template>
  <label 
    class="tw-checkbox-wrapper"
    :class="[
      { 'tw-checkbox-wrapper-disabled': disabled },
      { 'tw-checkbox-wrapper-block': block }
    ]"
  >
    <span 
      class="tw-checkbox"
      :class="[
        { 'tw-checkbox-checked': modelValue },
        { 'tw-checkbox-disabled': disabled },
        { 'tw-checkbox-indeterminate': indeterminate }
      ]"
    >
      <input
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :name="name"
        :value="value"
        class="tw-checkbox-input"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span class="tw-checkbox-inner">
        <Icon v-if="modelValue && !indeterminate" icon="mdi:check" class="tw-checkbox-icon" />
        <Icon v-if="indeterminate" icon="mdi:minus" class="tw-checkbox-icon" />
      </span>
    </span>
    <span v-if="$slots.default" class="tw-checkbox-label">
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface CheckboxProps {
  modelValue: boolean
  disabled?: boolean
  indeterminate?: boolean
  name?: string
  value?: string | number | boolean
  block?: boolean
}

defineProps<CheckboxProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

// 处理变更事件
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}

// 处理焦点事件
const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

// 处理失焦事件
const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>

<style scoped>
.tw-checkbox-wrapper {
  @apply tw-inline-flex tw-items-center tw-cursor-pointer tw-select-none;
  @apply tw-transition-all tw-duration-200 tw-ease-in-out;
}

.tw-checkbox-wrapper-block {
  @apply tw-flex tw-w-full;
}

.tw-checkbox-wrapper-disabled {
  @apply tw-cursor-not-allowed tw-opacity-60;
}

.tw-checkbox {
  @apply tw-relative tw-inline-flex tw-items-center tw-justify-center;
  @apply tw-w-5 tw-h-5 tw-rounded tw-border tw-border-gray-300 tw-bg-white;
  @apply tw-transition-all tw-duration-200 tw-ease-in-out;
}

.tw-checkbox-input {
  @apply tw-absolute tw-opacity-0 tw-w-full tw-h-full tw-cursor-pointer;
  @apply tw-z-10;
}

.tw-checkbox-inner {
  @apply tw-inline-block tw-w-full tw-h-full tw-rounded;
  @apply tw-transition-all tw-duration-200 tw-ease-in-out;
}

.tw-checkbox-label {
  @apply tw-ml-2 tw-text-sm tw-text-gray-700;
  @apply tw-transition-colors tw-duration-200;
}

.tw-checkbox-icon {
  @apply tw-w-4 tw-h-4 tw-text-white;
}

/* 选中状态 */
.tw-checkbox-checked {
  @apply tw-border-blue-500 tw-bg-blue-500;
}

/* 半选状态 */
.tw-checkbox-indeterminate {
  @apply tw-border-blue-500 tw-bg-blue-500;
}

/* 禁用状态 */
.tw-checkbox-disabled {
  @apply tw-bg-gray-100 tw-border-gray-200;
}

.tw-checkbox-disabled .tw-checkbox-input {
  @apply tw-cursor-not-allowed;
}

.tw-checkbox-disabled.tw-checkbox-checked {
  @apply tw-bg-blue-200 tw-border-blue-200;
}

.tw-checkbox-disabled.tw-checkbox-indeterminate {
  @apply tw-bg-blue-200 tw-border-blue-200;
}

/* 悬停效果 */
.tw-checkbox:not(.tw-checkbox-disabled):hover {
  @apply tw-border-blue-500;
}

/* 聚焦效果 */
.tw-checkbox-input:focus + .tw-checkbox-inner {
  @apply tw-ring-2 tw-ring-blue-500 tw-ring-opacity-50;
}

/* 点击动画 */
.tw-checkbox-input:active + .tw-checkbox-inner {
  transform: scale(0.9);
}
</style> 