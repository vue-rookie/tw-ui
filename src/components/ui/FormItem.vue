<template>
  <div 
    class="tw-form-item" 
    :class="[
      `tw-form-item-${formContext?.layout || 'horizontal'}`,
      { 'tw-form-item-error': validateStatus === 'error' },
      { 'tw-form-item-success': validateStatus === 'success' },
      { 'tw-form-item-validating': validateStatus === 'validating' }
    ]"
  >
    <div 
      v-if="label || $slots.label" 
      class="tw-form-item-label"
      :style="formContext?.layout === 'horizontal' && formContext?.labelWidth ? { width: formContext.labelWidth } : {}"
    >
      <label :for="labelFor">
        <span v-if="isRequired" class="tw-form-item-required">*</span>
        <slot name="label">{{ label }}</slot>
      </label>
    </div>
    
    <div class="tw-form-item-content">
      <slot></slot>
      
      <div v-if="validateMessage && formContext?.showMessage" class="tw-form-item-error-message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import type { FormContext, FormItemRule, FormItemValidateStatus, FormItemValidateResult } from './Form.vue'

interface FormItemProps {
  prop?: string
  label?: string
  labelFor?: string
  rules?: FormItemRule | FormItemRule[]
  required?: boolean
}

const props = withDefaults(defineProps<FormItemProps>(), {
  prop: '',
  label: '',
  required: false
})

// 注入表单上下文
const formContext = inject<FormContext>('formContext')

// 验证状态
const validateStatus = ref<FormItemValidateStatus>('')
const validateMessage = ref('')

// 获取字段值
const fieldValue = computed(() => {
  if (!formContext || !props.prop) return undefined
  
  const model = formContext.model
  if (!model) return undefined
  
  // 支持嵌套属性，如 'user.name'
  const keys = props.prop.split('.')
  let value = model
  
  for (const key of keys) {
    if (value === undefined || value === null) return undefined
    value = value[key]
  }
  
  return value
})

// 获取验证规则
const getRules = () => {
  if (props.rules) {
    return Array.isArray(props.rules) ? props.rules : [props.rules]
  }
  
  if (formContext?.rules && props.prop) {
    const rules = formContext.rules[props.prop]
    if (rules) {
      return Array.isArray(rules) ? rules : [rules]
    }
  }
  
  return []
}

// 判断是否必填
const isRequired = computed(() => {
  if (props.required) return true
  
  const rules = getRules()
  return rules.some(rule => rule.required)
})

// 验证字段
const validate = async (): Promise<FormItemValidateResult> => {
  if (!formContext || !props.prop) {
    return { status: '', message: '' }
  }
  
  const rules = getRules()
  if (rules.length === 0) {
    return { status: 'success', message: '' }
  }
  
  const value = fieldValue.value
  
  // 设置验证中状态
  validateStatus.value = 'validating'
  
  try {
    for (const rule of rules) {
      // 必填验证
      if (rule.required && (value === undefined || value === null || value === '' as any)) {
        validateStatus.value = 'error'
        validateMessage.value = rule.message || `${props.label || props.prop}不能为空`
        return { status: 'error', message: validateMessage.value }
      }
      
      // 跳过空值的非必填验证
      if ((value === undefined || value === null || value === '' as any) && !rule.required) {
        continue
      }
      
      // 最小长度验证
      if (rule.min !== undefined && typeof value === 'string' && (value as string).length < rule.min) {
        validateStatus.value = 'error'
        validateMessage.value = rule.message || `${props.label || props.prop}长度不能小于${rule.min}`
        return { status: 'error', message: validateMessage.value }
      }
      
      // 最大长度验证
      if (rule.max !== undefined && typeof value === 'string' && (value as string).length > rule.max) {
        validateStatus.value = 'error'
        validateMessage.value = rule.message || `${props.label || props.prop}长度不能大于${rule.max}`
        return { status: 'error', message: validateMessage.value }
      }
      
      // 正则验证
      if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
        validateStatus.value = 'error'
        validateMessage.value = rule.message || `${props.label || props.prop}格式不正确`
        return { status: 'error', message: validateMessage.value }
      }
      
      // 自定义验证器
      if (rule.validator) {
        const result = await rule.validator(value, formContext.model)
        if (result !== true) {
          validateStatus.value = 'error'
          validateMessage.value = typeof result === 'string' ? result : (rule.message || `${props.label || props.prop}验证失败`)
          return { status: 'error', message: validateMessage.value }
        }
      }
    }
    
    // 验证通过
    validateStatus.value = 'success'
    validateMessage.value = ''
    return { status: 'success', message: '' }
  } catch (error) {
    validateStatus.value = 'error'
    validateMessage.value = String(error)
    return { status: 'error', message: validateMessage.value }
  }
}

// 重置字段
const resetField = () => {
  if (!formContext || !props.prop) return
  
  const model = formContext.model
  if (!model) return
  
  // 支持嵌套属性，如 'user.name'
  const keys = props.prop.split('.')
  const lastKey = keys.pop()
  
  if (!lastKey) return
  
  let parent = model
  for (const key of keys) {
    if (parent[key] === undefined) return
    parent = parent[key]
  }
  
  // 重置为初始值
  if (Array.isArray(parent[lastKey])) {
    parent[lastKey] = []
  } else if (typeof parent[lastKey] === 'object' && parent[lastKey] !== null) {
    parent[lastKey] = {}
  } else if (typeof parent[lastKey] === 'boolean') {
    parent[lastKey] = false
  } else if (typeof parent[lastKey] === 'number') {
    parent[lastKey] = 0
  } else {
    parent[lastKey] = ''
  }
  
  // 清除验证状态
  clearValidate()
}

// 清除验证
const clearValidate = () => {
  validateStatus.value = ''
  validateMessage.value = ''
}

// 监听值变化自动验证
watch(fieldValue, () => {
  if (validateStatus.value) {
    validate()
  }
})

// 注册和注销表单项
onMounted(() => {
  if (formContext && props.prop) {
    formContext.addField({
      prop: props.prop,
      label: props.label || '',
      validateStatus,
      validateMessage,
      validate,
      resetField,
      clearValidate
    })
  }
})

onBeforeUnmount(() => {
  if (formContext && props.prop) {
    formContext.removeField({
      prop: props.prop,
      label: props.label || '',
      validateStatus,
      validateMessage,
      validate,
      resetField,
      clearValidate
    })
  }
})

// 暴露方法
defineExpose({
  validate,
  resetField,
  clearValidate
})
</script>

<style scoped>
.tw-form-item {
  @apply tw-w-full;
}

.tw-form-item-horizontal {
  @apply tw-flex tw-items-start;
}

.tw-form-item-vertical .tw-form-item-label {
  @apply tw-mb-1.5;
}

.tw-form-item-inline {
  @apply tw-inline-flex tw-items-center;
}

.tw-form-item-label {
  @apply tw-font-medium tw-text-gray-700 tw-text-sm;
}

.tw-form-item-horizontal .tw-form-item-label {
  @apply tw-w-32 tw-flex-shrink-0 tw-text-right tw-pr-4 tw-pt-2;
}

.tw-form-item-content {
  @apply tw-flex-1 tw-min-w-0;
}

.tw-form-item-required {
  @apply tw-text-red-500 tw-mr-1;
}

.tw-form-item-error-message {
  @apply tw-text-red-500 tw-text-xs tw-mt-1.5 tw-transition-all tw-duration-200 tw-ease-in-out;
  animation: errorShake 0.5s ease-in-out;
}

@keyframes errorShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.tw-form-item-error :deep(input),
.tw-form-item-error :deep(select),
.tw-form-item-error :deep(textarea) {
  @apply tw-border-red-500 focus:tw-ring-red-500 focus:tw-border-red-500;
  box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.2);
}

.tw-form-item-success :deep(input),
.tw-form-item-success :deep(select),
.tw-form-item-success :deep(textarea) {
  @apply tw-border-green-500 focus:tw-ring-green-500 focus:tw-border-green-500;
  box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.2);
}

.tw-form-item-validating :deep(input),
.tw-form-item-validating :deep(select),
.tw-form-item-validating :deep(textarea) {
  @apply tw-border-blue-500 focus:tw-ring-blue-500 focus:tw-border-blue-500;
}

/* 添加输入框焦点效果 */
.tw-form-item :deep(input:focus),
.tw-form-item :deep(select:focus),
.tw-form-item :deep(textarea:focus) {
  @apply tw-ring-2 tw-ring-offset-2 tw-ring-blue-500 tw-border-blue-500;
  transition: all 0.2s ease-in-out;
}

/* 添加标签悬停效果 */
.tw-form-item-label label {
  @apply tw-transition-colors tw-duration-200;
}

.tw-form-item-label label:hover {
  @apply tw-text-gray-900;
}
</style> 