<template>
  <form 
    class="tw-form" 
    :class="[
      `tw-form-${layout}`,
      { 'tw-form-disabled': disabled }
    ]"
    @submit.prevent="handleSubmit"
  >
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { provide, ref, reactive, computed, watch, onMounted } from 'vue'
import type { Ref } from 'vue'

export type FormItemRule = {
  required?: boolean
  message?: string
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (value: any, formData: Record<string, any>) => boolean | string | Promise<boolean | string>
}

export type FormRules = Record<string, FormItemRule | FormItemRule[]>

export type FormLayout = 'vertical' | 'horizontal' | 'inline'

export type FormItemValidateStatus = 'success' | 'error' | 'validating' | ''

export interface FormItemValidateResult {
  status: FormItemValidateStatus
  message: string
}

export interface FormItemContext {
  prop: string
  label: string
  validateStatus: Ref<FormItemValidateStatus>
  validateMessage: Ref<string>
  validate: () => Promise<FormItemValidateResult>
  resetField: () => void
  clearValidate: () => void
}

export interface FormContext {
  model: Record<string, any>
  rules?: FormRules
  layout: FormLayout
  labelWidth?: string
  disabled: boolean
  showMessage?: boolean
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
  validateField: (prop: string) => Promise<FormItemValidateResult>
}

interface FormProps {
  model: Record<string, any>
  rules?: FormRules
  layout?: FormLayout
  labelWidth?: string
  disabled?: boolean
  showMessage?: boolean
}

const props = withDefaults(defineProps<FormProps>(), {
  layout: 'horizontal',
  disabled: false,
  showMessage: true
})

const emit = defineEmits<{
  (e: 'submit', values: Record<string, any>): void
  (e: 'validate', prop: string, valid: boolean, message: string): void
  (e: 'reset'): void
}>()

// 表单项集合
const fields = reactive<FormItemContext[]>([])

// 添加表单项
const addField = (field: FormItemContext) => {
  if (field.prop) {
    fields.push(field)
  }
}

// 移除表单项
const removeField = (field: FormItemContext) => {
  if (field.prop) {
    const index = fields.findIndex(item => item.prop === field.prop)
    if (index !== -1) {
      fields.splice(index, 1)
    }
  }
}

// 验证单个字段
const validateField = async (prop: string): Promise<FormItemValidateResult> => {
  const field = fields.find(item => item.prop === prop)
  if (!field) {
    return { status: '', message: '' }
  }
  
  const result = await field.validate()
  emit('validate', prop, result.status === 'success', result.message)
  return result
}

// 验证整个表单
const validate = async (): Promise<boolean> => {
  if (fields.length === 0) return true
  
  const results = await Promise.all(fields.map(field => field.validate()))
  return results.every(result => result.status === 'success')
}

// 重置表单
const resetFields = () => {
  fields.forEach(field => field.resetField())
  emit('reset')
}

// 清除验证
const clearValidate = (props?: string | string[]) => {
  if (!props) {
    fields.forEach(field => field.clearValidate())
  } else {
    const propsArr = Array.isArray(props) ? props : [props]
    fields.forEach(field => {
      if (propsArr.includes(field.prop)) {
        field.clearValidate()
      }
    })
  }
}

// 提交表单
const handleSubmit = async () => {
  const valid = await validate()
  if (valid) {
    emit('submit', props.model)
  }
}

// 提供表单上下文
provide('formContext', {
  model: props.model,
  rules: props.rules,
  layout: props.layout,
  labelWidth: props.labelWidth,
  disabled: props.disabled,
  showMessage: props.showMessage,
  addField,
  removeField,
  validateField
})

// 暴露方法
defineExpose({
  validate,
  resetFields,
  clearValidate,
  validateField
})
</script>

<style scoped>
.tw-form {
  @apply tw-w-full;
}

.tw-form-horizontal {
  @apply tw-space-y-4;
}

.tw-form-vertical {
  @apply tw-space-y-4;
}

.tw-form-inline {
  @apply tw-flex tw-flex-wrap tw-gap-4;
}

.tw-form-disabled {
  @apply tw-opacity-60 tw-pointer-events-none;
}
</style> 