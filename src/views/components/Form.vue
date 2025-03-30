<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Form 表单</h1>
    
    <div class="space-y-8">
      <!-- 基础用法 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">基础用法</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-form ref="basicFormRef" :model="basicForm" :rules="basicRules">
              <tw-form-item label="用户名" prop="username">
                <tw-input v-model="basicForm.username" />
              </tw-form-item>
              <tw-form-item label="密码" prop="password">
                <tw-input v-model="basicForm.password" type="password" />
              </tw-form-item>
              <tw-form-item>
                <tw-button type="primary" @click="handleBasicSubmit">提交</tw-button>
                <tw-button @click="handleBasicReset">重置</tw-button>
              </tw-form-item>
            </tw-form>
          </div>
        </div>
      </section>

      <!-- 行内表单 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">行内表单</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-form ref="inlineFormRef" :model="inlineForm" :rules="inlineRules" inline>
              <tw-form-item label="用户名" prop="username">
                <tw-input v-model="inlineForm.username" />
              </tw-form-item>
              <tw-form-item label="密码" prop="password">
                <tw-input v-model="inlineForm.password" type="password" />
              </tw-form-item>
              <tw-form-item>
                <tw-button type="primary" @click="handleInlineSubmit">提交</tw-button>
                <tw-button @click="handleInlineReset">重置</tw-button>
              </tw-form-item>
            </tw-form>
          </div>
        </div>
      </section>

      <!-- 对齐方式 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">对齐方式</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-form ref="alignFormRef" :model="alignForm" :rules="alignRules" label-position="top">
              <tw-form-item label="用户名" prop="username">
                <tw-input v-model="alignForm.username" />
              </tw-form-item>
              <tw-form-item label="密码" prop="password">
                <tw-input v-model="alignForm.password" type="password" />
              </tw-form-item>
              <tw-form-item>
                <tw-button type="primary" @click="handleAlignSubmit">提交</tw-button>
                <tw-button @click="handleAlignReset">重置</tw-button>
              </tw-form-item>
            </tw-form>
          </div>
        </div>
      </section>

      <!-- 表单验证 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">表单验证</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-form ref="validateFormRef" :model="validateForm" :rules="validateRules">
              <tw-form-item label="用户名" prop="username">
                <tw-input v-model="validateForm.username" />
              </tw-form-item>
              <tw-form-item label="邮箱" prop="email">
                <tw-input v-model="validateForm.email" />
              </tw-form-item>
              <tw-form-item label="年龄" prop="age">
                <tw-input v-model="validateForm.age" type="number" />
              </tw-form-item>
              <tw-form-item>
                <tw-button type="primary" @click="handleValidateSubmit">提交</tw-button>
                <tw-button @click="handleValidateReset">重置</tw-button>
              </tw-form-item>
            </tw-form>
          </div>
        </div>
      </section>

      <!-- 自定义校验规则 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">自定义校验规则</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-form ref="customFormRef" :model="customForm" :rules="customRules">
              <tw-form-item label="密码" prop="password">
                <tw-input v-model="customForm.password" type="password" />
              </tw-form-item>
              <tw-form-item label="确认密码" prop="confirmPassword">
                <tw-input v-model="customForm.confirmPassword" type="password" />
              </tw-form-item>
              <tw-form-item>
                <tw-button type="primary" @click="handleCustomSubmit">提交</tw-button>
                <tw-button @click="handleCustomReset">重置</tw-button>
              </tw-form-item>
            </tw-form>
          </div>
        </div>
      </section>
    </div>

    <!-- API 文档 -->
    <div class="mt-12">
      <h2 class="text-2xl font-semibold mb-4">API</h2>
      <div class="bg-gray-50 rounded-lg p-6">
        <h3 class="text-xl font-medium mb-4">Form Props</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">参数</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">默认值</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">model</td>
                <td class="px-6 py-4 text-sm text-gray-500">表单数据对象</td>
                <td class="px-6 py-4 text-sm text-gray-500">object</td>
                <td class="px-6 py-4 text-sm text-gray-500">-</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">rules</td>
                <td class="px-6 py-4 text-sm text-gray-500">表单验证规则</td>
                <td class="px-6 py-4 text-sm text-gray-500">object</td>
                <td class="px-6 py-4 text-sm text-gray-500">-</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">label-position</td>
                <td class="px-6 py-4 text-sm text-gray-500">标签的位置</td>
                <td class="px-6 py-4 text-sm text-gray-500">'left' | 'right' | 'top'</td>
                <td class="px-6 py-4 text-sm text-gray-500">'right'</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">label-width</td>
                <td class="px-6 py-4 text-sm text-gray-500">标签的宽度</td>
                <td class="px-6 py-4 text-sm text-gray-500">string | number</td>
                <td class="px-6 py-4 text-sm text-gray-500">'100px'</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">inline</td>
                <td class="px-6 py-4 text-sm text-gray-500">是否行内表单</td>
                <td class="px-6 py-4 text-sm text-gray-500">boolean</td>
                <td class="px-6 py-4 text-sm text-gray-500">false</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-xl font-medium mt-8 mb-4">FormItem Props</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">参数</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">默认值</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">label</td>
                <td class="px-6 py-4 text-sm text-gray-500">标签文本</td>
                <td class="px-6 py-4 text-sm text-gray-500">string</td>
                <td class="px-6 py-4 text-sm text-gray-500">-</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">prop</td>
                <td class="px-6 py-4 text-sm text-gray-500">表单域 model 字段</td>
                <td class="px-6 py-4 text-sm text-gray-500">string</td>
                <td class="px-6 py-4 text-sm text-gray-500">-</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">rules</td>
                <td class="px-6 py-4 text-sm text-gray-500">表单验证规则</td>
                <td class="px-6 py-4 text-sm text-gray-500">object | array</td>
                <td class="px-6 py-4 text-sm text-gray-500">-</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">required</td>
                <td class="px-6 py-4 text-sm text-gray-500">是否必填</td>
                <td class="px-6 py-4 text-sm text-gray-500">boolean</td>
                <td class="px-6 py-4 text-sm text-gray-500">false</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-xl font-medium mt-8 mb-4">Methods</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">方法名</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">参数</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">validate</td>
                <td class="px-6 py-4 text-sm text-gray-500">对整个表单进行验证</td>
                <td class="px-6 py-4 text-sm text-gray-500">callback?: (valid: boolean) => void</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">validateField</td>
                <td class="px-6 py-4 text-sm text-gray-500">对指定字段进行验证</td>
                <td class="px-6 py-4 text-sm text-gray-500">props: string | string[]</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">resetFields</td>
                <td class="px-6 py-4 text-sm text-gray-500">重置表单</td>
                <td class="px-6 py-4 text-sm text-gray-500">-</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">clearValidate</td>
                <td class="px-6 py-4 text-sm text-gray-500">清除验证信息</td>
                <td class="px-6 py-4 text-sm text-gray-500">props?: string | string[]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from '@/types/form'

// 基础表单
const basicFormRef = ref<FormInstance>()
const basicForm = reactive({
  username: '',
  password: ''
})
const basicRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

// 行内表单
const inlineFormRef = ref<FormInstance>()
const inlineForm = reactive({
  username: '',
  password: ''
})
const inlineRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

// 对齐方式
const alignFormRef = ref<FormInstance>()
const alignForm = reactive({
  username: '',
  password: ''
})
const alignRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

// 表单验证
const validateFormRef = ref<FormInstance>()
const validateForm = reactive({
  username: '',
  email: '',
  age: ''
})
const validateRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', message: '年龄必须为数字', trigger: 'blur' },
    { min: 0, max: 150, message: '年龄必须在 0 到 150 之间', trigger: 'blur' }
  ]
}

// 自定义校验规则
const customFormRef = ref<FormInstance>()
const customForm = reactive({
  password: '',
  confirmPassword: ''
})
const validatePass = (rule: any, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (customForm.confirmPassword !== '') {
      customFormRef.value?.validateField('confirmPassword')
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== customForm.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
const customRules = {
  password: [
    { validator: validatePass, trigger: 'blur' }
  ],
  confirmPassword: [
    { validator: validatePass2, trigger: 'blur' }
  ]
}

// 提交方法
const handleBasicSubmit = async () => {
  if (!basicFormRef.value) return
  await basicFormRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('提交成功', basicForm)
    }
  })
}

const handleInlineSubmit = async () => {
  if (!inlineFormRef.value) return
  await inlineFormRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('提交成功', inlineForm)
    }
  })
}

const handleAlignSubmit = async () => {
  if (!alignFormRef.value) return
  await alignFormRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('提交成功', alignForm)
    }
  })
}

const handleValidateSubmit = async () => {
  if (!validateFormRef.value) return
  await validateFormRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('提交成功', validateForm)
    }
  })
}

const handleCustomSubmit = async () => {
  if (!customFormRef.value) return
  await customFormRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('提交成功', customForm)
    }
  })
}

// 重置方法
const handleBasicReset = () => {
  basicFormRef.value?.resetFields()
}

const handleInlineReset = () => {
  inlineFormRef.value?.resetFields()
}

const handleAlignReset = () => {
  alignFormRef.value?.resetFields()
}

const handleValidateReset = () => {
  validateFormRef.value?.resetFields()
}

const handleCustomReset = () => {
  customFormRef.value?.resetFields()
}
</script> 