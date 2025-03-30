<template>
  <button
    :class="[
      'tw-button tw-flex tw-items-center tw-justify-center',
      `tw-button-${type}`,
      `tw-button-${size}`,
      { 'tw-button-plain': plain },
      { 'tw-button-round': round },
      { 'tw-button-circle': circle },
      { 'tw-button-block': block },
      { 'tw-button-loading': loading },
      { 'tw-button-disabled': disabled },
      { 'tw-cursor-pointer': !disabled && !loading }
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="tw-button-loading-icon tw-flex tw-items-center">
      <Icon icon="mingcute:loading-line" class="tw-animate-spin tw-text-xl" />
    </span>
    <span v-else-if="icon && iconPosition === 'left'" class="tw-button-icon tw-button-icon-left">
      <component :is="resolveIcon()" />
    </span>
    <span class="tw-button-content">
      <slot></slot>
    </span>
    <span v-if="icon && iconPosition === 'right' && !loading" class="tw-button-icon tw-button-icon-right">
      <component :is="resolveIcon()" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface ButtonProps {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'small' | 'default' | 'large'
  plain?: boolean
  round?: boolean
  circle?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  block?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'default',
  plain: false,
  round: false,
  circle: false,
  disabled: false,
  loading: false,
  iconPosition: 'left',
  block: false,
  nativeType: 'button'
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// 处理点击事件
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}

// 解析图标组件
const resolveIcon = () => {
  // 这里可以根据实际情况实现图标解析逻辑
  // 例如，可以返回一个SVG图标组件
  return 'div'
}
</script>

<style scoped>
.tw-button {
  @apply tw-inline-flex tw-items-center tw-justify-center tw-font-medium tw-rounded-md tw-shadow-sm tw-transition-all tw-duration-200 tw-ease-in-out tw-select-none;
  @apply tw-px-4 tw-py-2 tw-text-sm;
  @apply hover:tw-shadow-md active:tw-shadow-sm;
}

.tw-button:focus {
  @apply tw-outline-none;
}

.tw-button-content {
  @apply tw-flex tw-items-center tw-justify-center tw-gap-2;
}

/* 尺寸 */
.tw-button-small {
  @apply tw-px-2.5 tw-py-1.5 tw-text-xs;
}

.tw-button-large {
  @apply tw-px-6 tw-py-3 tw-text-base;
}

/* 类型 */
.tw-button-default {
  @apply tw-bg-white tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300;
  @apply hover:tw-bg-gray-50 hover:tw-border-gray-400;
  @apply active:tw-bg-gray-100;
}

.tw-button-primary {
  @apply tw-bg-blue-500 tw-text-white tw-border-0;
  @apply hover:tw-bg-blue-600;
  @apply active:tw-bg-blue-700;
}

.tw-button-success {
  @apply tw-bg-green-500 tw-text-white tw-border-0;
  @apply hover:tw-bg-green-600;
  @apply active:tw-bg-green-700;
}

.tw-button-warning {
  @apply tw-bg-yellow-500 tw-text-white tw-border-0;
  @apply hover:tw-bg-yellow-600;
  @apply active:tw-bg-yellow-700;
}

.tw-button-danger {
  @apply tw-bg-red-500 tw-text-white tw-border-0;
  @apply hover:tw-bg-red-600;
  @apply active:tw-bg-red-700;
}

/* 朴素按钮 */
.tw-button-plain {
  @apply tw-bg-transparent tw-border tw-border-solid;
}

.tw-button-plain.tw-button-default {
  @apply tw-text-gray-600 tw-border-gray-300;
  @apply hover:tw-text-gray-700 hover:tw-bg-gray-50 hover:tw-border-gray-400;
}

.tw-button-plain.tw-button-primary {
  @apply tw-text-blue-500 tw-border-blue-500;
  @apply hover:tw-text-blue-600 hover:tw-bg-blue-50 hover:tw-border-blue-600;
}

.tw-button-plain.tw-button-success {
  @apply tw-text-green-500 tw-border-green-500;
  @apply hover:tw-text-green-600 hover:tw-bg-green-50 hover:tw-border-green-600;
}

.tw-button-plain.tw-button-warning {
  @apply tw-text-yellow-500 tw-border-yellow-500;
  @apply hover:tw-text-yellow-600 hover:tw-bg-yellow-50 hover:tw-border-yellow-600;
}

.tw-button-plain.tw-button-danger {
  @apply tw-text-red-500 tw-border-red-500;
  @apply hover:tw-text-red-600 hover:tw-bg-red-50 hover:tw-border-red-600;
}

/* 圆角按钮 */
.tw-button-round {
  @apply tw-rounded-full;
}

/* 圆形按钮 */
.tw-button-circle {
  @apply tw-rounded-full tw-p-2;
}

/* 块级按钮 */
.tw-button-block {
  @apply tw-w-full;
}

/* 禁用状态 */
.tw-button-disabled {
  @apply tw-opacity-60 tw-cursor-not-allowed;
  @apply hover:tw-shadow-sm active:tw-shadow-sm;
}

/* 加载状态 */
.tw-button-loading {
  @apply hover:tw-shadow-sm active:tw-shadow-sm;
}

.tw-button-loading-icon {
  @apply tw-mr-2;
}

/* 图标 */
.tw-button-icon {
  @apply tw-flex tw-items-center tw-justify-center;
}

.tw-button-icon-left {
  @apply tw-mr-1;
}

.tw-button-icon-right {
  @apply tw-ml-1;
}
</style> 