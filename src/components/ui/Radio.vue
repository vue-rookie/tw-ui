<template>
  <label 
    class="tw-radio-wrapper"
    :class="[
      { 'tw-radio-wrapper-disabled': actualDisabled },
      { 'tw-radio-wrapper-block': block },
      { 'tw-radio-wrapper-button': isButtonStyle },
      { 'tw-radio-checked': (isButtonStyle || actualBorder) && actualModelValue },
      { 'tw-radio-wrapper-border': actualBorder && !isButtonStyle },
      actualSize ? `tw-radio-${actualSize}` : ''
    ]"
  >
    <span 
      v-if="!isButtonStyle"
      class="tw-radio"
      :class="[
        { 'tw-radio-checked': actualModelValue },
        { 'tw-radio-disabled': actualDisabled }
      ]"
    >
      <input
        type="radio"
        :checked="actualModelValue"
        :disabled="actualDisabled"
        :name="name"
        :value="value"
        class="tw-radio-input"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span class="tw-radio-inner">
        <span v-if="actualModelValue" class="tw-radio-dot"></span>
      </span>
    </span>
    <span v-else class="tw-radio-button">
      <input
        type="radio"
        :checked="actualModelValue"
        :disabled="actualDisabled"
        :name="name"
        :value="value"
        class="tw-radio-input"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span class="tw-radio-button-inner">
        <slot></slot>
      </span>
    </span>
    <span v-if="$slots.default && !isButtonStyle" class="tw-radio-label">
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { inject, computed } from 'vue'

// FocusEvent 类型声明
type FocusEvent = globalThis.FocusEvent;

interface RadioProps {
  modelValue: string | number | boolean
  value: string | number | boolean
  disabled?: boolean
  name?: string
  block?: boolean
  border?: boolean
  size?: 'small' | 'default' | 'large'
}

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: false,
  block: false,
  border: false,
  size: 'default'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void
  (e: 'change', value: string | number | boolean): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

interface RadioGroupContext {
  name: string
  modelValue: { value: string | number | boolean }
  disabled: { value: boolean }
  button: { value: boolean }
  updateValue: (value: string | number | boolean) => void
  border: { value: boolean }
  size: { value: 'small' | 'default' | 'large' }
}

// 注入 RadioGroup 上下文
const radioGroup = inject<RadioGroupContext | null>('radioGroup', null)

// 计算实际的值和状态
const isGroup = computed(() => !!radioGroup)
const actualDisabled = computed(() => {
  if (isGroup.value && radioGroup) {
    return radioGroup.disabled.value || props.disabled
  }
  return props.disabled
})
const actualModelValue = computed(() => {
  if (isGroup.value && radioGroup) {
    return radioGroup.modelValue.value === props.value
  }
  return props.modelValue === props.value
})

// 计算样式
const isButtonStyle = computed(() => isGroup.value && radioGroup && radioGroup.button.value)
const actualBorder = computed(() => {
  if (isGroup.value && radioGroup) {
    return radioGroup.border.value || props.border
  }
  return props.border
})
const actualSize = computed(() => {
  if (isGroup.value && radioGroup) {
    return radioGroup.size.value || props.size
  }
  return props.size
})

// 处理变更事件
const handleChange = () => {
  if (isGroup.value && radioGroup) {
    radioGroup.updateValue(props.value)
  } else {
    emit('update:modelValue', props.value)
    emit('change', props.value)
  }
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

<style scoped lang="scss">
.tw-radio-wrapper {
  @apply tw-inline-flex tw-items-center tw-cursor-pointer tw-select-none;
  @apply tw-transition-all tw-duration-200 tw-ease-in-out tw-mr-6 tw-mb-2;
}

.tw-radio-wrapper-block {
  @apply tw-flex tw-w-full;
}

.tw-radio-wrapper-disabled {
  @apply tw-cursor-not-allowed;
}

/* 带边框样式 */
.tw-radio-wrapper-border {
  @apply tw-p-2 tw-border tw-border-gray-300 tw-rounded-md;
  @apply hover:tw-border-blue-500;
}

.tw-radio-wrapper-border.tw-radio-wrapper-disabled {
  @apply tw-border-gray-200 hover:tw-border-gray-200 tw-bg-gray-50;
}

.tw-radio-wrapper-border .tw-radio-label {
  @apply tw-ml-2;
}

/* 选中状态下的边框样式 */
.tw-radio-wrapper-border.tw-radio-checked {
  @apply tw-border-blue-500;
}

/* 根据尺寸调整带边框单选框 */
.tw-radio-small.tw-radio-wrapper-border {
  @apply tw-p-1.5;
}

.tw-radio-large.tw-radio-wrapper-border {
  @apply tw-p-3;
}

.tw-radio {
  @apply tw-relative tw-inline-flex tw-items-center tw-justify-center;
  @apply tw-w-4 tw-h-4 tw-rounded-full tw-border tw-border-gray-300 tw-bg-white;
  @apply tw-transition-all tw-duration-200 tw-ease-in-out;
}

.tw-radio-small {
  @apply tw-text-xs;
  
  .tw-radio {
    @apply tw-w-3.5 tw-h-3.5;
  }
  
  .tw-radio-dot {
    @apply tw-w-1.5 tw-h-1.5;
  }
}

.tw-radio-large {
  @apply tw-text-base;
  
  .tw-radio {
    @apply tw-w-5 tw-h-5;
  }
  
  .tw-radio-dot {
    @apply tw-w-2.5 tw-h-2.5;
  }
}

.tw-radio-input {
  @apply tw-absolute tw-opacity-0 tw-w-full tw-h-full tw-cursor-pointer;
  @apply tw-z-10;
}

.tw-radio-inner {
  @apply tw-inline-flex tw-items-center tw-justify-center tw-w-full tw-h-full tw-rounded-full;
  @apply tw-transition-all tw-duration-200 tw-ease-in-out;
}

.tw-radio-label {
  @apply tw-ml-2 tw-text-sm tw-text-gray-700;
  @apply tw-transition-colors tw-duration-200;
}

.tw-radio-dot {
  @apply tw-w-2 tw-h-2 tw-rounded-full tw-bg-white;
  @apply tw-transition-transform tw-duration-200;
  transform: scale(0);
}

/* 选中状态 */
.tw-radio-checked {
  @apply tw-border-blue-500 tw-bg-blue-500;
}

.tw-radio-checked .tw-radio-dot {
  transform: scale(1);
}

/* 禁用状态 */
.tw-radio-disabled {
  @apply tw-bg-gray-100 tw-border-gray-200;
}

.tw-radio-disabled .tw-radio-input {
  @apply tw-cursor-not-allowed;
}

.tw-radio-disabled.tw-radio-checked {
  @apply tw-bg-blue-200 tw-border-blue-200;
}

.tw-radio-wrapper-disabled .tw-radio-label {
  @apply tw-text-gray-400;
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

/* 按钮样式 */
.tw-radio-button {
  @apply tw-relative tw-inline-block;
}

.tw-radio-button-inner {
  @apply tw-inline-flex tw-items-center tw-justify-center;
  @apply tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-bg-white tw-text-gray-700;
  @apply tw-text-sm tw-font-medium tw-transition-colors tw-duration-200;
}

.tw-radio-wrapper-button.tw-radio-checked .tw-radio-button-inner {
  @apply tw-bg-blue-500 tw-text-white tw-border-blue-500 tw-shadow-sm;
}

.tw-radio-wrapper-button:not(.tw-radio-wrapper-disabled):hover .tw-radio-button-inner {
  @apply tw-border-blue-400 tw-text-blue-500;
}

.tw-radio-wrapper-button.tw-radio-checked:not(.tw-radio-wrapper-disabled):hover .tw-radio-button-inner {
  @apply tw-bg-blue-600 tw-border-blue-600 tw-text-white;
}

.tw-radio-wrapper-button.tw-radio-wrapper-disabled .tw-radio-button-inner {
  @apply tw-bg-gray-100 tw-text-gray-400 tw-border-gray-300 tw-cursor-not-allowed;
}

/* 尺寸大小 */
.tw-radio-small .tw-radio-button-inner {
  @apply tw-px-3 tw-py-1 tw-text-xs;
}

.tw-radio-large .tw-radio-button-inner {
  @apply tw-px-5 tw-py-2.5 tw-text-base;
}
</style> 