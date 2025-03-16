<template>
  <label 
    class="tw-radio-wrapper"
    :class="[
      { 'tw-radio-wrapper-disabled': disabled },
      { 'tw-radio-wrapper-block': block }
    ]"
  >
    <span 
      class="tw-radio"
      :class="[
        { 'tw-radio-checked': modelValue === value },
        { 'tw-radio-disabled': disabled }
      ]"
    >
      <input
        type="radio"
        :checked="modelValue === value"
        :disabled="disabled"
        :name="name"
        :value="value"
        class="tw-radio-input"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span class="tw-radio-inner"></span>
    </span>
    <span v-if="$slots.default" class="tw-radio-label">
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
interface RadioProps {
  modelValue: string | number | boolean
  value: string | number | boolean
  disabled?: boolean
  name?: string
  block?: boolean
}

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: false,
  block: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void
  (e: 'change', value: string | number | boolean): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

// 处理变更事件
const handleChange = () => {
  emit('update:modelValue', props.value)
  emit('change', props.value)
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
.tw-radio-wrapper {
  @apply tw-inline-flex tw-items-center tw-cursor-pointer tw-select-none;
  @apply tw-transition-all tw-duration-200 tw-ease-in-out;
}

.tw-radio-wrapper-block {
  @apply tw-flex tw-w-full;
}

.tw-radio-wrapper-disabled {
  @apply tw-cursor-not-allowed tw-opacity-60;
}

.tw-radio {
  @apply tw-relative tw-inline-flex tw-items-center tw-justify-center;
  @apply tw-w-5 tw-h-5 tw-rounded-full tw-border tw-border-gray-300 tw-bg-white;
  @apply tw-transition-all tw-duration-200 tw-ease-in-out;
}

.tw-radio-input {
  @apply tw-absolute tw-opacity-0 tw-w-full tw-h-full tw-cursor-pointer;
  @apply tw-z-10;
}

.tw-radio-inner {
  @apply tw-inline-block tw-w-full tw-h-full tw-rounded-full;
  @apply tw-transition-all tw-duration-200 tw-ease-in-out;
}

.tw-radio-label {
  @apply tw-ml-2 tw-text-sm tw-text-gray-700;
  @apply tw-transition-colors tw-duration-200;
}

/* 选中状态 */
.tw-radio-checked {
  @apply tw-border-blue-500;
}

.tw-radio-checked .tw-radio-inner::after {
  content: '';
  @apply tw-absolute tw-top-1/2 tw-left-1/2 tw-bg-blue-500 tw-rounded-full;
  width: 10px;
  height: 10px;
  transform: translate(-50%, -50%);
}

/* 禁用状态 */
.tw-radio-disabled {
  @apply tw-bg-gray-100 tw-border-gray-200;
}

.tw-radio-disabled .tw-radio-input {
  @apply tw-cursor-not-allowed;
}

.tw-radio-disabled.tw-radio-checked .tw-radio-inner::after {
  @apply tw-bg-blue-300;
}

/* 悬停效果 */
.tw-radio:not(.tw-radio-disabled):hover {
  @apply tw-border-blue-500;
}

/* 聚焦效果 */
.tw-radio-input:focus + .tw-radio-inner {
  @apply tw-ring-2 tw-ring-blue-500 tw-ring-opacity-50;
}

/* 点击动画 */
.tw-radio-input:active + .tw-radio-inner {
  transform: scale(0.9);
}
</style> 