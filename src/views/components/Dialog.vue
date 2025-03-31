<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Dialog 对话框</h1>
    
    <div class="space-y-8">
      <!-- 基础用法 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">基础用法</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-button @click="basicVisible = true">打开对话框</tw-button>
            <tw-dialog v-model="basicVisible" title="标题">
              <p>这是一个基础的对话框。</p>
            </tw-dialog>
          </div>
        </div>
      </section>

      <!-- 自定义内容 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">自定义内容</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-button @click="customVisible = true">打开对话框</tw-button>
            <tw-dialog v-model="customVisible" title="自定义内容">
              <div class="space-y-4">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-lg font-medium">确认信息</span>
                </div>
                <p class="text-gray-600">这是一个自定义内容的对话框，你可以在这里放置任何内容。</p>
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-500">请注意，此操作不可撤销。</span>
                </div>
              </div>
            </tw-dialog>
          </div>
        </div>
      </section>

      <!-- 自定义按钮 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">自定义按钮</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-button @click="buttonVisible = true">打开对话框</tw-button>
            <tw-dialog v-model="buttonVisible" title="自定义按钮">
              <p>这是一个带有自定义按钮的对话框。</p>
              <template #footer>
                <div class="flex justify-end gap-2">
                  <tw-button @click="buttonVisible = false">取消</tw-button>
                  <tw-button type="primary" @click="handleConfirm">确认</tw-button>
                </div>
              </template>
            </tw-dialog>
          </div>
        </div>
      </section>

      <!-- 居中显示 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">居中显示</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-button @click="centerVisible = true">打开对话框</tw-button>
            <tw-dialog v-model="centerVisible" title="居中显示" center>
              <p>这是一个居中显示的对话框。</p>
            </tw-dialog>
          </div>
        </div>
      </section>

      <!-- 可拖拽 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">可拖拽</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-button @click="draggableVisible = true">打开对话框</tw-button>
            <tw-dialog v-model="draggableVisible" title="可拖拽" draggable>
              <p>这是一个可以拖拽的对话框。</p>
            </tw-dialog>
          </div>
        </div>
      </section>

      <!-- 全屏显示 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">全屏显示</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-button @click="fullscreenVisible = true">打开对话框</tw-button>
            <tw-dialog v-model="fullscreenVisible" title="全屏显示" fullscreen>
              <div class="space-y-4">
                <p>这是一个全屏显示的对话框。</p>
                <div class="h-96 bg-gray-100 rounded-lg"></div>
                <p>你可以在这里放置更多的内容。</p>
              </div>
            </tw-dialog>
          </div>
        </div>
      </section>
    </div>

    <!-- API 文档 -->
    <section class="bg-white rounded-lg shadow-sm p-6 mt-8">
      <h2 class="text-2xl font-semibold mb-6">API</h2>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-medium mb-4">属性</h3>
          <tw-table
            :columns="propsColumns"
            :data="propsData"
          />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">插槽</h3>
          <tw-table
            :columns="slotsColumns"
            :data="slotsData"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basicVisible = ref(false)
const customVisible = ref(false)
const buttonVisible = ref(false)
const centerVisible = ref(false)
const draggableVisible = ref(false)
const fullscreenVisible = ref(false)

const handleConfirm = () => {
  buttonVisible.value = false
  // 这里可以添加确认后的逻辑
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
    description: '是否显示对话框',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'title',
    description: '对话框标题',
    type: 'string',
    default: '-'
  },
  {
    name: 'width',
    description: '对话框宽度',
    type: 'string | number',
    default: "'50%'"
  },
  {
    name: 'top',
    description: '对话框距离顶部的距离',
    type: 'string | number',
    default: "'15vh'"
  },
  {
    name: 'center',
    description: '是否居中显示',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'draggable',
    description: '是否可拖拽',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'fullscreen',
    description: '是否全屏显示',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'closeOnClickModal',
    description: '是否可以通过点击遮罩层关闭对话框',
    type: 'boolean',
    default: 'true'
  },
  {
    name: 'closeOnPressEscape',
    description: '是否可以通过按下 ESC 键关闭对话框',
    type: 'boolean',
    default: 'true'
  }
]

const slotsColumns = [
  { key: 'name', title: '插槽名' },
  { key: 'description', title: '说明' }
]

const slotsData = [
  {
    name: 'default',
    description: '对话框的内容'
  },
  {
    name: 'header',
    description: '对话框的头部'
  },
  {
    name: 'footer',
    description: '对话框的底部'
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