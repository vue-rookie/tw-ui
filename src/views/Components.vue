<template>
  <div class="tw-flex tw-h-screen">
    <!-- 侧边栏 -->
    <div class="tw-w-64 tw-bg-gray-50 tw-border-r tw-border-gray-200 tw-overflow-y-auto">
      <div class="tw-p-4">
        <h2 class="tw-text-lg tw-font-semibold tw-mb-4">组件</h2>
        <nav class="tw-space-y-1">
          <router-link
            v-for="component in components"
            :key="component.path"
            :to="component.path"
            class="tw-block tw-px-4 tw-py-2 tw-rounded-md tw-text-gray-700 hover:tw-bg-gray-100"
            :class="{ 'tw-bg-blue-50 tw-text-blue-700': currentPath === component.path }"
          >
            {{ component.name }}
          </router-link>
        </nav>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="tw-flex-1 tw-overflow-y-auto">
      <div class="tw-container tw-mx-auto tw-py-8 tw-px-4">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentPath = computed(() => route.path)

const components = [
  {
    name: '按钮 Button',
    path: '/components/button'
  },
  {
    name: '输入框 Input',
    path: '/components/input'
  },
  {
    name: '复选框 Checkbox',
    path: '/components/checkbox'
  },
  {
    name: '单选框 Radio',
    path: '/components/radio'
  },
  {
    name: '选择器 Select',
    path: '/components/select'
  },
  {
    name: '对话框 Dialog',
    path: '/components/dialog'
  },
  {
    name: '标签页 Tabs',
    path: '/components/tabs'
  }
]
</script> 