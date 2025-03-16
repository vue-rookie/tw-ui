<template>
  <div 
    class="tw-tabs"
    :class="[
      `tw-tabs-${type}`,
      `tw-tabs-${size}`,
      { 'tw-tabs-card': type === 'card' },
      { 'tw-tabs-line': type === 'line' },
      { 'tw-tabs-segment': type === 'segment' }
    ]"
  >
    <!-- 标签页头部 -->
    <div 
      ref="navRef"
      class="tw-tabs-nav"
      :class="[
        `tw-tabs-nav-${position}`,
        { 'tw-tabs-nav-stretch': stretch }
      ]"
    >
      <div 
        v-for="tab in tabList" 
        :key="tab.name"
        class="tw-tabs-tab"
        :class="[
          { 'tw-tabs-tab-active': modelValue === tab.name },
          { 'tw-tabs-tab-disabled': tab.disabled }
        ]"
        @click="!tab.disabled && handleTabClick(tab.name)"
      >
        <slot name="tab" :tab="tab">
          <span class="tw-tabs-tab-label">{{ tab.label }}</span>
        </slot>
      </div>
      
      <!-- 活动指示器 (仅用于线型标签页) -->
      <div 
        v-if="type === 'line' && activeIndex !== -1" 
        class="tw-tabs-ink-bar"
        :style="inkBarStyle"
      ></div>
    </div>
    
    <!-- 标签页内容 -->
    <div class="tw-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick, useSlots, provide } from 'vue'

interface TabItem {
  name: string | number
  label: string
  disabled?: boolean
}

interface TabsProps {
  modelValue: string | number
  tabs?: TabItem[]
  type?: 'line' | 'card' | 'segment'
  position?: 'top' | 'bottom' | 'left' | 'right'
  size?: 'small' | 'default' | 'large'
  stretch?: boolean
}

const props = withDefaults(defineProps<TabsProps>(), {
  tabs: () => [],
  type: 'line',
  position: 'top',
  size: 'default',
  stretch: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'tab-click', name: string | number): void
  (e: 'tab-change', name: string | number): void
}>()

const slots = useSlots()
const tabRefs = ref<HTMLElement[]>([])
const navRef = ref<HTMLElement | null>(null)

// 提供当前活动的标签页名称给TabPane组件
provide('activeTab', props.modelValue)

// 监听modelValue变化，更新provide的值
watch(() => props.modelValue, (newValue) => {
  provide('activeTab', newValue)
})

// 从插槽中获取TabPane组件
const tabPanes = computed(() => {
  if (!slots.default) return []
  
  const children = slots.default()
  return children.filter(child => {
    return child.type && (child.type as any).name === 'TwTabPane'
  })
})

// 合并props.tabs和TabPane组件生成的标签列表
const tabList = computed(() => {
  if (tabPanes.value.length > 0) {
    return tabPanes.value.map(pane => {
      const props = pane.props || {}
      return {
        name: props.name,
        label: props.label,
        disabled: props.disabled
      }
    })
  }
  return props.tabs
})

const activeIndex = computed(() => {
  return tabList.value.findIndex(tab => tab.name === props.modelValue)
})

// 计算活动指示器的样式
const inkBarStyle = computed(() => {
  if (activeIndex.value === -1 || !tabRefs.value.length) return {}
  
  const currentTab = tabRefs.value[activeIndex.value]
  if (!currentTab) return {}
  
  if (['top', 'bottom'].includes(props.position)) {
    return {
      width: `${currentTab.offsetWidth}px`,
      transform: `translateX(${currentTab.offsetLeft}px)`
    }
  } else {
    return {
      height: `${currentTab.offsetHeight}px`,
      transform: `translateY(${currentTab.offsetTop}px)`
    }
  }
})

// 处理标签点击
const handleTabClick = (name: string | number) => {
  emit('tab-click', name)
  
  if (props.modelValue !== name) {
    emit('update:modelValue', name)
    emit('tab-change', name)
  }
}

// 更新标签引用
const updateTabRefs = () => {
  nextTick(() => {
    if (navRef.value) {
      tabRefs.value = Array.from(navRef.value.querySelectorAll('.tw-tabs-tab'))
    }
  })
}

// 监听标签变化
watch(() => tabList.value, updateTabRefs, { immediate: true })

// 组件挂载后更新标签引用
onMounted(updateTabRefs)

// 为组件定义名称，供TabPane识别
defineOptions({
  name: 'TwTabs'
})
</script>

<style scoped>
.tw-tabs {
  @apply tw-w-full;
}

/* 标签导航 */
.tw-tabs-nav {
  @apply tw-relative tw-flex tw-border-b tw-border-gray-200;
}

.tw-tabs-nav-top {
  @apply tw-flex-row;
}

.tw-tabs-nav-bottom {
  @apply tw-flex-row tw-border-t tw-border-b-0;
}

.tw-tabs-nav-left {
  @apply tw-flex-col tw-border-r tw-border-b-0;
}

.tw-tabs-nav-right {
  @apply tw-flex-col tw-border-l tw-border-b-0;
}

.tw-tabs-nav-stretch {
  @apply tw-justify-between;
}

.tw-tabs-nav-stretch .tw-tabs-tab {
  @apply tw-flex-1 tw-text-center;
}

/* 标签项 */
.tw-tabs-tab {
  @apply tw-cursor-pointer tw-transition-all tw-duration-200;
}

.tw-tabs-small .tw-tabs-tab {
  @apply tw-px-3 tw-py-1.5 tw-text-xs;
}

.tw-tabs-default .tw-tabs-tab {
  @apply tw-px-4 tw-py-2 tw-text-sm;
}

.tw-tabs-large .tw-tabs-tab {
  @apply tw-px-5 tw-py-2.5 tw-text-base;
}

.tw-tabs-tab-label {
  @apply tw-whitespace-nowrap;
}

.tw-tabs-tab-disabled {
  @apply tw-cursor-not-allowed tw-opacity-50;
}

/* 线型标签页 */
.tw-tabs-line .tw-tabs-tab {
  @apply tw-text-gray-500 hover:tw-text-gray-700;
}

.tw-tabs-line .tw-tabs-tab-active {
  @apply tw-text-blue-600 hover:tw-text-blue-700;
}

.tw-tabs-ink-bar {
  @apply tw-absolute tw-bg-blue-500 tw-transition-transform tw-duration-300 tw-ease-in-out;
}

.tw-tabs-nav-top .tw-tabs-ink-bar {
  @apply tw-bottom-0 tw-h-0.5;
}

.tw-tabs-nav-bottom .tw-tabs-ink-bar {
  @apply tw-top-0 tw-h-0.5;
}

.tw-tabs-nav-left .tw-tabs-ink-bar {
  @apply tw-right-0 tw-w-0.5;
}

.tw-tabs-nav-right .tw-tabs-ink-bar {
  @apply tw-left-0 tw-w-0.5;
}

/* 卡片标签页 */
.tw-tabs-card .tw-tabs-nav {
  @apply tw-border-b-0 tw-gap-2;
}

.tw-tabs-card .tw-tabs-tab {
  @apply tw-border tw-border-gray-200 tw-rounded-t-md tw-bg-gray-50 tw-text-gray-500;
  @apply hover:tw-bg-gray-100 hover:tw-text-gray-700;
}

.tw-tabs-card .tw-tabs-tab-active {
  @apply tw-bg-white tw-border-b-white tw-text-blue-600;
  @apply hover:tw-bg-white hover:tw-text-blue-700;
  margin-bottom: -1px;
}

.tw-tabs-card .tw-tabs-content {
  @apply tw-border tw-border-gray-200 tw-rounded-b-md tw-p-4;
}

/* 分段标签页 */
.tw-tabs-segment .tw-tabs-nav {
  @apply tw-border tw-border-gray-200 tw-rounded-md tw-p-1 tw-bg-gray-50 tw-gap-1;
}

.tw-tabs-segment .tw-tabs-tab {
  @apply tw-rounded tw-text-gray-500;
  @apply hover:tw-bg-gray-100 hover:tw-text-gray-700;
}

.tw-tabs-segment .tw-tabs-tab-active {
  @apply tw-bg-white tw-text-blue-600 tw-shadow-sm;
  @apply hover:tw-bg-white hover:tw-text-blue-700;
}

/* 标签内容 */
.tw-tabs-content {
  @apply tw-mt-4;
}

/* 动画效果 */
.tw-tabs-tab {
  @apply tw-transition-all tw-duration-200;
}

.tw-tabs-tab:hover {
  @apply tw-transform tw-scale-105;
}

.tw-tabs-tab:active {
  @apply tw-transform tw-scale-95;
}

.tw-tabs-tab-active {
  @apply tw-transform tw-scale-100;
}
</style> 