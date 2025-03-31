<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Tabs 标签页</h1>
    
    <div class="space-y-8">
      <!-- 基础用法 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">基础用法</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-tabs v-model="basicValue">
              <tw-tab-pane label="标签1" name="1">标签1的内容</tw-tab-pane>
              <tw-tab-pane label="标签2" name="2">标签2的内容</tw-tab-pane>
              <tw-tab-pane label="标签3" name="3">标签3的内容</tw-tab-pane>
            </tw-tabs>
            <span class="text-gray-600">当前标签：{{ basicValue }}</span>
          </div>
        </div>
      </section>

      <!-- 卡片样式 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">卡片样式</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-tabs v-model="cardValue" type="card">
              <tw-tab-pane label="标签1" name="1">标签1的内容</tw-tab-pane>
              <tw-tab-pane label="标签2" name="2">标签2的内容</tw-tab-pane>
              <tw-tab-pane label="标签3" name="3">标签3的内容</tw-tab-pane>
            </tw-tabs>
            <span class="text-gray-600">当前标签：{{ cardValue }}</span>
          </div>
        </div>
      </section>

      <!-- 边框卡片样式 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">边框卡片样式</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-tabs v-model="borderCardValue" type="border-card">
              <tw-tab-pane label="标签1" name="1">标签1的内容</tw-tab-pane>
              <tw-tab-pane label="标签2" name="2">标签2的内容</tw-tab-pane>
              <tw-tab-pane label="标签3" name="3">标签3的内容</tw-tab-pane>
            </tw-tabs>
            <span class="text-gray-600">当前标签：{{ borderCardValue }}</span>
          </div>
        </div>
      </section>

      <!-- 可关闭 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">可关闭</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-tabs v-model="closableValue" closable>
              <tw-tab-pane label="标签1" name="1">标签1的内容</tw-tab-pane>
              <tw-tab-pane label="标签2" name="2">标签2的内容</tw-tab-pane>
              <tw-tab-pane label="标签3" name="3">标签3的内容</tw-tab-pane>
            </tw-tabs>
            <span class="text-gray-600">当前标签：{{ closableValue }}</span>
          </div>
        </div>
      </section>

      <!-- 禁用状态 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">禁用状态</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-tabs v-model="disabledValue">
              <tw-tab-pane label="标签1" name="1">标签1的内容</tw-tab-pane>
              <tw-tab-pane label="标签2" name="2" disabled>标签2的内容</tw-tab-pane>
              <tw-tab-pane label="标签3" name="3">标签3的内容</tw-tab-pane>
            </tw-tabs>
            <span class="text-gray-600">当前标签：{{ disabledValue }}</span>
          </div>
        </div>
      </section>

      <!-- 自定义标签 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">自定义标签</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <tw-tabs v-model="customValue">
              <tw-tab-pane name="1">
                <template #label>
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                    </svg>
                    <span>标签1</span>
                  </div>
                </template>
                标签1的内容
              </tw-tab-pane>
              <tw-tab-pane name="2">
                <template #label>
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>标签2</span>
                  </div>
                </template>
                标签2的内容
              </tw-tab-pane>
            </tw-tabs>
            <span class="text-gray-600">当前标签：{{ customValue }}</span>
          </div>
        </div>
      </section>
    </div>

    <!-- API 文档 -->
    <div class="mt-12">
      <h2 class="text-2xl font-semibold mb-4">API</h2>
      <div class="bg-gray-50 rounded-lg p-6">
        <h3 class="text-xl font-medium mb-4">Tabs Props</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">参数</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">默认值</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">type</td>
                <td class="px-6 py-4 text-sm text-gray-500">标签页的类型</td>
                <td class="px-6 py-4 text-sm text-gray-500">'line' | 'card' | 'border-card'</td>
                <td class="px-6 py-4 text-sm text-gray-500">'line'</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">closable</td>
                <td class="px-6 py-4 text-sm text-gray-500">是否可关闭</td>
                <td class="px-6 py-4 text-sm text-gray-500">boolean</td>
                <td class="px-6 py-4 text-sm text-gray-500">false</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">stretch</td>
                <td class="px-6 py-4 text-sm text-gray-500">标签是否自撑开</td>
                <td class="px-6 py-4 text-sm text-gray-500">boolean</td>
                <td class="px-6 py-4 text-sm text-gray-500">false</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-xl font-medium mt-8 mb-4">TabPane Props</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">参数</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">默认值</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">label</td>
                <td class="px-6 py-4 text-sm text-gray-500">标签的标题</td>
                <td class="px-6 py-4 text-sm text-gray-500">string</td>
                <td class="px-6 py-4 text-sm text-gray-500">-</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">name</td>
                <td class="px-6 py-4 text-sm text-gray-500">标签的标识</td>
                <td class="px-6 py-4 text-sm text-gray-500">string | number</td>
                <td class="px-6 py-4 text-sm text-gray-500">-</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">disabled</td>
                <td class="px-6 py-4 text-sm text-gray-500">是否禁用</td>
                <td class="px-6 py-4 text-sm text-gray-500">boolean</td>
                <td class="px-6 py-4 text-sm text-gray-500">false</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-xl font-medium mt-8 mb-4">Slots</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">插槽名</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">default</td>
                <td class="px-6 py-4 text-sm text-gray-500">标签页的内容</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">label</td>
                <td class="px-6 py-4 text-sm text-gray-500">自定义标签页的内容</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref('1')
const cardValue = ref('1')
const borderCardValue = ref('1')
const closableValue = ref('1')
const disabledValue = ref('1')
const customValue = ref('1')
</script> 