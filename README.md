# TW-UI 组件库

一个基于Vue 3和Tailwind CSS的现代化UI组件库。

## 特性

- 🚀 基于Vue 3和Tailwind CSS
- 📦 丰富的组件集合
- 🎨 可定制的主题
- 📱 响应式设计
- 🌐 国际化支持
- ♿ 可访问性支持

## 安装

```bash
npm install tw-ui
```

## 使用

### 全局引入

在你的main.ts/js文件中：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import TwUI from 'tw-ui'
// 重要：导入样式
import 'tw-ui/dist/styles/index.css'

const app = createApp(App)
app.use(TwUI)
app.mount('#app')
```

### 按需引入

```vue
<template>
  <TwButton type="primary">按钮</TwButton>
</template>

<script setup lang="ts">
import { TwButton } from 'tw-ui'
// 重要：导入样式
import 'tw-ui/dist/styles/index.css'
</script>
```

## 组件列表

- Alert 警告提示
- Avatar 头像
- Badge 徽章
- Breadcrumb 面包屑
- Button 按钮
- Card 卡片
- Checkbox 复选框
- Dialog 对话框
- Form 表单
- Input 输入框
- Modal 模态框
- Pagination 分页
- Radio 单选框
- Select 选择器
- Switch 开关
- Table 表格
- Tabs 标签页
- Textarea 文本域
- Tooltip 文字提示
- Upload 上传

## 文档

访问我们的[在线文档](https://tw-ui.example.com)了解更多信息。

## 贡献

欢迎贡献代码，提交问题和功能请求。

## 许可证

[MIT](LICENSE)
