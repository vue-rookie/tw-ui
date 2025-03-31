<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Radio 单选框</h1>
    
    <div class="space-y-8">
      <!-- 基础用法 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">基础用法</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-radio v-model="radio" value="1">选项1</tw-radio>
            <tw-radio v-model="radio" value="2">选项2</tw-radio>
            <span class="text-gray-600">选中值：{{ radio }}</span>
          </div>
        </div>
      </section>

      <!-- 禁用状态 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">禁用状态</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-radio v-model="radio" value="1" disabled>禁用</tw-radio>
            <tw-radio v-model="radio" value="2" disabled>禁用且选中</tw-radio>
          </div>
        </div>
      </section>

      <!-- 单选框组 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">单选框组</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-radio-group v-model="radioGroup">
              <tw-radio value="1">选项1</tw-radio>
              <tw-radio value="2">选项2</tw-radio>
              <tw-radio value="3">选项3</tw-radio>
            </tw-radio-group>
            <span class="text-gray-600">选中值：{{ radioGroup }}</span>
          </div>
        </div>
      </section>


      <!-- 不同尺寸 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">不同尺寸</h2>
        <div class="space-y-4">
          <div class="flex items-center flex-wrap gap-4">
            <tw-radio v-model="radioSize" value="1" size="small">小尺寸</tw-radio>
            <tw-radio v-model="radioSize" value="2">默认尺寸</tw-radio>
            <tw-radio v-model="radioSize" value="3" size="large">大尺寸</tw-radio>
          </div>
        </div>
      </section>

      <!-- 按钮样式 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">按钮样式</h2>
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-medium mb-2">基础按钮样式</h3>
            <tw-radio-group v-model="radioButton" button>
              <tw-radio value="1">选项1</tw-radio>
              <tw-radio value="2">选项2</tw-radio>
              <tw-radio value="3">选项3</tw-radio>
            </tw-radio-group>
          </div>
          
          <div>
            <h3 class="text-lg font-medium mb-2">尺寸</h3>
            <div class="space-y-2">
              <div>
                <tw-radio-group v-model="radioButtonSize" button size="small">
                  <tw-radio value="small1">小尺寸1</tw-radio>
                  <tw-radio value="small2">小尺寸2</tw-radio>
                  <tw-radio value="small3">小尺寸3</tw-radio>
                </tw-radio-group>
              </div>
              <div>
                <tw-radio-group v-model="radioButtonSize" button>
                  <tw-radio value="default1">默认1</tw-radio>
                  <tw-radio value="default2">默认2</tw-radio>
                  <tw-radio value="default3">默认3</tw-radio>
                </tw-radio-group>
              </div>
              <div>
                <tw-radio-group v-model="radioButtonSize" button size="large">
                  <tw-radio value="large1">大尺寸1</tw-radio>
                  <tw-radio value="large2">大尺寸2</tw-radio>
                  <tw-radio value="large3">大尺寸3</tw-radio>
                </tw-radio-group>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-medium mb-2">禁用</h3>
            <tw-radio-group v-model="radioButtonDisabled" button disabled>
              <tw-radio value="disabled1">禁用1</tw-radio>
              <tw-radio value="disabled2">禁用2</tw-radio>
              <tw-radio value="disabled3">禁用3</tw-radio>
            </tw-radio-group>
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

const radio = ref('1')
const radioGroup = ref('1')
const radioBorder = ref('1')
const radioSize = ref('2')
const radioButton = ref('1')
const radioButtonSize = ref('default2')
const radioButtonDisabled = ref('disabled1')

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
    name: 'value',
    description: '单选框对应的值',
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
    name: 'border',
    description: '是否显示边框',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'size',
    description: '单选框的尺寸',
    type: "'small' | 'default' | 'large'",
    default: 'default'
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
    name: 'button',
    description: '是否使用按钮样式',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'border',
    description: '是否显示边框',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'size',
    description: '单选框的尺寸',
    type: "'small' | 'default' | 'large'",
    default: 'default'
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