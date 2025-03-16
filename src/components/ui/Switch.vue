<template>
  <label 
    class="tw-switch-wrapper"
    :class="[
      { 'tw-switch-wrapper-disabled': disabled },
      { 'tw-switch-wrapper-block': block }
    ]"
  >
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :disabled="disabled"
      class="tw-switch"
      :class="[
        `tw-switch-${size}`,
        { 'tw-switch-checked': modelValue },
        { 'tw-switch-disabled': disabled }
      ]"
      @click="toggle"
      @keydown.space.prevent="toggle"
    >
      <span class="tw-switch-handle"></span>
    </button>
    <span v-if="$slots.default" class="tw-switch-label">
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
interface SwitchProps {
  modelValue: boolean
  disabled?: boolean
  size?: 'small' | 'default' | 'large'
  block?: boolean
}

const props = withDefaults(defineProps<SwitchProps>(), {
  disabled: false,
  size: 'default',
  block: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

// 切换开关状态
const toggle = () => {
  if (props.disabled) return
  
  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style scoped>
.tw-switch-wrapper {
  @apply tw-inline-flex tw-items-center tw-cursor-pointer tw-select-none;
}

.tw-switch-wrapper-block {
  @apply tw-flex tw-w-full;
}

.tw-switch-wrapper-disabled {
  @apply tw-cursor-not-allowed tw-opacity-60;
}

.tw-switch {
  @apply tw-relative tw-inline-flex tw-flex-shrink-0 tw-border-2 tw-border-transparent tw-rounded-full;
  @apply tw-cursor-pointer tw-transition-colors tw-ease-in-out tw-duration-200;
  @apply tw-bg-gray-200 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-opacity-50;
}

.tw-switch-small {
  @apply tw-h-5 tw-w-9;
}

.tw-switch-default {
  @apply tw-h-6 tw-w-11;
}

.tw-switch-large {
  @apply tw-h-7 tw-w-14;
}

.tw-switch-handle {
  @apply tw-pointer-events-none tw-inline-block tw-rounded-full tw-bg-white tw-shadow;
  @apply tw-transform tw-ring-0 tw-transition tw-ease-in-out tw-duration-200;
}

.tw-switch-small .tw-switch-handle {
  @apply tw-h-4 tw-w-4 tw-translate-x-0;
}

.tw-switch-default .tw-switch-handle {
  @apply tw-h-5 tw-w-5 tw-translate-x-0;
}

.tw-switch-large .tw-switch-handle {
  @apply tw-h-6 tw-w-6 tw-translate-x-0;
}

.tw-switch-checked {
  @apply tw-bg-blue-500;
}

.tw-switch-small.tw-switch-checked .tw-switch-handle {
  @apply tw-translate-x-4;
}

.tw-switch-default.tw-switch-checked .tw-switch-handle {
  @apply tw-translate-x-5;
}

.tw-switch-large.tw-switch-checked .tw-switch-handle {
  @apply tw-translate-x-7;
}

.tw-switch-disabled {
  @apply tw-opacity-50 tw-cursor-not-allowed;
}

.tw-switch-label {
  @apply tw-ml-2 tw-text-sm tw-text-gray-700;
}

/* 悬停效果 */
.tw-switch:not(.tw-switch-disabled):hover {
  @apply tw-bg-gray-300;
}

.tw-switch-checked:not(.tw-switch-disabled):hover {
  @apply tw-bg-blue-600;
}

/* 点击动画 */
.tw-switch:active .tw-switch-handle {
  @apply tw-scale-90;
}
</style> 