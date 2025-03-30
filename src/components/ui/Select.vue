<template>
  <div 
    class="tw-select-wrapper"
    :class="[
      { 'tw-select-wrapper-disabled': disabled },
      { 'tw-select-wrapper-error': error },
      { 'tw-select-wrapper-success': success },
      { 'tw-select-wrapper-block': block }
    ]"
  >
    <div
      ref="selectRef"
      class="tw-select"
      :class="[
        `tw-select-${size}`,
        { 'tw-select-open': isOpen },
        { 'tw-select-disabled': disabled },
        { 'tw-select-error': error },
        { 'tw-select-success': success }
      ]"
      tabindex="0"
      @click="toggleDropdown"
      @blur="handleBlur"
      @keydown="handleKeydown"
    >
      <!-- 选择框内容 -->
      <div class="tw-select-value">
        <template v-if="multiple">
          <div v-if="selectedOptions?.length" class="tw-select-tags">
            <div 
              v-for="option in selectedOptions" 
              :key="option.value" 
              class="tw-select-tag"
            >
              <span class="tw-select-tag-text">{{ option.label }}</span>
              <button 
                type="button"
                class="tw-select-tag-remove"
                @click.stop="removeOption(option.value)"
              >
                <Icon icon="mdi:close" class="tw-h-4 tw-w-4" />
              </button>
            </div>
          </div>
          <div v-else class="tw-select-placeholder">{{ placeholder }}</div>
        </template>
        <template v-else>
          <div v-if="selectedOption" class="tw-select-single-value">
            {{ selectedOption.label }}
          </div>
          <div v-else class="tw-select-placeholder">{{ placeholder }}</div>
        </template>
      </div>
      
      <!-- 下拉箭头 -->
      <div class="tw-select-arrow">
        <Icon 
          icon="mdi:chevron-down" 
          class="tw-h-4 tw-w-4" 
          :class="{ 'tw-rotate-180': isOpen }"
        />
      </div>
      
      <!-- 清除按钮 -->
      <button
        v-if="clearable && (multiple ? selectedOptions?.length > 0 : selectedOption) && !disabled"
        type="button"
        class="tw-select-clear"
        @click.stop="clearSelection"
      >
        <Icon icon="mdi:close" class="tw-h-4 tw-w-4" />
      </button>
    </div>
    
    <!-- 下拉菜单 -->
    <div 
      v-show="isOpen" 
      class="tw-select-dropdown"
      :class="[`tw-select-dropdown-${size}`]"
    >
      <!-- 搜索框 -->
      <div v-if="filterable" class="tw-select-search">
        <input
          ref="searchInputRef"
          v-model="searchQuery"
          type="text"
          class="tw-select-search-input"
          :placeholder="searchPlaceholder"
          @click.stop
          @input="handleSearch"
        />
      </div>
      
      <!-- 选项列表 -->
      <div class="tw-select-options">
        <div 
          v-if="filteredOptions?.length === 0" 
          class="tw-select-empty"
        >
          {{ emptyText }}
        </div>
        <div
          v-for="(option, index) in filteredOptions"
          :key="option.value"
          class="tw-select-option"
          :class="[
            { 'tw-select-option-selected': isOptionSelected(option.value) },
            { 'tw-select-option-focused': focusedIndex === index }
          ]"
          @click.stop="selectOption(option)"
          @mouseenter="focusedIndex = index"
        >
          <!-- 多选复选框 -->
          <div v-if="multiple" class="tw-select-checkbox">
            <div 
              class="tw-select-checkbox-inner"
              :class="{ 'tw-select-checkbox-checked': isOptionSelected(option.value) }"
            >
              <Icon 
                v-if="isOptionSelected(option.value)"
                icon="mdi:check" 
                class="tw-h-3 tw-w-3 tw-text-white" 
              />
            </div>
          </div>
          
          <!-- 选项内容 -->
          <div class="tw-select-option-content">
            {{ option.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'

interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

interface SelectProps {
  modelValue: string | number | (string | number)[]
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  multiple?: boolean
  clearable?: boolean
  filterable?: boolean
  searchPlaceholder?: string
  emptyText?: string
  size?: 'small' | 'default' | 'large'
  error?: boolean
  success?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: '请选择',
  disabled: false,
  multiple: false,
  clearable: false,
  filterable: false,
  searchPlaceholder: '搜索',
  emptyText: '无数据',
  size: 'default',
  error: false,
  success: false,
  block: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | (string | number)[]): void
  (e: 'change', value: string | number | (string | number)[]): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'clear'): void
  (e: 'visible-change', visible: boolean): void
}>()

const selectRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)
const isOpen = ref(false)
const searchQuery = ref('')
const focusedIndex = ref(0)

// 计算选中的选项
const selectedOptions = computed(() => {
  if (props.multiple) {
    const values = props.modelValue as (string | number)[]
    return props.options?.filter(option => values.includes(option.value))
  }
  return []
})

// 计算单选选中的选项
const selectedOption = computed(() => {
  if (!props.multiple) {
    return props.options?.find(option => option.value === props.modelValue)
  }
  return null
})

// 过滤后的选项
const filteredOptions = computed(() => {
  if (!props.options) return []
  if (props.filterable && searchQuery.value) {
    return props.options?.filter(option => 
      option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  return props.options
})

// 判断选项是否被选中
const isOptionSelected = (value: string | number) => {
  if (props.multiple) {
    return (props.modelValue as (string | number)[]).includes(value)
  }
  return props.modelValue === value
}

// 切换下拉菜单
const toggleDropdown = () => {
  if (props.disabled) return
  
  isOpen.value = !isOpen.value
  
  if (isOpen.value) {
    emit('focus')
    emit('visible-change', true)
    nextTick(() => {
      if (props.filterable) {
        searchInputRef.value?.focus()
      }
      
      // 设置焦点索引为第一个选项
      focusedIndex.value = 0
    })
  } else {
    emit('visible-change', false)
  }
}

// 处理失焦事件
const handleBlur = (event: FocusEvent) => {
  // 检查点击是否在下拉菜单内
  const target = event.relatedTarget as Node
  if (selectRef.value?.contains(target)) {
    return
  }
  
  isOpen.value = false
  emit('blur')
  emit('visible-change', false)
}

// 处理键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault()
      isOpen.value = true
      emit('focus')
      emit('visible-change', true)
      return
    }
  }
  
  if (isOpen.value) {
    switch (event.key) {
      case 'Escape':
        event.preventDefault()
        isOpen.value = false
        emit('visible-change', false)
        break
      case 'ArrowDown':
        event.preventDefault()
        focusedIndex.value = (focusedIndex.value + 1) % filteredOptions.value?.length
        break
      case 'ArrowUp':
        event.preventDefault()
        focusedIndex.value = (focusedIndex.value - 1 + filteredOptions.value?.length) % filteredOptions.value?.length
        break
      case 'Enter':
        event.preventDefault()
        if (filteredOptions?.value?.length > 0 && focusedIndex.value >= 0) {
          selectOption(filteredOptions.value[focusedIndex.value])
        }
        break
    }
  }
}

// 处理搜索
const handleSearch = () => {
  focusedIndex.value = 0
}

// 选择选项
const selectOption = (option: SelectOption) => {
  if (option.disabled) return
  
  if (props.multiple) {
    const values = [...(props.modelValue as (string | number)[])]
    const index = values.indexOf(option.value)
    
    if (index === -1) {
      values.push(option.value)
    } else {
      values.splice(index, 1)
    }
    
    emit('update:modelValue', values)
    emit('change', values)
  } else {
    emit('update:modelValue', option.value)
    emit('change', option.value)
    isOpen.value = false
    emit('visible-change', false)
  }
  
  if (props.filterable) {
    searchQuery.value = ''
  }
}

// 移除选项
const removeOption = (value: string | number) => {
  if (props.multiple) {
    const values = [...(props.modelValue as (string | number)[])]
    const index = values.indexOf(value)
    
    if (index !== -1) {
      values.splice(index, 1)
      emit('update:modelValue', values)
      emit('change', values)
    }
  }
}

// 清除选择
const clearSelection = () => {
  if (props.multiple) {
    emit('update:modelValue', [])
  } else {
    emit('update:modelValue', '')
  }
  
  emit('clear')
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
    emit('visible-change', false)
  }
}

// 监听点击事件
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 暴露方法
defineExpose({
  focus: () => selectRef.value?.focus(),
  blur: () => {
    selectRef.value?.blur()
    isOpen.value = false
  }
})
</script>

<style scoped>
.tw-select-wrapper {
  @apply tw-relative tw-inline-block;
}

.tw-select-wrapper-block {
  @apply tw-w-full;
}

.tw-select {
  @apply tw-flex tw-items-center tw-justify-between tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-bg-white tw-cursor-pointer;
  @apply tw-transition-all tw-duration-200 tw-ease-in-out;
  @apply focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500;
}

.tw-select-small {
  @apply tw-px-3 tw-py-1.5 tw-text-xs;
}

.tw-select-default {
  @apply tw-px-4 tw-py-2 tw-text-sm;
}

.tw-select-large {
  @apply tw-px-5 tw-py-2.5 tw-text-base;
}

.tw-select-value {
  @apply tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap;
}

.tw-select-placeholder {
  @apply tw-text-gray-400;
}

.tw-select-single-value {
  @apply tw-text-gray-900;
}

.tw-select-tags {
  @apply tw-flex tw-flex-wrap tw-gap-1;
}

.tw-select-tag {
  @apply tw-flex tw-items-center tw-bg-blue-100 tw-text-blue-800 tw-rounded tw-px-2 tw-py-0.5 tw-text-xs;
  @apply tw-max-w-full tw-break-all;
}

.tw-select-tag-text {
  @apply tw-mr-1 tw-truncate;
}

.tw-select-tag-remove {
  @apply tw-flex tw-items-center tw-justify-center tw-rounded-full tw-p-0.5;
  @apply hover:tw-bg-blue-200 tw-transition-colors tw-duration-200;
}

.tw-select-arrow {
  @apply tw-flex tw-items-center tw-justify-center tw-text-gray-400 tw-ml-2;
  @apply tw-transition-transform tw-duration-200 tw-ease-in-out;
}

.tw-select-clear {
  @apply tw-flex tw-items-center tw-justify-center tw-ml-2 tw-text-gray-400;
  @apply hover:tw-text-gray-500 tw-transition-colors tw-duration-200;
}

.tw-select-dropdown {
  @apply tw-absolute tw-z-50 tw-mt-1 tw-w-full tw-bg-white tw-rounded-md tw-shadow-lg tw-border tw-border-gray-200;
  @apply tw-max-h-60 tw-overflow-auto;
  @apply tw-animate-slideDownIn;
}

.tw-select-dropdown-small {
  @apply tw-text-xs;
}

.tw-select-dropdown-default {
  @apply tw-text-sm;
}

.tw-select-dropdown-large {
  @apply tw-text-base;
}

.tw-select-search {
  @apply tw-p-2 tw-sticky tw-top-0 tw-bg-white tw-border-b tw-border-gray-100;
}

.tw-select-search-input {
  @apply tw-w-full tw-px-3 tw-py-1.5 tw-border tw-border-gray-300 tw-rounded;
  @apply focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-blue-500 focus:tw-border-blue-500;
}

.tw-select-options {
  @apply tw-py-1;
}

.tw-select-option {
  @apply tw-flex tw-items-center tw-px-3 tw-py-2 tw-cursor-pointer;
  @apply hover:tw-bg-gray-100 tw-transition-colors tw-duration-150;
}

.tw-select-option-selected {
  @apply tw-bg-blue-50 tw-text-blue-700 tw-font-medium;
}

.tw-select-option-focused {
  @apply tw-bg-gray-100;
}

.tw-select-checkbox {
  @apply tw-mr-2 tw-flex tw-items-center tw-justify-center;
}

.tw-select-checkbox-inner {
  @apply tw-w-4 tw-h-4 tw-border tw-border-gray-300 tw-rounded tw-bg-white;
  @apply tw-flex tw-items-center tw-justify-center tw-transition-colors tw-duration-200;
}

.tw-select-checkbox-checked {
  @apply tw-bg-blue-500 tw-border-blue-500;
}

.tw-select-checkbox-checked::after {
  display: none;
}

.tw-select-option-content {
  @apply tw-flex-1 tw-truncate;
}

.tw-select-empty {
  @apply tw-py-4 tw-px-3 tw-text-center tw-text-gray-500;
}

/* 状态样式 */
.tw-select-disabled {
  @apply tw-bg-gray-100 tw-cursor-not-allowed tw-opacity-70;
}

.tw-select-error {
  @apply tw-border-red-500 focus:tw-ring-red-500 focus:tw-border-red-500;
}

.tw-select-success {
  @apply tw-border-green-500 focus:tw-ring-green-500 focus:tw-border-green-500;
}

.tw-select-open {
  @apply tw-border-blue-500 tw-ring-2 tw-ring-blue-500;
}

/* 悬停效果 */
.tw-select:not(.tw-select-disabled):hover {
  @apply tw-border-gray-400;
}

/* 动画 */
@keyframes slideDownIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tw-animate-slideDownIn {
  animation: slideDownIn 0.2s ease-out;
}
</style> 