<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Radio 单选框</h1>
    
    <div class="space-y-8">
      <!-- 基础用法 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">基础用法</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-radio v-model="radioValue" label="1">选项1</tw-radio>
            <tw-radio v-model="radioValue" label="2">选项2</tw-radio>
            <tw-radio v-model="radioValue" label="3">选项3</tw-radio>
            <span class="text-gray-600">选中值：{{ radioValue }}</span>
          </div>
        </div>
      </section>

      <!-- 禁用状态 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">禁用状态</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-radio disabled>禁用</tw-radio>
            <tw-radio disabled checked>禁用且选中</tw-radio>
          </div>
        </div>
      </section>

      <!-- 单选框组 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">单选框组</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-radio-group v-model="groupValue">
              <tw-radio label="1">选项1</tw-radio>
              <tw-radio label="2">选项2</tw-radio>
              <tw-radio label="3">选项3</tw-radio>
            </tw-radio-group>
            <span class="text-gray-600">选中值：{{ groupValue }}</span>
          </div>
        </div>
      </section>

      <!-- 按钮样式 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">按钮样式</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-radio-group v-model="buttonValue" button>
              <tw-radio label="1">选项1</tw-radio>
              <tw-radio label="2">选项2</tw-radio>
              <tw-radio label="3">选项3</tw-radio>
            </tw-radio-group>
            <span class="text-gray-600">选中值：{{ buttonValue }}</span>
          </div>
        </div>
      </section>

      <!-- 边框样式 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">边框样式</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-radio-group v-model="borderValue" border>
              <tw-radio label="1">选项1</tw-radio>
              <tw-radio label="2">选项2</tw-radio>
              <tw-radio label="3">选项3</tw-radio>
            </tw-radio-group>
            <span class="text-gray-600">选中值：{{ borderValue }}</span>
          </div>
        </div>
      </section>
    </div>

    <!-- API 文档 -->
    <section class="bg-white rounded-lg shadow-sm p-6 mt-8">
      <h2 class="text-2xl font-semibold mb-6">API</h2>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-medium mb-4">Radio 属性</h3>
          <tw-table
            :columns="propsColumns"
            :data="propsData"
          />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">Radio 事件</h3>
          <tw-table
            :columns="eventsColumns"
            :data="eventsData"
          />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">RadioGroup 属性</h3>
          <tw-table
            :columns="groupPropsColumns"
            :data="groupPropsData"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radioValue = ref('1')
const groupValue = ref('1')
const buttonValue = ref('1')
const borderValue = ref('1')

const propsColumns = [
  { key: 'name', title: '属性名' },
  { key: 'description', title: '说明' },
  { key: 'type', title: '类型', className: 'column-type' },
  { key: 'default', title: '默认值', className: 'column-default' }
]

const propsData = [
  {
    name: 'modelValue',
    description: '绑定值',
    type: 'string | number | boolean',
    default: '-'
  },
  {
    name: 'label',
    description: '单选框的值',
    type: 'string | number | boolean',
    default: '-'
  },
  {
    name: 'disabled',
    description: '是否禁用',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'name',
    description: '原生 name 属性',
    type: 'string',
    default: '-'
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
    description: '当绑定值变化时触发的事件',
    parameters: 'value: string | number | boolean'
  },
  {
    name: 'change',
    description: '当绑定值变化时触发的事件',
    parameters: 'value: string | number | boolean'
  }
]

const groupPropsColumns = [
  { key: 'name', title: '属性名' },
  { key: 'description', title: '说明' },
  { key: 'type', title: '类型', className: 'column-type' },
  { key: 'default', title: '默认值', className: 'column-default' }
]

const groupPropsData = [
  {
    name: 'modelValue',
    description: '绑定值',
    type: 'string | number | boolean',
    default: '-'
  },
  {
    name: 'disabled',
    description: '是否禁用',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'name',
    description: '原生 name 属性',
    type: 'string',
    default: '-'
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