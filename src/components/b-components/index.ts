import BButton from '@/components/b-components/button/BButton.vue'
import BInput from '@/components/b-components/input/BInput.vue'
import BInterval from '@/components/b-components/interval/BInterval.vue'
import { ComponentDefinition } from '@/types/vue'
import { App } from 'vue'
import _groupBy from 'lodash/groupBy'
import { Dictionary } from '@/types/common'
import { ComponentData } from '@/components/page-editor/types'

export const components: ComponentDefinition[] = [
  BButton,
  BInput,
  BInterval,
]

/**
 * 有长宽的，属于 UI 组件，会在页面上显示出来
 *
 * @param data 组件配置数据
 */
export const componentHasUi = (data: ComponentData): boolean => {
  return data.width > 0 && data.height > 0
}

/**
 * 按分类分组后的组件
 */
export const groupComponents: Dictionary<ComponentDefinition[]> = _groupBy(components, (component) => {
  return component.category?.trim() || '其他'
})

export default (app: App) => {
  components.forEach((x) => {
    if (!x.showName || x.minWidthUnit === undefined || x.minHeightUnit === undefined) {
      throw new Error('组件必须要有 `showName`, `minWidthUnit`, `minHeightUnit` 属性')
    }

    app.component(x.name, x)
  })
}
