<template>
  <div class="tw-p-8 tw-max-w-7xl tw-mx-auto">
    <h1 class="tw-text-3xl tw-font-bold tw-mb-8">Button 按钮</h1>
    
    <div class="tw-space-y-12">
      <!-- 基础用法 -->
      <section class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6">
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-6">基础用法</h2>
        <div class="tw-space-y-4">
          <div class="tw-space-x-4 tw-flex tw-flex-wrap">
            <tw-button>默认按钮</tw-button>
            <tw-button type="primary">主要按钮</tw-button>
            <tw-button type="success">成功按钮</tw-button>
            <tw-button type="warning">警告按钮</tw-button>
            <tw-button type="danger">危险按钮</tw-button>
          </div>
          <div class="tw-space-x-4 tw-flex tw-flex-wrap">
            <tw-button plain>朴素按钮</tw-button>
            <tw-button type="primary" plain>主要按钮</tw-button>
            <tw-button type="success" plain>成功按钮</tw-button>
            <tw-button type="warning" plain>警告按钮</tw-button>
            <tw-button type="danger" plain>危险按钮</tw-button>
          </div>
        </div>
      </section>

      <!-- 圆角按钮 -->
      <section class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6">
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-6">圆角按钮</h2>
        <div class="tw-space-y-4">
          <div class="tw-space-x-4 tw-flex tw-flex-wrap">
            <tw-button round>圆角按钮</tw-button>
            <tw-button type="primary" round>主要按钮</tw-button>
            <tw-button type="success" round>成功按钮</tw-button>
            <tw-button type="warning" round>警告按钮</tw-button>
            <tw-button type="danger" round>危险按钮</tw-button>
          </div>
          <div class="tw-space-x-4 tw-flex tw-flex-wrap">
            <tw-button plain round>朴素按钮</tw-button>
            <tw-button type="primary" plain round>主要按钮</tw-button>
            <tw-button type="success" plain round>成功按钮</tw-button>
            <tw-button type="warning" plain round>警告按钮</tw-button>
            <tw-button type="danger" plain round>危险按钮</tw-button>
          </div>
        </div>
      </section>

      <!-- 禁用状态 -->
      <section class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6">
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-6">禁用状态</h2>
        <div class="tw-space-y-4">
          <div class="tw-space-x-4 tw-flex tw-flex-wrap">
            <tw-button disabled>禁用按钮</tw-button>
            <tw-button type="primary" disabled>主要按钮</tw-button>
            <tw-button type="success" disabled>成功按钮</tw-button>
            <tw-button type="warning" disabled>警告按钮</tw-button>
            <tw-button type="danger" disabled>危险按钮</tw-button>
          </div>
          <div class="tw-space-x-4 tw-flex tw-flex-wrap">
            <tw-button plain disabled>朴素按钮</tw-button>
            <tw-button type="primary" plain disabled>主要按钮</tw-button>
            <tw-button type="success" plain disabled>成功按钮</tw-button>
            <tw-button type="warning" plain disabled>警告按钮</tw-button>
            <tw-button type="danger" plain disabled>危险按钮</tw-button>
          </div>
        </div>
      </section>

      <!-- 加载状态 -->
      <section class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6">
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-6">加载状态</h2>
        <div class="tw-space-x-4 tw-flex tw-flex-wrap">
          <tw-button loading>加载中</tw-button>
          <tw-button type="primary" loading>加载中</tw-button>
          <tw-button type="success" loading>加载中</tw-button>
          <tw-button type="warning" loading>加载中</tw-button>
          <tw-button type="danger" loading>加载中</tw-button>
        </div>
      </section>

      <!-- 不同尺寸 -->
      <section class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6">
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-6">不同尺寸</h2>
        <div class="tw-space-x-4 tw-flex tw-flex-wrap">
          <tw-button size="large">大型按钮</tw-button>
          <tw-button>默认按钮</tw-button>
          <tw-button size="small">小型按钮</tw-button>
        </div>
      </section>

      <!-- 图标按钮 -->
      <section class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6">
        <h2 class="tw-text-2xl tw-font-semibold tw-mb-6">图标按钮</h2>
        <div class="tw-space-x-4 tw-flex tw-flex-wrap">
          <tw-button icon="plus">添加</tw-button>
          <tw-button type="primary" icon="plus">添加</tw-button>
        </div>
      </section>
    </div>

    <!-- API 文档 -->
    <section class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6 tw-mt-8">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-6">API</h2>
      
      <div class="tw-space-y-6">
        <div>
          <h3 class="tw-text-lg tw-font-medium tw-mb-4">属性</h3>
          <tw-table
            :columns="propsColumns"
            :data="propsData"
          />
        </div>

        <div>
          <h3 class="tw-text-lg tw-font-medium tw-mb-4">事件</h3>
          <tw-table
            :columns="eventsColumns"
            :data="eventsData"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

const propsColumns = [
  { key: 'name', title: '属性名' },
  { key: 'description', title: '说明' },
  { key: 'type', title: '类型', className: 'column-type' },
  { key: 'default', title: '默认值', className: 'column-default' }
]

const propsData = [
  {
    name: 'type',
    description: '按钮类型',
    type: '\'default\' | \'primary\' | \'success\' | \'warning\' | \'danger\'',
    default: '\'default\''
  },
  {
    name: 'size',
    description: '按钮尺寸',
    type: '\'small\' | \'default\' | \'large\'',
    default: '\'default\''
  },
  {
    name: 'plain',
    description: '是否为朴素按钮',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'round',
    description: '是否为圆角按钮',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'circle',
    description: '是否为圆形按钮',
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
    name: 'loading',
    description: '是否显示加载状态',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'icon',
    description: '图标名称',
    type: 'string',
    default: '-'
  },
  {
    name: 'iconPosition',
    description: '图标位置',
    type: '\'left\' | \'right\'',
    default: '\'left\''
  },
  {
    name: 'block',
    description: '是否为块级按钮',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'nativeType',
    description: '原生 type 属性',
    type: '\'button\' | \'submit\' | \'reset\'',
    default: '\'button\''
  }
]

const eventsColumns = [
  { key: 'name', title: '事件名' },
  { key: 'description', title: '说明' },
  { key: 'parameters', title: '参数', className: 'column-type' }
]

const eventsData = [
  {
    name: 'click',
    description: '点击按钮时触发',
    parameters: 'MouseEvent'
  }
]
</script>

<style>


</style> 