<template>
  <div class="tw-p-6">
    <h1 class="tw-text-3xl tw-font-bold tw-mb-6">Checkbox 多选框</h1>
    
    <div class="tw-space-y-8">
      <!-- 基础用法 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">基础用法</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-items-center tw-gap-4">
            <tw-checkbox v-model="checked" value="1">选项1</tw-checkbox>
            <span class="tw-text-gray-600">选中状态：{{ checked }}</span>  
          </div>
        </div>
      </section>

      <!-- 禁用状态 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">禁用状态</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-items-center tw-gap-4">
            <tw-checkbox disabled value="1">禁用</tw-checkbox>
            <tw-checkbox disabled modelValue value="2">禁用且选中</tw-checkbox>
          </div>
        </div>
      </section>

      <!-- 多选框组 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">多选框组</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-items-center tw-gap-4"> 
            <tw-checkbox-group v-model="checkedList">
              <tw-checkbox label="选项1" value="1">选项1</tw-checkbox>
              <tw-checkbox label="选项2" value="2">选项2</tw-checkbox>
              <tw-checkbox label="选项3" value="3">选项3</tw-checkbox>
            </tw-checkbox-group>
            <span class="tw-text-gray-600">选中值：{{ checkedList }}</span>
          </div>
        </div>
      </section>

      <!-- 带边框 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">带边框</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-items-center tw-flex-wrap tw-gap-4">
            <tw-checkbox border value="1">默认边框</tw-checkbox>
            <tw-checkbox border size="small" value="2">小尺寸</tw-checkbox>
            <tw-checkbox border size="large" value="3">大尺寸</tw-checkbox>
            <tw-checkbox border disabled value="4">禁用边框</tw-checkbox>
          </div>
        </div>
      </section>

      <!-- 不同尺寸 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">不同尺寸</h2>   
        <div class="tw-space-y-4">
          <div class="tw-flex tw-items-center tw-flex-wrap tw-gap-4">   
            <tw-checkbox size="small" value="1">小尺寸</tw-checkbox>
            <tw-checkbox value="2">默认尺寸</tw-checkbox>
            <tw-checkbox size="large" value="3">大尺寸</tw-checkbox>
          </div>
        </div>
      </section>

      <!-- 中间状态 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">中间状态</h2>   
        <div class="tw-space-y-4">
          <div class="tw-flex tw-items-center tw-gap-4">
            <tw-checkbox v-model="indeterminate" indeterminate value="1">中间状态</tw-checkbox>
          </div>
        </div>
      </section>

      <!-- 限制数量 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">限制数量</h2>   
        <div class="tw-space-y-4">
          <div class="tw-flex tw-items-center tw-gap-4">
            <tw-checkbox-group v-model="limitedList" :min="1" :max="2">
              <tw-checkbox label="选项1" value="1">选项1</tw-checkbox>
              <tw-checkbox label="选项2" value="2">选项2</tw-checkbox>
              <tw-checkbox label="选项3" value="3">选项3</tw-checkbox>
              <tw-checkbox label="选项4" value="4">选项4</tw-checkbox>
            </tw-checkbox-group>
            <span class="tw-text-gray-600">选中值：{{ limitedList }}</span>
          </div>
        </div>
      </section>

      <!-- 按钮样式 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">按钮样式</h2>
        <div class="tw-space-y-4">
          <div>
            <h3 class="tw-text-lg tw-font-medium tw-mb-2">基础</h3>  
            <tw-checkbox-group v-model="buttonList" button>
              <tw-checkbox label="选项1" value="1">选项1</tw-checkbox>
              <tw-checkbox label="选项2" value="2">选项2</tw-checkbox>
              <tw-checkbox label="选项3" value="3">选项3</tw-checkbox>
            </tw-checkbox-group>
          </div>
          
          <div>
            <h3 class="tw-text-lg tw-font-medium tw-mb-2">尺寸</h3>
            <div class="tw-space-y-2">
              <div>
                <tw-checkbox-group v-model="buttonSizeList" button size="small">
                  <tw-checkbox label="小尺寸1" value="1">选项1</tw-checkbox>
                  <tw-checkbox label="小尺寸2" value="2">选项2</tw-checkbox>
                  <tw-checkbox label="小尺寸3" value="3">选项3</tw-checkbox>
                </tw-checkbox-group>
              </div>
              <div>
                <tw-checkbox-group v-model="buttonSizeList" button>
                  <tw-checkbox label="默认1" value="1">选项1</tw-checkbox>
                  <tw-checkbox label="默认2" value="2">选项2</tw-checkbox>
                  <tw-checkbox label="默认3" value="3">选项3</tw-checkbox>
                </tw-checkbox-group>
              </div>
              <div>
                <tw-checkbox-group v-model="buttonSizeList" button size="large">
                  <tw-checkbox label="大尺寸1" value="1">选项1</tw-checkbox>
                  <tw-checkbox label="大尺寸2" value="2">选项2</tw-checkbox>
                  <tw-checkbox label="大尺寸3" value="3">选项3</tw-checkbox>
                </tw-checkbox-group>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="tw-text-lg tw-font-medium tw-mb-2">禁用</h3>
            <tw-checkbox-group v-model="buttonDisabledList" button disabled>
              <tw-checkbox label="禁用1" value="1" >选项1</tw-checkbox>
              <tw-checkbox label="禁用2" value="2">选项2</tw-checkbox>
              <tw-checkbox label="禁用3" value="3">选项3</tw-checkbox>
            </tw-checkbox-group>
          </div>
        </div>
      </section>
    </div>

    <!-- API 文档 -->
    <section class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6 tw-mt-8">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-6">API</h2>
      
      <div class="space-y-6">
        <div>
          <h3 class="tw-text-lg tw-font-medium tw-mb-4">Checkbox 属性</h3>
          <tw-table
            :columns="propsColumns"
            :data="propsData"
          />
        </div>

        <div>
          <h3 class="tw-text-lg tw-font-medium tw-mb-4">Checkbox 事件</h3>
          <tw-table
            :columns="eventsColumns"
            :data="eventsData"
          />
        </div>

        <div>
          <h3 class="tw-text-lg tw-font-medium tw-mb-4">CheckboxGroup 属性</h3>
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
const buttonSizeList = ref<string[]>(['小尺寸1', '默认2'])
const buttonDisabledList = ref<string[]>(['禁用1'])

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