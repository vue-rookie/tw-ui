<template>
  <div 
    v-show="isActive"
    class="tw-tab-pane"
    :class="[
      { 'tw-tab-pane-active': isActive },
      { 'tw-tab-pane-disabled': disabled }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

// 定义组件名称，供Tabs组件识别
defineOptions({
  name: 'TwTabPane'
})

interface TabPaneProps {
  name: string | number
  label: string
  disabled?: boolean
  lazy?: boolean
  closable?: boolean
}

const props = withDefaults(defineProps<TabPaneProps>(), {
  disabled: false,
  lazy: false,
  closable: false
})

// 注入当前活动的标签页名称
const activeTab = inject<string | number>('activeTab', '')

// 判断当前标签页是否激活
const isActive = computed(() => {
  return activeTab === props.name
})
</script>

<style scoped>
.tw-tab-pane {
  @apply tw-transition-opacity tw-duration-300 tw-ease-in-out;
}

.tw-tab-pane-active {
  @apply tw-opacity-100;
}

.tw-tab-pane-disabled {
  @apply tw-opacity-50 tw-pointer-events-none;
}
</style> 