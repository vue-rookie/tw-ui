<template>
  <div class="tw-p-6">
    <h1 class="tw-text-3xl tw-font-bold tw-mb-6">Input 输入框</h1>
    
    <div class="tw-space-y-8">
      <!-- 基础用法 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">基础用法</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-items-center tw-gap-4">
            <tw-input v-model="inputValue" placeholder="请输入内容" />
            <span class="tw-text-gray-600">输入值：{{ inputValue }}</span>
          </div>
        </div>
      </section>

      <!-- 禁用状态 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">禁用状态</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-items-center tw-gap-4">
            <tw-input disabled placeholder="禁用状态" />
            <tw-input disabled value="禁用状态" />
          </div>
        </div>
      </section>

      <!-- 可清空 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">可清空</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-items-center tw-gap-4">
            <tw-input v-model="clearableValue" clearable placeholder="请输入内容" />
            <span class="tw-text-gray-600">输入值：{{ clearableValue }}</span>
          </div>
        </div>
      </section>

      <!-- 密码框 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">密码框</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-items-center tw-gap-4">
            <tw-input v-model="passwordValue" type="password" show-password placeholder="请输入密码" />
            <span class="tw-text-gray-600">密码值：{{ passwordValue }}</span>
          </div>
        </div>
      </section>

      <!-- 带图标的输入框 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">带图标的输入框</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-items-center tw-gap-4">
            <tw-input v-model="prefixValue" placeholder="请输入内容">
              <template #prefix>
                <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </template>
            </tw-input>
            <tw-input v-model="suffixValue" placeholder="请输入内容">
              <template #suffix>
                <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5 tw-text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                </svg>
              </template>
            </tw-input>
          </div>
        </div>
      </section>

      <!-- 不同尺寸 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">不同尺寸</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-items-center tw-gap-4">
            <tw-input size="large" placeholder="大型输入框" />
            <tw-input placeholder="默认输入框" />
            <tw-input size="small" placeholder="小型输入框" />
          </div>
        </div>
      </section>

      <!-- 字数统计 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">字数统计</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-items-center tw-gap-4">
            <tw-input v-model="countValue" show-word-limit maxlength="10" placeholder="请输入内容" />
            <span class="tw-text-gray-600">输入值：{{ countValue }}</span>
          </div>
        </div>
      </section>
    </div>

    <!-- API 文档 -->
    <section class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6 tw-mt-8">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-6">API</h2>
      
      <div class="tw-space-y-6">
        <div>
          <h3 class="tw-text-lg tw-font-medium tw-mb-4">属性</h3>
          <tw-table
            :columns="propsColumns"
            :data="propsData"
          />
        </div>

        <div>
          <h3 class="tw-text-lg tw-font-medium tw-mb-4">事件</h3>
          <tw-table
            :columns="eventsColumns"
            :data="eventsData"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
const clearableValue = ref('')
const passwordValue = ref('')
const prefixValue = ref('')
const suffixValue = ref('')
const countValue = ref('')

const propsColumns = [
  { key: 'name', title: '属性名' },
  { key: 'description', title: '说明' },
  { key: 'type', title: '类型', className: 'column-type' },
  { key: 'default', title: '默认值', className: 'column-default' }
]

const propsData = [
  {
    name: 'type',
    description: '输入框类型',
    type: "'text' | 'password' | 'number' | 'textarea'",
    default: "'text'"
  },
  {
    name: 'modelValue',
    description: '绑定值',
    type: 'string | number',
    default: '-'
  },
  {
    name: 'placeholder',
    description: '输入框占位文本',
    type: 'string',
    default: "'-'"
  },
  {
    name: 'disabled',
    description: '是否禁用',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'clearable',
    description: '是否可清空',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'showPassword',
    description: '是否显示切换密码图标',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'size',
    description: '输入框尺寸',
    type: "'large' | 'default' | 'small'",
    default: "'default'"
  },
  {
    name: 'prefixIcon',
    description: '输入框头部图标',
    type: 'string',
    default: '-'
  },
  {
    name: 'suffixIcon',
    description: '输入框尾部图标',
    type: 'string',
    default: '-'
  },
  {
    name: 'rows',
    description: '输入框行数，只对 type="textarea" 有效',
    type: 'number',
    default: '3'
  },
  {
    name: 'maxlength',
    description: '最大输入长度',
    type: 'number',
    default: '-'
  },
  {
    name: 'showWordLimit',
    description: '是否显示输入字数统计，只在 type="text" 或 type="textarea" 时有效',
    type: 'boolean',
    default: 'false'
  }
]

const eventsColumns = [
  { key: 'name', title: '事件名' },
  { key: 'description', title: '说明' },
  { key: 'parameters', title: '参数', className: 'column-type' }
]

const eventsData = [
  {
    name: 'update:modelValue',
    description: '在输入值改变时触发',
    parameters: 'value: string | number'
  },
  {
    name: 'input',
    description: '在 Input 值改变时触发',
    parameters: 'value: string | number'
  },
  {
    name: 'change',
    description: '仅在输入框失去焦点或用户按下回车时触发',
    parameters: 'value: string | number'
  },
  {
    name: 'focus',
    description: '在 Input 获得焦点时触发',
    parameters: 'event: FocusEvent'
  },
  {
    name: 'blur',
    description: '在 Input 失去焦点时触发',
    parameters: 'event: FocusEvent'
  },
  {
    name: 'clear',
    description: '在点击由 clearable 属性生成的清空按钮时触发',
    parameters: '-'
  }
]
</script>

<style>
/* 设置页面背景色 */
:root {
  --bg-color: #f5f7fa;
}

body {
  background-color: var(--bg-color);
}

/* 美化代码字体 */
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
</style> 