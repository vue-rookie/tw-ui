<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Select 选择器</h1>
    
    <div class="space-y-8">
      <!-- 基础用法 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">基础用法</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-select v-model="selectValue" placeholder="请选择">
              <tw-option label="选项1" value="1" />
              <tw-option label="选项2" value="2" />
              <tw-option label="选项3" value="3" />
            </tw-select>
            <span class="text-gray-600">选中值：{{ selectValue }}</span>
          </div>
        </div>
      </section>

      <!-- 禁用状态 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">禁用状态</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-select disabled placeholder="禁用状态" />
            <tw-select disabled value="1">
              <tw-option label="选项1" value="1" />
              <tw-option label="选项2" value="2" />
            </tw-select>
          </div>
        </div>
      </section>

      <!-- 可清空 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">可清空</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-select v-model="clearableValue" clearable placeholder="请选择">
              <tw-option label="选项1" value="1" />
              <tw-option label="选项2" value="2" />
              <tw-option label="选项3" value="3" />
            </tw-select>
            <span class="text-gray-600">选中值：{{ clearableValue }}</span>
          </div>
        </div>
      </section>

      <!-- 多选 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">多选</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-select v-model="multipleValue" multiple placeholder="请选择">
              <tw-option label="选项1" value="1" />
              <tw-option label="选项2" value="2" />
              <tw-option label="选项3" value="3" />
              <tw-option label="选项4" value="4" />
            </tw-select>
            <span class="text-gray-600">选中值：{{ multipleValue }}</span>
          </div>
        </div>
      </section>

      <!-- 自定义选项 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">自定义选项</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-select v-model="customValue" placeholder="请选择">
              <tw-option label="选项1" value="1">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                  </svg>
                  <span>选项1</span>
                </div>
              </tw-option>
              <tw-option label="选项2" value="2">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span>选项2</span>
                </div>
              </tw-option>
            </tw-select>
            <span class="text-gray-600">选中值：{{ customValue }}</span>
          </div>
        </div>
      </section>

      <!-- 分组 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">分组</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-select v-model="groupValue" placeholder="请选择">
              <tw-option-group label="分组1">
                <tw-option label="选项1" value="1" />
                <tw-option label="选项2" value="2" />
              </tw-option-group>
              <tw-option-group label="分组2">
                <tw-option label="选项3" value="3" />
                <tw-option label="选项4" value="4" />
              </tw-option-group>
            </tw-select>
            <span class="text-gray-600">选中值：{{ groupValue }}</span>
          </div>
        </div>
      </section>
    </div>

    <!-- API 文档 -->
    <section class="bg-white rounded-lg shadow-sm p-6 mt-8">
      <h2 class="text-2xl font-semibold mb-6">API</h2>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-medium mb-4">Select 属性</h3>
          <tw-table
            :columns="propsColumns"
            :data="propsData"
          />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">Select 事件</h3>
          <tw-table
            :columns="eventsColumns"
            :data="eventsData"
          />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">Option 属性</h3>
          <tw-table
            :columns="optionPropsColumns"
            :data="optionPropsData"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectValue = ref('')
const clearableValue = ref('')
const multipleValue = ref<string[]>([])
const customValue = ref('')
const groupValue = ref('')

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
    type: 'string | number | boolean | object',
    default: '-'
  },
  {
    name: 'multiple',
    description: '是否多选',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'disabled',
    description: '是否禁用',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'clearable',
    description: '是否可以清空选项',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'placeholder',
    description: '占位符',
    type: 'string',
    default: "'请选择'"
  },
  {
    name: 'size',
    description: '输入框尺寸',
    type: "'large' | 'default' | 'small'",
    default: "'default'"
  },
  {
    name: 'loading',
    description: '是否正在从远程获取数据',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'filterable',
    description: '是否可搜索',
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
    description: '选中值发生变化时触发',
    parameters: 'value: string | number | boolean | object'
  },
  {
    name: 'change',
    description: '选中值发生变化时触发',
    parameters: 'value: string | number | boolean | object'
  },
  {
    name: 'clear',
    description: '可清空的单选模式下用户点击清空按钮时触发',
    parameters: '-'
  },
  {
    name: 'visible-change',
    description: '下拉框出现/隐藏时触发',
    parameters: 'visible: boolean'
  },
  {
    name: 'remove-tag',
    description: '多选模式下移除tag时触发',
    parameters: 'value: string | number | boolean | object'
  }
]

const optionPropsColumns = [
  { key: 'name', title: '属性名' },
  { key: 'description', title: '说明' },
  { key: 'type', title: '类型', className: 'column-type' },
  { key: 'default', title: '默认值', className: 'column-default' }
]

const optionPropsData = [
  {
    name: 'value',
    description: '选项的值',
    type: 'string | number | boolean | object',
    default: '-'
  },
  {
    name: 'label',
    description: '选项的标签，若不设置则默认与 value 相同',
    type: 'string | number',
    default: '-'
  },
  {
    name: 'disabled',
    description: '是否禁用该选项',
    type: 'boolean',
    default: 'false'
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