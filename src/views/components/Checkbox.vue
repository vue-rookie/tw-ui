<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Checkbox 多选框</h1>
    
    <div class="space-y-8">
      <!-- 基础用法 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">基础用法</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-checkbox v-model="checked">选项1</tw-checkbox>
            <span class="text-gray-600">选中状态：{{ checked }}</span>
          </div>
        </div>
      </section>

      <!-- 禁用状态 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">禁用状态</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-checkbox disabled>禁用</tw-checkbox>
            <tw-checkbox disabled checked>禁用且选中</tw-checkbox>
          </div>
        </div>
      </section>

      <!-- 多选框组 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">多选框组</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-checkbox-group v-model="checkedList">
              <tw-checkbox label="选项1">选项1</tw-checkbox>
              <tw-checkbox label="选项2">选项2</tw-checkbox>
              <tw-checkbox label="选项3">选项3</tw-checkbox>
            </tw-checkbox-group>
            <span class="text-gray-600">选中值：{{ checkedList }}</span>
          </div>
        </div>
      </section>

      <!-- 中间状态 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">中间状态</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-checkbox v-model="indeterminate" :indeterminate="true">中间状态</tw-checkbox>
            <span class="text-gray-600">选中状态：{{ indeterminate }}</span>
          </div>
        </div>
      </section>

      <!-- 限制数量 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">限制数量</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-checkbox-group v-model="limitedList" :min="1" :max="2">
              <tw-checkbox label="选项1">选项1</tw-checkbox>
              <tw-checkbox label="选项2">选项2</tw-checkbox>
              <tw-checkbox label="选项3">选项3</tw-checkbox>
              <tw-checkbox label="选项4">选项4</tw-checkbox>
            </tw-checkbox-group>
            <span class="text-gray-600">选中值：{{ limitedList }}</span>
          </div>
        </div>
      </section>

      <!-- 按钮样式 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">按钮样式</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-checkbox-group v-model="buttonList" button>
              <tw-checkbox label="选项1">选项1</tw-checkbox>
              <tw-checkbox label="选项2">选项2</tw-checkbox>
              <tw-checkbox label="选项3">选项3</tw-checkbox>
            </tw-checkbox-group>
            <span class="text-gray-600">选中值：{{ buttonList }}</span>
          </div>
        </div>
      </section>
    </div>

    <!-- API 文档 -->
    <section class="bg-white rounded-lg shadow-sm p-6 mt-8">
      <h2 class="text-2xl font-semibold mb-6">API</h2>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-medium mb-4">Checkbox 属性</h3>
          <tw-table
            :columns="propsColumns"
            :data="propsData"
          />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">Checkbox 事件</h3>
          <tw-table
            :columns="eventsColumns"
            :data="eventsData"
          />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">CheckboxGroup 属性</h3>
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

const checked = ref(false)
const checkedList = ref<string[]>([])
const indeterminate = ref(false)
const limitedList = ref<string[]>([])
const buttonList = ref<string[]>([])

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
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'label',
    description: '选中状态的值',
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
  },
  {
    name: 'indeterminate',
    description: '设置 indeterminate 状态，只负责样式控制',
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
    description: '当绑定值变化时触发的事件',
    parameters: 'value: boolean'
  },
  {
    name: 'change',
    description: '当绑定值变化时触发的事件',
    parameters: 'value: boolean'
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
    type: 'string[] | number[]',
    default: '[]'
  },
  {
    name: 'disabled',
    description: '是否禁用',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'min',
    description: '可被勾选的 checkbox 的最小数量',
    type: 'number',
    default: '-'
  },
  {
    name: 'max',
    description: '可被勾选的 checkbox 的最大数量',
    type: 'number',
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