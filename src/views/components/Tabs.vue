<template>
  <div class="tw-p-6">
    <h1 class="tw-text-3xl tw-font-bold tw-mb-6">Tabs 标签页</h1>
    
    <div class="space-y-8">
      <!-- 基础用法 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">基础用法</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-flex-col tw-gap-4">
            <tw-tabs v-model="basicValue">  
              <tw-tab-pane label="标签1" name="1">标签1的内容</tw-tab-pane>
              <tw-tab-pane label="标签2" name="2">标签2的内容</tw-tab-pane>
              <tw-tab-pane label="标签3" name="3">标签3的内容</tw-tab-pane>
            </tw-tabs>
            <span class="tw-text-gray-600">当前标签：{{ basicValue }}</span>   
          </div>
        </div>
      </section>

      <!-- 卡片样式 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">卡片样式</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-flex-col tw-gap-4">
            <tw-tabs v-model="cardValue" type="card">
              <tw-tab-pane label="标签1" name="1">标签1的内容</tw-tab-pane>
              <tw-tab-pane label="标签2" name="2">标签2的内容</tw-tab-pane>
              <tw-tab-pane label="标签3" name="3">标签3的内容</tw-tab-pane>
            </tw-tabs>
            <span class="tw-text-gray-600">当前标签：{{ cardValue }}</span>
          </div>
        </div>
      </section>

      <!-- 分段样式 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">分段样式</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-flex-col tw-gap-4">
            <tw-tabs v-model="segmentValue" type="segment">
              <tw-tab-pane label="标签1" name="1">标签1的内容</tw-tab-pane>
              <tw-tab-pane label="标签2" name="2">标签2的内容</tw-tab-pane>
              <tw-tab-pane label="标签3" name="3">标签3的内容</tw-tab-pane>
            </tw-tabs>
            <span class="tw-text-gray-600">当前标签：{{ segmentValue }}</span>
          </div>
        </div>
      </section>

      <!-- 可关闭标签 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">可关闭标签</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-flex-col tw-gap-4">
            <tw-tabs 
              v-model="closableValue" 
              @tab-close="handleTabClose"
              :before-close="beforeClose"
            >
              <tw-tab-pane label="标签1" name="1" closable>标签1的内容</tw-tab-pane>
              <tw-tab-pane label="标签2" name="2" closable>标签2的内容</tw-tab-pane>
              <tw-tab-pane label="标签3" name="3" closable>标签3的内容</tw-tab-pane>
              <tw-tab-pane label="固定标签" name="4">固定标签的内容</tw-tab-pane>
            </tw-tabs>
            <span class="tw-text-gray-600">当前标签：{{ closableValue }}</span>
          </div>
        </div>
      </section>

      <!-- 禁用状态 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">禁用状态</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-flex-col tw-gap-4">
            <tw-tabs v-model="disabledValue">
              <tw-tab-pane label="标签1" name="1">标签1的内容</tw-tab-pane>
              <tw-tab-pane label="禁用标签" name="2" disabled>禁用标签的内容</tw-tab-pane>
              <tw-tab-pane label="标签3" name="3">标签3的内容</tw-tab-pane>
            </tw-tabs>
            <span class="tw-text-gray-600">当前标签：{{ disabledValue }}</span>
          </div>
        </div>
      </section>

      <!-- 自定义标签 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">自定义标签</h2>
        <div class="tw-space-y-4">
          <div class="tw-flex tw-flex-col tw-gap-4">
            <tw-tabs v-model="customValue">
              <tw-tab-pane name="1">
                <template #label>
                  <div class="tw-flex tw-items-center tw-gap-2">
                    <Icon icon="mdi:plus-circle" class="tw-text-blue-500" />
                    <span>标签1</span>
                  </div>
                </template>
                标签1的内容
              </tw-tab-pane>
              <tw-tab-pane name="2">
                <template #label>
                  <div class="tw-flex tw-items-center tw-gap-2">
                    <Icon icon="mdi:check-circle" class="tw-text-green-500" />
                    <span>标签2</span>
                  </div>
                </template>
                标签2的内容
              </tw-tab-pane>
            </tw-tabs>
            <span class="tw-text-gray-600">当前标签：{{ customValue }}</span>
          </div>
        </div>
      </section>

      <!-- 不同尺寸 -->
      <section>
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">不同尺寸</h2>
        <div class="tw-space-y-4">
          <div>
            <h3 class="tw-text-lg tw-font-medium tw-mb-2">小尺寸</h3>
            <tw-tabs v-model="sizeValue" size="small">
              <tw-tab-pane label="标签1" name="1">标签1的内容</tw-tab-pane>
              <tw-tab-pane label="标签2" name="2">标签2的内容</tw-tab-pane>
              <tw-tab-pane label="标签3" name="3">标签3的内容</tw-tab-pane>
            </tw-tabs>
          </div>
          <div>
            <h3 class="tw-text-lg tw-font-medium tw-mb-2">默认尺寸</h3>
            <tw-tabs v-model="sizeValue">
              <tw-tab-pane label="标签1" name="1">标签1的内容</tw-tab-pane>
              <tw-tab-pane label="标签2" name="2">标签2的内容</tw-tab-pane>
              <tw-tab-pane label="标签3" name="3">标签3的内容</tw-tab-pane>
            </tw-tabs>
          </div>
          <div>
            <h3 class="tw-text-lg tw-font-medium tw-mb-2">大尺寸</h3>
            <tw-tabs v-model="sizeValue" size="large">
              <tw-tab-pane label="标签1" name="1">标签1的内容</tw-tab-pane>
              <tw-tab-pane label="标签2" name="2">标签2的内容</tw-tab-pane>
              <tw-tab-pane label="标签3" name="3">标签3的内容</tw-tab-pane>
            </tw-tabs>
          </div>
        </div>
      </section>
    </div>

    <!-- API 文档 -->
    <section class="bg-white rounded-lg shadow-sm p-6 mt-8">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-6">API</h2>
      
      <div class="space-y-6">
        <div>
          <h3 class="tw-text-lg tw-font-medium tw-mb-4">Tabs 属性</h3>
          <tw-table
            :columns="propsColumns"
            :data="propsData"
          />
        </div>

        <div>
          <h3 class="tw-text-lg tw-font-medium tw-mb-4">Tabs 事件</h3>
          <tw-table
            :columns="eventsColumns"
            :data="eventsData"
          />
        </div>

        <div>
          <h3 class="tw-text-lg tw-font-medium tw-mb-4">TabPane 属性</h3>
          <tw-table
            :columns="tabPanePropsColumns"
            :data="tabPanePropsData"
          />
        </div>

        <div>
          <h3 class="tw-text-lg tw-font-medium tw-mb-4">Tabs 插槽</h3>
          <tw-table
            :columns="slotsColumns"
            :data="slotsData"
          />
        </div>

        <div>
          <h3 class="tw-text-lg tw-font-medium tw-mb-4">TabPane 插槽</h3>
          <tw-table
            :columns="slotsColumns"
            :data="tabPaneSlotsData"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const basicValue = ref('1')
const cardValue = ref('1')
const segmentValue = ref('1')
const closableValue = ref('1')
const disabledValue = ref('1')
const customValue = ref('1')
const sizeValue = ref('1')

// 处理标签关闭
const handleTabClose = (name: string | number) => {
  console.log('关闭标签', name)
}

// 关闭前的钩子
const beforeClose = (name: string | number) => {
  if (name === '1') {
    return confirm('确定要关闭第一个标签吗？')
  }
  return true
}

const propsColumns = [
  { key: 'name', title: '属性名' },
  { key: 'description', title: '说明' },
  { key: 'type', title: '类型', className: 'column-type' },
  { key: 'default', title: '默认值', className: 'column-default' }
]

const propsData = [
  {
    name: 'modelValue',
    description: '绑定值，选中的标签页',
    type: 'string | number',
    default: '-'
  },
  {
    name: 'type',
    description: '标签页的类型',
    type: "'line' | 'card' | 'segment'",
    default: 'line'
  },
  {
    name: 'position',
    description: '标签页的位置',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: 'top'
  },
  {
    name: 'size',
    description: '标签页的尺寸',
    type: "'small' | 'default' | 'large'",
    default: 'default'
  },
  {
    name: 'stretch',
    description: '标签是否自撑开',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'beforeClose',
    description: '关闭前的钩子，返回 false 或 Promise 拒绝则阻止关闭',
    type: '(name: string | number) => boolean | Promise<boolean>',
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
    description: '选中标签页变化时触发',
    parameters: 'value: string | number'
  },
  {
    name: 'tab-click',
    description: '点击标签页时触发',
    parameters: 'name: string | number'
  },
  {
    name: 'tab-change',
    description: '标签页变化时触发',
    parameters: 'name: string | number'
  },
  {
    name: 'tab-close',
    description: '标签页关闭时触发',
    parameters: 'name: string | number'
  }
]

const tabPanePropsColumns = [
  { key: 'name', title: '属性名' },
  { key: 'description', title: '说明' },
  { key: 'type', title: '类型', className: 'column-type' },
  { key: 'default', title: '默认值', className: 'column-default' }
]

const tabPanePropsData = [
  {
    name: 'name',
    description: '标签页的标识',
    type: 'string | number',
    default: '-'
  },
  {
    name: 'label',
    description: '标签页的标题',
    type: 'string',
    default: '-'
  },
  {
    name: 'disabled',
    description: '是否禁用',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'closable',
    description: '是否可关闭',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'lazy',
    description: '是否延迟渲染',
    type: 'boolean',
    default: 'false'
  }
]

const slotsColumns = [
  { key: 'name', title: '插槽名' },
  { key: 'description', title: '说明' }
]

const slotsData = [
  {
    name: 'default',
    description: 'TabPane 组件列表'
  },
  {
    name: 'tab',
    description: '自定义标签页，作用域参数为 tab 对象'
  }
]

const tabPaneSlotsData = [
  {
    name: 'default',
    description: '标签页内容'
  },
  {
    name: 'label',
    description: '标签页标题'
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