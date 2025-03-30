import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// 导入组件
import Button from './components/ui/Button.vue'
import Input from './components/ui/Input.vue'
import Form from './components/ui/Form.vue'
import FormItem from './components/ui/FormItem.vue'
import Select from './components/ui/Select.vue'
import Dialog from './components/ui/Dialog.vue'
import Tabs from './components/ui/Tabs.vue'
import TabPane from './components/ui/TabPane.vue'
import Radio from './components/ui/Radio.vue'
import Checkbox from './components/ui/Checkbox.vue'
import Table from './components/ui/Table.vue'

// 创建应用实例
const app = createApp(App)

// 注册组件
app.component('tw-button', Button)
app.component('tw-input', Input)
app.component('tw-form', Form)
app.component('tw-form-item', FormItem)
app.component('tw-select', Select)
app.component('tw-dialog', Dialog)
app.component('tw-tabs', Tabs)
app.component('tw-tab-pane', TabPane)
app.component('tw-radio', Radio)
app.component('tw-checkbox', Checkbox)
app.component('tw-table', Table)
// 使用路由
app.use(router)

// 挂载应用
app.mount('#app')
