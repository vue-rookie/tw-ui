// UI Components
import TwAlert from './ui/Alert.vue'
import TwAvatar from './ui/Avatar.vue'
import TwBadge from './ui/Badge.vue'
import TwBreadcrumb from './ui/Breadcrumb.vue'
import TwBreadcrumbItem from './ui/BreadcrumbItem.vue'
import TwBreadcrumbLink from './ui/BreadcrumbLink.vue'
import TwButton from './ui/Button.vue'
import TwCard from './ui/Card.vue'
import TwCardContent from './ui/CardContent.vue'
import TwCardDescription from './ui/CardDescription.vue'
import TwCardFooter from './ui/CardFooter.vue'
import TwCardHeader from './ui/CardHeader.vue'
import TwCardTitle from './ui/CardTitle.vue'
import TwCheckbox from './ui/Checkbox.vue'
import TwInput from './ui/Input.vue'
import TwModal from './ui/Modal.vue'
import TwOption from './ui/Option.vue'
import TwPagination from './ui/Pagination.vue'
import TwRadio from './ui/Radio.vue'
import TwSelect from './ui/Select.vue'
import TwSwitch from './ui/Switch.vue'
import TwTabPanel from './ui/TabPanel.vue'
import TwTabs from './ui/Tabs.vue'
import TwTextarea from './ui/Textarea.vue'
import TwTooltip from './ui/Tooltip.vue'

import type { App } from 'vue'

// Export all components
export {
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
  TwOption,
  TwPagination,
  TwRadio,
  TwSelect,
  TwSwitch,
  TwTabPanel,
  TwTabs,
  TwTextarea,
  TwTooltip,
}

// Export Vue plugin
export function install(app: App) {
  app.component('TwAlert', TwAlert)
  app.component('TwAvatar', TwAvatar)
  app.component('TwBadge', TwBadge)
  app.component('TwBreadcrumb', TwBreadcrumb)
  app.component('TwBreadcrumbItem', TwBreadcrumbItem)
  app.component('TwBreadcrumbLink', TwBreadcrumbLink)
  app.component('TwButton', TwButton)
  app.component('TwCard', TwCard)
  app.component('TwCardContent', TwCardContent)
  app.component('TwCardDescription', TwCardDescription)
  app.component('TwCardFooter', TwCardFooter)
  app.component('TwCardHeader', TwCardHeader)
  app.component('TwCardTitle', TwCardTitle)
  app.component('TwCheckbox', TwCheckbox)
  app.component('TwInput', TwInput)
  app.component('TwModal', TwModal)
  app.component('TwOption', TwOption)
  app.component('TwPagination', TwPagination)
  app.component('TwRadio', TwRadio)
  app.component('TwSelect', TwSelect)
  app.component('TwSwitch', TwSwitch)
  app.component('TwTabPanel', TwTabPanel)
  app.component('TwTabs', TwTabs)
  app.component('TwTextarea', TwTextarea)
  app.component('TwTooltip', TwTooltip)
}

export default {
  install
} 