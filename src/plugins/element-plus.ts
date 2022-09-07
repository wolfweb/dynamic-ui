import { App, Component } from 'vue'
import 'element-plus/dist/index.css'
import { ElIcons } from '@/models/common'
import {
  ElAffix,
  ElSkeleton,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElScrollbar,
  ElSubMenu,
  ElButton,
  ElCol,
  ElRow,
  ElSpace,
  ElDivider,
  ElCard,
  ElDropdown,
  ElDialog,
  ElMenu,
  ElMenuItem,
  ElMessageBox,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElInput,
  ElForm,
  ElFormItem,
  ElLoading,
  ElPopover,
  ElPopper,
  ElTooltip,
  ElDrawer,
  ElPagination,
  ElAlert,
  ElTabs,
  ElTabPane,
  ElRadioButton,
  ElRadioGroup,
  ElInfiniteScroll
} from 'element-plus'

const components = [
  ElAffix,
  ElSkeleton,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElScrollbar,
  ElSubMenu,
  ElButton,
  ElCol,
  ElRow,
  ElSpace,
  ElDivider,
  ElCard,
  ElDropdown,
  ElDialog,
  ElMenu,
  ElMenuItem,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElInput,
  ElForm,
  ElFormItem,
  ElPopover,
  ElPopper,
  ElTooltip,
  ElDrawer,
  ElPagination,
  ElAlert,
  ElTabs,
  ElTabPane,
  ElRadioButton,
  ElRadioGroup
]

const plugins = [ElLoading, ElInfiniteScroll]

export function initElementPlus(app: App) {
  components.forEach((component: Component) => {
    app.component(component.name!, component)
  })

  Object.keys(ElIcons).forEach(key => {
    app.component(key, ElIcons[key as keyof typeof ElIcons])
  })

  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}
