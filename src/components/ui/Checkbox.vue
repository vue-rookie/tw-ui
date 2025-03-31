<template>
  <label 
    class="tw-checkbox-wrapper"
    :class="[
      { 'tw-checkbox-wrapper-disabled': actualDisabled },
      { 'tw-checkbox-wrapper-block': block },
      { 'tw-checkbox-wrapper-button': isButtonStyle },
      { 'tw-checkbox-checked': (isButtonStyle || actualBorder) && actualModelValue },
      { 'tw-checkbox-wrapper-border': actualBorder && !isButtonStyle },
      actualSize ? `tw-checkbox-${actualSize}` : ''
    ]"
  >
    <span 
      v-if="!isButtonStyle"
      class="tw-checkbox"
      :class="[
        { 'tw-checkbox-checked': actualModelValue },
        { 'tw-checkbox-disabled': actualDisabled },
        { 'tw-checkbox-indeterminate': indeterminate }
      ]"
    >
      <input
        type="checkbox"
        :checked="actualModelValue"
        :disabled="actualDisabled"
        :name="name"
        :value="actualValue"
        class="tw-checkbox-input"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span class="tw-checkbox-inner">
        <Icon v-if="actualModelValue && !indeterminate" icon="mdi:check" class="tw-checkbox-icon" />
        <Icon v-if="indeterminate" icon="mdi:minus" class="tw-checkbox-icon" />
      </span>
    </span>
    <span v-else class="tw-checkbox-button">
      <input
        type="checkbox"
        :checked="actualModelValue"
        :disabled="actualDisabled"
        :name="name"
        :value="actualValue"
        class="tw-checkbox-input"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span class="tw-checkbox-button-inner">
        <slot></slot>
      </span>
    </span>
    <span v-if="$slots.default && !isButtonStyle" class="tw-checkbox-label">
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { inject, computed } from 'vue'

// FocusEvent 类型声明
type FocusEvent = globalThis.FocusEvent;

interface CheckboxProps {
  modelValue?: boolean
  disabled?: boolean
  indeterminate?: boolean
  name?: string
  value?: string | number | boolean
  block?: boolean
  label?: string | number | boolean
  border?: boolean
  size?: 'small' | 'default' | 'large'
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  disabled: false,
  indeterminate: false,
  block: false,
  border: false,
  size: 'default'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

interface CheckboxGroupContext {
  name: string
  modelValue: { value: (string | number | boolean)[] }
  disabled: { value: boolean }
  min: { value: number | undefined }
  max: { value: number | undefined }
  button: { value: boolean }
  updateValue: (value: (string | number | boolean)[]) => void
  border: { value: boolean }
  size: { value: 'small' | 'default' | 'large' }
}

// 注入 CheckboxGroup 上下文
const checkboxGroup = inject<CheckboxGroupContext | null>('checkboxGroup', null)

// 计算实际的值和状态
const isGroup = computed(() => !!checkboxGroup)
const actualValue = computed(() => props.value ?? props.label)
const actualDisabled = computed(() => {
  if (isGroup.value && checkboxGroup) {
    return checkboxGroup.disabled.value || props.disabled
  }
  return props.disabled
})
const actualModelValue = computed(() => {
  if (isGroup.value && checkboxGroup && actualValue.value !== undefined) {
    return checkboxGroup.modelValue.value.includes(actualValue.value)
  }
  return props.modelValue
})

// 计算样式
const isButtonStyle = computed(() => isGroup.value && checkboxGroup && checkboxGroup.button.value)
const actualBorder = computed(() => {
  if (isGroup.value && checkboxGroup) {
    return checkboxGroup.border.value || props.border
  }
  return props.border
})
const actualSize = computed(() => {
  if (isGroup.value && checkboxGroup) {
    return checkboxGroup.size.value || props.size
  }
  return props.size
})

// 处理变更事件
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const checked = target.checked

  if (isGroup.value && checkboxGroup) {
    const value = [...checkboxGroup.modelValue.value]
    const actualVal = actualValue.value
    
    if (actualVal === undefined) return
    
    const index = value.indexOf(actualVal)
    
    if (checked && index === -1) {
      if (checkboxGroup.max.value && value.length >= checkboxGroup.max.value) {
        return
      }
      value.push(actualVal)
    } else if (!checked && index > -1) {
      if (checkboxGroup.min.value && value.length <= checkboxGroup.min.value) {
        return
      }
      value.splice(index, 1)
    }
    
    checkboxGroup.updateValue(value)
  } else {
    emit('update:modelValue', checked)
    emit('change', checked)
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
.tw-checkbox-wrapper {
  @apply tw-inline-flex tw-items-center tw-cursor-pointer tw-select-none;
  @apply tw-transition-all tw-duration-200 tw-ease-in-out tw-mr-6 tw-mb-2;
}

.tw-checkbox-wrapper-block {
  @apply tw-flex tw-w-full;
}

.tw-checkbox-wrapper-disabled {
  @apply tw-cursor-not-allowed;
}

/* 带边框样式 */
.tw-checkbox-wrapper-border {
  @apply tw-p-2 tw-border tw-border-gray-300 tw-rounded-md;
  @apply hover:tw-border-blue-500;
}

.tw-checkbox-wrapper-border.tw-checkbox-wrapper-disabled {
  @apply tw-border-gray-200 hover:tw-border-gray-200 tw-bg-gray-50;
}

.tw-checkbox-wrapper-border .tw-checkbox-label {
  @apply tw-ml-2;
}

/* 选中状态下的边框样式 */
.tw-checkbox-wrapper-border.tw-checkbox-checked {
  @apply tw-border-blue-500;
}

/* 根据尺寸调整带边框复选框 */
.tw-checkbox-small.tw-checkbox-wrapper-border {
  @apply tw-p-1.5;
}

.tw-checkbox-large.tw-checkbox-wrapper-border {
  @apply tw-p-3;
}

.tw-checkbox {
  @apply tw-relative tw-inline-flex tw-items-center tw-justify-center;
  @apply tw-w-4 tw-h-4 tw-rounded tw-border tw-border-gray-300 tw-bg-white;
  @apply tw-transition-all tw-duration-200 tw-ease-in-out;
}

.tw-checkbox-small {
  @apply tw-text-xs;
  
  .tw-checkbox {
    @apply tw-w-3.5 tw-h-3.5;
  }
  
  .tw-checkbox-icon {
    @apply tw-w-3 tw-h-3;
  }
}

.tw-checkbox-large {
  @apply tw-text-base;
  
  .tw-checkbox {
    @apply tw-w-5 tw-h-5;
  }
  
  .tw-checkbox-icon {
    @apply tw-w-4 tw-h-4;
  }
}

.tw-checkbox-input {
  @apply tw-absolute tw-opacity-0 tw-w-full tw-h-full tw-cursor-pointer;
  @apply tw-z-10;
}

.tw-checkbox-inner {
  @apply tw-inline-flex tw-items-center tw-justify-center tw-w-full tw-h-full tw-rounded;
  @apply tw-transition-all tw-duration-200 tw-ease-in-out;
}

.tw-checkbox-label {
  @apply tw-ml-2 tw-text-sm tw-text-gray-700;
  @apply tw-transition-colors tw-duration-200;
}

.tw-checkbox-icon {
  @apply tw-w-3.5 tw-h-3.5 tw-text-white tw-transition-transform tw-duration-200;
}

/* 选中状态 */
.tw-checkbox-checked {
  @apply tw-border-blue-500 tw-bg-blue-500;
}

.tw-checkbox-checked .tw-checkbox-icon {
  @apply tw-scale-100;
}

/* 半选状态 */
.tw-checkbox-indeterminate {
  @apply tw-border-blue-500 tw-bg-blue-500;
}

.tw-checkbox-indeterminate .tw-checkbox-icon {
  @apply tw-scale-100;
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

.tw-checkbox-wrapper-disabled .tw-checkbox-label {
  @apply tw-text-gray-400;
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

/* 按钮样式 */
.tw-checkbox-button {
  @apply tw-relative tw-inline-block;
}

.tw-checkbox-button-inner {
  @apply tw-inline-flex tw-items-center tw-justify-center;
  @apply tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-bg-white tw-text-gray-700;
  @apply tw-text-sm tw-font-medium tw-transition-colors tw-duration-200;
}

.tw-checkbox-wrapper-button.tw-checkbox-checked .tw-checkbox-button-inner {
  @apply tw-bg-blue-500 tw-text-white tw-border-blue-500 tw-shadow-sm;
}

.tw-checkbox-wrapper-button:not(.tw-checkbox-wrapper-disabled):hover .tw-checkbox-button-inner {
  @apply tw-border-blue-400 tw-text-blue-500;
}

.tw-checkbox-wrapper-button.tw-checkbox-checked:not(.tw-checkbox-wrapper-disabled):hover .tw-checkbox-button-inner {
  @apply tw-bg-blue-600 tw-border-blue-600 tw-text-white;
}

.tw-checkbox-wrapper-button.tw-checkbox-wrapper-disabled .tw-checkbox-button-inner {
  @apply tw-bg-gray-100 tw-text-gray-400 tw-border-gray-300 tw-cursor-not-allowed;
}

/* 尺寸大小 */
.tw-checkbox-small .tw-checkbox-button-inner {
  @apply tw-px-3 tw-py-1 tw-text-xs;
}

.tw-checkbox-large .tw-checkbox-button-inner {
  @apply tw-px-5 tw-py-2.5 tw-text-base;
}
</style> 