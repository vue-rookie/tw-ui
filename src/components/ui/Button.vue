<template>
  <button
    :class="[
      'tw-button',
      `tw-button-${type}`,
      `tw-button-${size}`,
      { 'tw-button-plain': plain },
      { 'tw-button-rounded': rounded },
      { 'tw-button-circle': circle },
      { 'tw-button-block': block },
      { 'tw-button-loading': loading },
      { 'tw-button-disabled': disabled }
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="tw-button-loading-icon">
      <span class="tw-button-spinner"></span>
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
interface ButtonProps {
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'small' | 'default' | 'large'
  plain?: boolean
  rounded?: boolean
  circle?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  block?: boolean
  tag?: string
  nativeType?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'default',
  plain: false,
  rounded: false,
  circle: false,
  disabled: false,
  loading: false,
  iconPosition: 'left',
  block: false,
  tag: 'button',
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
  @apply tw-inline-flex tw-items-center tw-justify-center tw-font-medium tw-border tw-border-transparent tw-rounded-md tw-shadow-sm tw-transition-all tw-duration-200 tw-ease-in-out;
}

.tw-button:focus {
  @apply tw-outline-none;
}

.tw-button-content {
  @apply tw-flex tw-items-center tw-justify-center;
}

/* 尺寸 */
.tw-button-small {
  @apply tw-px-2.5 tw-py-1.5 tw-text-xs;
}

.tw-button-default {
  @apply tw-px-4 tw-py-2 tw-text-sm;
}

.tw-button-large {
  @apply tw-px-6 tw-py-3 tw-text-base;
}

/* 类型 */
.tw-button-primary {
  @apply tw-bg-blue-500 tw-text-white;
}

.tw-button-primary:hover {
  @apply tw-bg-blue-600;
}

.tw-button-primary:focus {
  @apply tw-ring-2 tw-ring-offset-2 tw-ring-blue-500;
}

.tw-button-primary:active {
  @apply tw-bg-blue-700;
}

.tw-button-secondary {
  @apply tw-bg-gray-500 tw-text-white;
}

.tw-button-secondary:hover {
  @apply tw-bg-gray-600;
}

.tw-button-secondary:focus {
  @apply tw-ring-2 tw-ring-offset-2 tw-ring-gray-500;
}

.tw-button-secondary:active {
  @apply tw-bg-gray-700;
}

.tw-button-success {
  @apply tw-bg-green-500 tw-text-white;
}

.tw-button-success:hover {
  @apply tw-bg-green-600;
}

.tw-button-success:focus {
  @apply tw-ring-2 tw-ring-offset-2 tw-ring-green-500;
}

.tw-button-success:active {
  @apply tw-bg-green-700;
}

.tw-button-warning {
  @apply tw-bg-yellow-500 tw-text-white;
}

.tw-button-warning:hover {
  @apply tw-bg-yellow-600;
}

.tw-button-warning:focus {
  @apply tw-ring-2 tw-ring-offset-2 tw-ring-yellow-500;
}

.tw-button-warning:active {
  @apply tw-bg-yellow-700;
}

.tw-button-danger {
  @apply tw-bg-red-500 tw-text-white;
}

.tw-button-danger:hover {
  @apply tw-bg-red-600;
}

.tw-button-danger:focus {
  @apply tw-ring-2 tw-ring-offset-2 tw-ring-red-500;
}

.tw-button-danger:active {
  @apply tw-bg-red-700;
}

.tw-button-info {
  @apply tw-bg-blue-100 tw-text-blue-800;
}

.tw-button-info:hover {
  @apply tw-bg-blue-200;
}

.tw-button-info:focus {
  @apply tw-ring-2 tw-ring-offset-2 tw-ring-blue-400;
}

.tw-button-info:active {
  @apply tw-bg-blue-300;
}

/* 朴素按钮 */
.tw-button-plain.tw-button-primary {
  @apply tw-bg-transparent tw-text-blue-500 tw-border-blue-500;
}

.tw-button-plain.tw-button-primary:hover {
  @apply tw-bg-blue-50;
}

.tw-button-plain.tw-button-primary:active {
  @apply tw-bg-blue-100;
}

.tw-button-plain.tw-button-secondary {
  @apply tw-bg-transparent tw-text-gray-500 tw-border-gray-500;
}

.tw-button-plain.tw-button-secondary:hover {
  @apply tw-bg-gray-50;
}

.tw-button-plain.tw-button-secondary:active {
  @apply tw-bg-gray-100;
}

.tw-button-plain.tw-button-success {
  @apply tw-bg-transparent tw-text-green-500 tw-border-green-500;
}

.tw-button-plain.tw-button-success:hover {
  @apply tw-bg-green-50;
}

.tw-button-plain.tw-button-success:active {
  @apply tw-bg-green-100;
}

.tw-button-plain.tw-button-warning {
  @apply tw-bg-transparent tw-text-yellow-500 tw-border-yellow-500;
}

.tw-button-plain.tw-button-warning:hover {
  @apply tw-bg-yellow-50;
}

.tw-button-plain.tw-button-warning:active {
  @apply tw-bg-yellow-100;
}

.tw-button-plain.tw-button-danger {
  @apply tw-bg-transparent tw-text-red-500 tw-border-red-500;
}

.tw-button-plain.tw-button-danger:hover {
  @apply tw-bg-red-50;
}

.tw-button-plain.tw-button-danger:active {
  @apply tw-bg-red-100;
}

.tw-button-plain.tw-button-info {
  @apply tw-bg-transparent tw-text-blue-400 tw-border-blue-200;
}

.tw-button-plain.tw-button-info:hover {
  @apply tw-bg-blue-50;
}

.tw-button-plain.tw-button-info:active {
  @apply tw-bg-blue-100;
}

/* 圆角按钮 */
.tw-button-rounded {
  @apply tw-rounded-full;
}

/* 圆形按钮 */
.tw-button-circle {
  @apply tw-rounded-full tw-p-0;
}

.tw-button-circle.tw-button-small {
  @apply tw-w-8 tw-h-8;
}

.tw-button-circle.tw-button-default {
  @apply tw-w-10 tw-h-10;
}

.tw-button-circle.tw-button-large {
  @apply tw-w-12 tw-h-12;
}

/* 禁用状态 */
.tw-button-disabled {
  @apply tw-opacity-60 tw-cursor-not-allowed;
}

.tw-button-disabled:hover,
.tw-button-disabled:focus,
.tw-button-disabled:active {
  @apply tw-opacity-60;
}

/* 加载状态 */
.tw-button-loading {
  @apply tw-cursor-wait;
}

.tw-button-loading-icon {
  @apply tw-mr-2;
}

/* 图标 */
.tw-button-icon-left {
  @apply tw-mr-2;
}

.tw-button-icon-right {
  @apply tw-ml-2;
}

/* 块级按钮 */
.tw-button-block {
  @apply tw-w-full;
}

/* 添加微妙的过渡效果 */
.tw-button {
  transform: translateY(0);
}

.tw-button:active:not(.tw-button-disabled):not(.tw-button-loading) {
  transform: translateY(1px);
}

/* 添加阴影效果 */
.tw-button:not(.tw-button-plain):not(.tw-button-disabled):not(.tw-button-loading) {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.tw-button:not(.tw-button-plain):not(.tw-button-disabled):not(.tw-button-loading):hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style> 