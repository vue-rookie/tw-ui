<template>
  <div 
    class="tw-input-wrapper"
    :class="[
      { 'tw-input-wrapper-disabled': disabled },
      { 'tw-input-wrapper-readonly': readonly },
      { 'tw-input-wrapper-error': error },
      { 'tw-input-wrapper-success': success },
      { 'tw-input-wrapper-block': block }
    ]"
  >
    <!-- 前缀图标 -->
    <div v-if="$slots.prefix || prefixIcon" class="tw-input-prefix">
      <slot name="prefix">
        <Icon v-if="prefixIcon" :icon="prefixIcon" class="tw-input-icon" />
      </slot>
    </div>
    
    <!-- 输入框 -->
    <input
      ref="inputRef"
      :type="actualType"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      :autocomplete="autocomplete"
      :name="name"
      :form="form"
      :id="id"
      class="tw-input"
      :class="[
        `tw-input-${size}`,
        { 'tw-input-with-prefix': $slots.prefix || prefixIcon },
        { 'tw-input-with-suffix': $slots.suffix || suffixIcon || clearable || showPasswordToggle },
        { 'tw-input-error': error },
        { 'tw-input-success': success }
      ]"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
      @keypress="handleKeypress"
    />
    
    <!-- 后缀图标 -->
    <div 
      v-if="$slots.suffix || suffixIcon || clearable || showPasswordToggle" 
      class="tw-input-suffix"
    >
      <!-- 清除按钮 -->
      <span
        v-if="clearable && modelValue && !disabled && !readonly"
        type="text"
        class="tw-input-clear"
        @click="clearInput"
        tabindex="-1"
      >
        <Icon icon="mdi:close" class="tw-input-icon" />
      </span>
      
      <!-- 密码切换按钮 -->
      <button
        v-if="showPasswordToggle && type === 'password'"
        type="button"
        class="tw-input-password-toggle"
        @click="togglePasswordVisibility"
        tabindex="-1"
      >
        <Icon 
          :icon="showPassword ? 'mdi:eye-off' : 'mdi:eye'" 
          class="tw-input-icon" 
        />
      </button>
      
      <!-- 自定义后缀 -->
      <slot name="suffix">
        <Icon v-if="suffixIcon" :icon="suffixIcon" class="tw-input-icon" />
      </slot>
    </div>
    
    <!-- 字数统计 -->
    <div v-if="showWordLimit && maxlength" class="tw-input-word-count">
      {{ modelValue ? modelValue.length : 0 }}/{{ maxlength }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'

interface InputProps {
  modelValue: string | number
  type?: string
  size?: 'small' | 'default' | 'large'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
  minlength?: number
  autocomplete?: string
  name?: string
  form?: string
  id?: string
  clearable?: boolean
  showPasswordToggle?: boolean
  showWordLimit?: boolean
  prefixIcon?: string
  suffixIcon?: string
  error?: boolean
  success?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'default',
  placeholder: '',
  disabled: false,
  readonly: false,
  maxlength: undefined,
  minlength: undefined,
  autocomplete: 'off',
  name: undefined,
  form: undefined,
  id: undefined,
  clearable: false,
  showPasswordToggle: false,
  showWordLimit: false,
  prefixIcon: undefined,
  suffixIcon: undefined,
  error: false,
  success: false,
  block: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'change', value: string): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'keyup', event: KeyboardEvent): void
  (e: 'keypress', event: KeyboardEvent): void
  (e: 'clear'): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const showPassword = ref(false)
const isFocused = ref(false)

// 计算实际输入类型
const actualType = computed(() => {
  if (props.type === 'password' && showPassword.value) {
    return 'text'
  }
  return props.type
})

// 处理输入事件
const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', value)
}

// 处理变更事件
const handleChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('change', value)
}

// 处理焦点事件
const handleFocus = () => {
  isFocused.value = true
  emit('focus')
}

// 处理失焦事件
const handleBlur = () => {
  isFocused.value = false
  emit('blur')
}

// 处理键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const handleKeyup = (event: KeyboardEvent) => {
  emit('keyup', event)
}

const handleKeypress = (event: KeyboardEvent) => {
  emit('keypress', event)
}

// 清除输入内容
const clearInput = () => {
  if (props.disabled || props.readonly) return
  emit('update:modelValue', '')
  emit('clear')
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// 切换密码显示
const togglePasswordVisibility = () => {
  if (props.disabled || props.readonly) return
  showPassword.value = !showPassword.value
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// 解析图标
const resolveIcon = (icon: string) => {
  return Icon
}

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select()
})
</script>

<style scoped>
.tw-input-wrapper {
  @apply tw-relative tw-inline-flex tw-items-center;
}

.tw-input-wrapper-block {
  @apply tw-w-full;
}

.tw-input {
  @apply tw-w-full tw-rounded-md tw-text-gray-700 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-transition-all tw-duration-200 tw-ease-in-out;
}

.tw-input:focus {
  @apply tw-outline-none tw-border-gray-400;
}

.tw-input-small {
  @apply tw-px-3 tw-py-1.5 tw-text-xs;
}

.tw-input-default {
  @apply tw-px-4 tw-py-2 tw-text-sm;
}

.tw-input-large {
  @apply tw-px-5 tw-py-2.5 tw-text-base;
}

.tw-input-with-prefix {
  @apply tw-pl-10;
}

.tw-input-with-suffix {
  @apply tw-pr-10;
}

.tw-input-prefix,
.tw-input-suffix {
  @apply tw-absolute tw-flex tw-items-center tw-justify-center tw-h-full tw-text-gray-400;
}

.tw-input-prefix {
  @apply tw-left-0 tw-pl-3;
}

.tw-input-suffix {
  @apply tw-right-0 tw-pr-3 tw-gap-2;
}

.tw-input-icon {
  @apply tw-w-5 tw-h-5 tw-text-gray-400 tw-transition-colors tw-duration-200;
}

.tw-input-password-toggle {
  @apply tw-flex tw-items-center tw-justify-center tw-p-1 tw-rounded-full;
  @apply hover:tw-bg-gray-100 tw-transition-colors tw-duration-200;
}

.tw-input-clear:hover .tw-input-icon,
.tw-input-password-toggle:hover .tw-input-icon {
  @apply tw-text-gray-600;
}

.tw-input-prefix .tw-input-icon,
.tw-input-suffix .tw-input-icon {
  @apply tw-flex tw-items-center tw-justify-center;
}

.tw-input-prefix {
  @apply tw-absolute tw-left-3 tw-flex tw-items-center tw-justify-center;
}

.tw-input-suffix {
  @apply tw-absolute  tw-flex tw-items-center tw-justify-center tw-gap-2;
}

.tw-input-word-count {
  @apply tw-absolute tw-right-0 tw-bottom-0 tw-transform tw-translate-y-full tw-text-xs tw-text-gray-500 tw-mt-1;
}

/* 状态样式 */
.tw-input-wrapper-disabled .tw-input {
  @apply tw-bg-gray-50 tw-text-gray-500 tw-cursor-not-allowed tw-opacity-60;
}

.tw-input-wrapper-readonly .tw-input {
  @apply tw-bg-gray-50 tw-cursor-default;
}

.tw-input-error {
  @apply tw-border-red-500 tw-bg-white;
}

.tw-input-error:focus {
  @apply tw-border-red-600;
}

.tw-input-success {
  @apply tw-border-green-500 tw-bg-white;
}

.tw-input-success:focus {
  @apply tw-border-green-600;
}

/* 悬停效果 */
.tw-input:not(:disabled):not(:read-only):hover {
  @apply tw-border-gray-400 tw-bg-gray-50;
}

/* 聚焦动画 */
.tw-input:focus {
  animation: none;
}

@keyframes focusPulse {
  0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
  70% { box-shadow: 0 0 0 4px rgba(59, 130, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
}
</style> 