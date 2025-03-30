<template>
  <div class="tw-container tw-mx-auto tw-py-8 tw-px-4">
    <div class="tw-text-center tw-mb-12">
      <h1 class="tw-text-4xl tw-font-bold tw-mb-4">TW-UI 组件库</h1>
      <p class="tw-text-xl tw-text-gray-600 tw-mb-8">
        基于 Vue 3 和 Tailwind CSS 的现代化 UI 组件库
      </p>
      <div class="tw-flex tw-justify-center tw-gap-4">
        <router-link 
          to="/components/button" 
          class="tw-px-6 tw-py-3 tw-bg-blue-500 tw-text-white tw-rounded-md hover:tw-bg-blue-600 tw-transition-colors"
        >
          开始使用
        </router-link>
        <a 
          href="https://github.com/vue-rookie/tw-ui" 
          target="_blank" 
          class="tw-px-6 tw-py-3 tw-bg-gray-100 tw-text-gray-700 tw-rounded-md hover:tw-bg-gray-200 tw-transition-colors"
        >
          GitHub
        </a>
      </div>
    </div>

    <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-8">
      <div class="tw-p-6 tw-bg-white tw-rounded-lg tw-shadow-md">
        <h3 class="tw-text-xl tw-font-semibold tw-mb-4">高性能</h3>
        <p class="tw-text-gray-600">
          基于 Vue 3 的 Composition API，提供出色的性能和开发体验
        </p>
      </div>
      <div class="tw-p-6 tw-bg-white tw-rounded-lg tw-shadow-md">
        <h3 class="tw-text-xl tw-font-semibold tw-mb-4">可定制</h3>
        <p class="tw-text-gray-600">
          使用 Tailwind CSS，轻松自定义组件样式和主题
        </p>
      </div>
      <div class="tw-p-6 tw-bg-white tw-rounded-lg tw-shadow-md">
        <h3 class="tw-text-xl tw-font-semibold tw-mb-4">响应式</h3>
        <p class="tw-text-gray-600">
          所有组件都经过精心设计，完美适配各种屏幕尺寸
        </p>
      </div>
    </div>

    <div class="tw-mt-16">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-6 tw-text-center">组件列表</h2>
      <div class="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-4">
        <router-link 
          v-for="component in components" 
          :key="component.path"
          :to="component.path"
          class="tw-p-4 tw-bg-white tw-rounded-lg tw-shadow-md hover:tw-shadow-lg tw-transition-shadow"
        >
          <h3 class="tw-font-medium">{{ component.name }}</h3>
          <p class="tw-text-sm tw-text-gray-600 tw-mt-1">{{ component.description }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const components = [
  {
    name: '按钮 Button',
    path: '/components/button',
    description: '常用的操作按钮'
  },
  {
    name: '输入框 Input',
    path: '/components/input',
    description: '文本输入框组件'
  },
  {
    name: '复选框 Checkbox',
    path: '/components/checkbox',
    description: '多选框组件'
  },
  {
    name: '单选框 Radio',
    path: '/components/radio',
    description: '单选框组件'
  },
  {
    name: '选择器 Select',
    path: '/components/select',
    description: '下拉选择器组件'
  },
  {
    name: '对话框 Dialog',
    path: '/components/dialog',
    description: '模态对话框组件'
  },
  {
    name: '标签页 Tabs',
    path: '/components/tabs',
    description: '标签页切换组件'
  }
]
</script> 