# TW UI

一个基于 Vue 3 和 Tailwind CSS 构建的 UI 组件库。

## 安装

```bash
npm install tw-ui
```

## 使用方法

### 全局注册

```typescript
import { createApp } from 'vue'
import TwUI from 'tw-ui'
import 'tw-ui/dist/style.css'

const app = createApp(App)
app.use(TwUI)
app.mount('#app')
```

### 按需引入

```vue
<template>
  <tw-button>点击我</tw-button>
</template>

<script setup lang="ts">
import { TwButton } from 'tw-ui'
import 'tw-ui/dist/style.css'
</script>
```

### Tailwind CSS 配置

在你的项目中，需要确保 Tailwind CSS 配置文件包含以下设置：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/tw-ui/**/*.{vue,js,ts,jsx,tsx}"  // 添加这一行
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  prefix: 'tw-',  // 确保添加这个前缀
}
```

## 组件列表

- TwAlert
- TwAvatar
- TwBadge
- TwBreadcrumb
- TwButton
- TwCard
- TwCheckbox
- TwInput
- TwModal
- TwPagination
- TwRadio
- TwSelect
- TwSwitch
- TwTabs
- TwTextarea
- TwTooltip

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建组件库
npm run build
```

## License

MIT
