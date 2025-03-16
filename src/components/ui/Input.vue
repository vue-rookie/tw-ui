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
        <component v-if="prefixIcon" :is="resolveIcon(prefixIcon)" class="tw-input-icon" />
      </slot>
    </div>
    
    <!-- 输入框 -->
    <input
      ref="inputRef"
      :type="type"
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
      <button
        v-if="clearable && modelValue && !disabled && !readonly"
        type="button"
        class="tw-input-clear"
        @click="handleClear"
        tabindex="-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-4 tw-w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <!-- 密码切换按钮 -->
      <button
        v-if="showPasswordToggle"
        type="button"
        class="tw-input-password-toggle"
        @click="togglePasswordVisibility"
        tabindex="-1"
      >
        <svg v-if="passwordVisible" xmlns="http://www.w3.org/2000/svg" class="tw-h-4 tw-w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="tw-h-4 tw-w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      </button>
      
      <!-- 自定义后缀 -->
      <slot name="suffix">
        <component v-if="suffixIcon" :is="resolveIcon(suffixIcon)" class="tw-input-icon" />
      </slot>
    </div>
    
    <!-- 字数统计 -->
    <div v-if="showWordLimit && maxlength" class="tw-input-word-count">
      {{ modelValue ? modelValue.length : 0 }}/{{ maxlength }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface InputProps {
  modelValue: string
  type?: string
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
  size?: 'small' | 'default' | 'large'
  error?: boolean
  success?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  autocomplete: 'off',
  clearable: false,
  showPasswordToggle: false,
  showWordLimit: false,
  size: 'default',
  error: false,
  success: false,
  block: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'keyup', event: KeyboardEvent): void
  (e: 'keypress', event: KeyboardEvent): void
  (e: 'clear'): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const passwordVisible = ref(false)

// 是否显示密码切换按钮
const showPasswordToggle = computed(() => {
  return props.type === 'password' && props.showPasswordToggle
})

// 处理输入事件
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', target.value)
}

// 处理变更事件
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}

// 处理焦点事件
const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

// 处理失焦事件
const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// 处理键盘按下事件
const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

// 处理键盘释放事件
const handleKeyup = (event: KeyboardEvent) => {
  emit('keyup', event)
}

// 处理键盘按键事件
const handleKeypress = (event: KeyboardEvent) => {
  emit('keypress', event)
}

// 处理清除事件
const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  // 聚焦输入框
  inputRef.value?.focus()
}

// 切换密码可见性
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

// 解析图标组件
const resolveIcon = (icon: string) => {
  // 这里可以根据实际情况实现图标解析逻辑
  // 例如，可以返回一个SVG图标组件
  console.log('解析图标:', icon)
  return 'div'
}

// 监听类型变化，重置密码可见性
watch(() => props.type, (newType) => {
  if (newType !== 'password') {
    passwordVisible.value = false
  }
})

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
  @apply tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-text-gray-900 tw-bg-white tw-transition-all tw-duration-200 tw-ease-in-out;
}

.tw-input:focus {
  @apply tw-outline-none tw-ring-2 tw-ring-blue-500 tw-border-blue-500;
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
  @apply tw-w-4 tw-h-4;
}

.tw-input-clear,
.tw-input-password-toggle {
  @apply tw-p-0.5 tw-rounded-full tw-text-gray-400 tw-transition-colors tw-duration-200 tw-ease-in-out;
}

.tw-input-clear:hover,
.tw-input-password-toggle:hover {
  @apply tw-text-gray-500 tw-bg-gray-100;
}

.tw-input-clear:focus,
.tw-input-password-toggle:focus {
  @apply tw-outline-none;
}

.tw-input-word-count {
  @apply tw-absolute tw-right-0 tw-bottom-0 tw-transform tw-translate-y-full tw-text-xs tw-text-gray-500 tw-mt-1;
}

/* 状态样式 */
.tw-input-wrapper-disabled .tw-input {
  @apply tw-bg-gray-100 tw-text-gray-500 tw-cursor-not-allowed;
}

.tw-input-wrapper-readonly .tw-input {
  @apply tw-bg-gray-50 tw-cursor-default;
}

.tw-input-error {
  @apply tw-border-red-500;
}

.tw-input-error:focus {
  @apply tw-ring-red-500 tw-border-red-500;
}

.tw-input-success {
  @apply tw-border-green-500;
}

.tw-input-success:focus {
  @apply tw-ring-green-500 tw-border-green-500;
}

/* 悬停效果 */
.tw-input:not(:disabled):not(:read-only):hover {
  @apply tw-border-gray-400;
}

/* 聚焦动画 */
.tw-input:focus {
  animation: focusPulse 0.5s ease-out;
}

@keyframes focusPulse {
  0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
  70% { box-shadow: 0 0 0 4px rgba(59, 130, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
}
</style> 