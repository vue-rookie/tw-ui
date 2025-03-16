<script setup lang="ts">
import { ref } from 'vue'
import {
  TwAlert,
  TwAvatar,
  TwBadge,
  TwBreadcrumb,
  TwBreadcrumbItem,
  TwBreadcrumbLink,
  TwButton,
  TwCard,
  TwCardContent,
  TwCardDescription,
  TwCardFooter,
  TwCardHeader,
  TwCardTitle,
  TwCheckbox,
  TwInput,
  TwModal,
  TwPagination,
  TwRadio,
  TwSelect,
  TwSwitch,
  TwTabPanel,
  TwTabs,
  TwTextarea,
  TwTooltip
} from './components'

// 表单状态
const inputValue = ref('')
const selectValue = ref('')
const textareaValue = ref('')
const checkboxValue1 = ref(false)
const checkboxValue2 = ref(true)
const checkboxValue3 = ref(false)
const radioValue = ref('radio1')
const switchValue = ref(false)

// 警告提示
const alertClosed = ref(false)

// 标签页
const activeTab = ref('tab1')
const tabs = [
  { label: '标签1', name: 'tab1' },
  { label: '标签2', name: 'tab2' },
  { label: '标签3', name: 'tab3' }
]

// 模态框
const modalOpen = ref(false)

// 分页
const currentPage = ref(1)
</script>

<template>
  <div class="tw-container tw-mx-auto tw-py-8 tw-px-4">
    <h1 class="tw-text-3xl tw-font-bold tw-mb-8 tw-text-center">TW-UI 组件库</h1>
    
    <section class="tw-mb-10">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">按钮 Button</h2>
      <div class="tw-flex tw-flex-wrap tw-gap-4">
        <TwButton>默认按钮</TwButton>
        <TwButton variant="primary">主要按钮</TwButton>
        <TwButton variant="success">成功按钮</TwButton>
        <TwButton variant="warning">警告按钮</TwButton>
        <TwButton variant="danger">危险按钮</TwButton>
        <TwButton variant="outline">轮廓按钮</TwButton>
        <TwButton variant="ghost">幽灵按钮</TwButton>
        <TwButton variant="link">链接按钮</TwButton>
      </div>
      <div class="tw-flex tw-flex-wrap tw-gap-4 tw-mt-4">
        <TwButton size="small">小按钮</TwButton>
        <TwButton>中按钮</TwButton>
        <TwButton size="large">大按钮</TwButton>
        <TwButton size="large">超大按钮</TwButton>
      </div>
    </section>

    <section class="tw-mb-10">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">徽章 Badge</h2>
      <div class="tw-flex tw-flex-wrap tw-gap-4">
        <TwBadge>默认</TwBadge>
        <TwBadge variant="primary">主要</TwBadge>
        <TwBadge variant="secondary">次要</TwBadge>
        <TwBadge variant="success">成功</TwBadge>
        <TwBadge variant="warning">警告</TwBadge>
        <TwBadge variant="danger">危险</TwBadge>
        <TwBadge variant="outline">轮廓</TwBadge>
      </div>
    </section>

    <section class="tw-mb-10">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">卡片 Card</h2>
      <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
        <TwCard>
          <TwCardHeader>
            <TwCardTitle>卡片标题</TwCardTitle>
            <TwCardDescription>这是一个卡片描述，可以包含一些简短的说明文字。</TwCardDescription>
          </TwCardHeader>
          <TwCardContent>
            <p>卡片内容区域，可以放置任何内容。</p>
          </TwCardContent>
          <TwCardFooter>
            <TwButton variant="primary">确认</TwButton>
            <TwButton variant="outline" class="tw-ml-2">取消</TwButton>
          </TwCardFooter>
        </TwCard>
        
        <TwCard>
          <TwCardHeader>
            <TwCardTitle>产品信息</TwCardTitle>
          </TwCardHeader>
          <TwCardContent>
            <div class="tw-space-y-4">
              <div class="tw-flex tw-justify-between">
                <span>价格</span>
                <span>¥199.00</span>
              </div>
              <div class="tw-flex tw-justify-between">
                <span>状态</span>
                <TwBadge variant="success">有货</TwBadge>
              </div>
            </div>
          </TwCardContent>
          <TwCardFooter>
            <TwButton variant="primary" class="tw-w-full">立即购买</TwButton>
          </TwCardFooter>
        </TwCard>
      </div>
    </section>

    <section class="tw-mb-10">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">表单控件</h2>
      <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
        <div class="tw-space-y-4">
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-mb-1">输入框</label>
            <TwInput v-model="inputValue" placeholder="请输入内容" />
          </div>
          
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-mb-1">选择框</label>
            <TwSelect 
              v-model="selectValue" 
              placeholder="请选择"
              :options="[
                { label: '选项1', value: 'option1' },
                { label: '选项2', value: 'option2' },
                { label: '选项3', value: 'option3' }
              ]"
            />
          </div>
          
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-mb-1">文本域</label>
            <TwTextarea v-model="textareaValue" placeholder="请输入多行文本" />
          </div>
        </div>
        
        <div class="tw-space-y-4">
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-mb-1">复选框</label>
            <div class="tw-space-y-2">
              <TwCheckbox v-model="checkboxValue1">选项1</TwCheckbox>
              <TwCheckbox v-model="checkboxValue2">选项2</TwCheckbox>
              <TwCheckbox v-model="checkboxValue3">选项3</TwCheckbox>
            </div>
          </div>
          
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-mb-1">单选框</label>
            <div class="tw-space-y-2">
              <TwRadio v-model="radioValue" name="radio-group" value="radio1">选项1</TwRadio>
              <TwRadio v-model="radioValue" name="radio-group" value="radio2">选项2</TwRadio>
              <TwRadio v-model="radioValue" name="radio-group" value="radio3">选项3</TwRadio>
            </div>
          </div>
          
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-mb-1">开关</label>
            <TwSwitch v-model="switchValue">开启通知</TwSwitch>
          </div>
        </div>
      </div>
    </section>

    <section class="tw-mb-10">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">警告提示 Alert</h2>
      <div class="tw-space-y-4">
        <TwAlert>这是一条默认提示信息</TwAlert>
        <TwAlert variant="info" title="信息提示">这是一条信息提示</TwAlert>
        <TwAlert variant="success" title="成功提示">这是一条成功提示</TwAlert>
        <TwAlert variant="warning" title="警告提示">这是一条警告提示</TwAlert>
        <TwAlert variant="danger" title="错误提示" dismissible @close="alertClosed = true">
          这是一条错误提示，可以关闭
        </TwAlert>
        <div v-if="alertClosed" class="tw-text-sm tw-text-gray-500">
          提示已关闭
        </div>
      </div>
    </section>

    <section class="tw-mb-10">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">头像 Avatar</h2>
      <div class="tw-flex tw-flex-wrap tw-gap-4 tw-items-end">
        <TwAvatar size="sm" />
        <TwAvatar />
        <TwAvatar size="lg" />
        <TwAvatar size="xl" />
        <TwAvatar initials="JD" />
        <TwAvatar src="https://randomuser.me/api/portraits/women/17.jpg" alt="Jane Doe" />
      </div>
    </section>

    <section class="tw-mb-10">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">面包屑 Breadcrumb</h2>
      <TwBreadcrumb>
        <TwBreadcrumbItem>
          <TwBreadcrumbLink href="/">首页</TwBreadcrumbLink>
        </TwBreadcrumbItem>
        <TwBreadcrumbItem>
          <TwBreadcrumbLink href="/products">产品</TwBreadcrumbLink>
        </TwBreadcrumbItem>
        <TwBreadcrumbItem isLast>
          <TwBreadcrumbLink current>详情</TwBreadcrumbLink>
        </TwBreadcrumbItem>
      </TwBreadcrumb>
    </section>

    <section class="tw-mb-10">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">工具提示 Tooltip</h2>
      <div class="tw-flex tw-flex-wrap tw-gap-8 tw-py-8">
        <TwTooltip text="这是顶部提示" position="top">
          <TwButton>顶部提示</TwButton>
        </TwTooltip>
        <TwTooltip text="这是右侧提示" position="right">
          <TwButton>右侧提示</TwButton>
        </TwTooltip>
        <TwTooltip text="这是底部提示" position="bottom">
          <TwButton>底部提示</TwButton>
        </TwTooltip>
        <TwTooltip text="这是左侧提示" position="left">
          <TwButton>左侧提示</TwButton>
        </TwTooltip>
      </div>
    </section>

    <section class="tw-mb-10">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">标签页 Tabs</h2>
      <TwTabs v-model="activeTab" :tabs="tabs">
        <TwTabPanel :modelValue="activeTab" value="tab1">
          <p>这是第一个标签页的内容</p>
        </TwTabPanel>
        <TwTabPanel :modelValue="activeTab" value="tab2">
          <p>这是第二个标签页的内容</p>
        </TwTabPanel>
        <TwTabPanel :modelValue="activeTab" value="tab3">
          <p>这是第三个标签页的内容</p>
        </TwTabPanel>
      </TwTabs>
    </section>

    <section class="tw-mb-10">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">模态框 Modal</h2>
      <TwButton @click="modalOpen = true">打开模态框</TwButton>
      <TwModal v-model="modalOpen">
        <div class="tw-text-center sm:tw-text-left">
          <h3 class="tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900">模态框标题</h3>
          <div class="tw-mt-2">
            <p class="tw-text-sm tw-text-gray-500">
              这是一个模态框示例，您可以在此处添加任何内容。
            </p>
          </div>
        </div>
        <div class="tw-mt-5 sm:tw-mt-4 sm:tw-flex sm:tw-flex-row-reverse">
          <TwButton variant="primary" class="tw-w-full sm:tw-w-auto sm:tw-ml-3" @click="modalOpen = false">
            确认
          </TwButton>
          <TwButton variant="outline" class="tw-mt-3 tw-w-full sm:tw-mt-0 sm:tw-w-auto" @click="modalOpen = false">
            取消
          </TwButton>
        </div>
      </TwModal>
    </section>

    <section class="tw-mb-10">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">分页 Pagination</h2>
      <TwPagination v-model="currentPage" :total="100" :per-page="10" />
    </section>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
