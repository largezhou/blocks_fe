/**
 * 这里是编辑器里所有可用的组件
 */

import BButton from '@/components/b-components/button/BButton.vue'
import BInput from '@/components/b-components/input/BInput.vue'
import BInterval from '@/components/b-components/interval/BInterval.vue'
import BTimeout from '@/components/b-components/timeout/BTimeout.vue'
import BContent from '@/components/b-components/content/BContent.vue'
import BAssign from '@/components/b-components/assign/BAssign.vue'
import { ComponentDefinition } from '@/types/vue'
import { App } from 'vue'
import _groupBy from 'lodash/groupBy'
import { ComponentData } from '@/components/page-editor/types'
import BComponentNotExists from '@/components/b-components/component-not-exists/BComponentNotExists.vue'
import { KeyValue } from '@/types/common'

export const componentMap: KeyValue<ComponentDefinition | undefined> = {
  BButton,
  BInput,
  BInterval,
  BTimeout,
  BContent,
  BAssign,
}

export const components: ComponentDefinition[] = Object.values(componentMap as KeyValue<ComponentDefinition>)

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
export const groupComponents: KeyValue<ComponentDefinition[]> = _groupBy(components, (component) => {
  return component.category?.trim() || '其他'
})

export default (app: App) => {
  components.forEach((x) => {
    if (!x.showName || x.minWidthUnit === undefined || x.minHeightUnit === undefined) {
      throw new Error('组件必须要有 `showName`, `minWidthUnit`, `minHeightUnit` 属性')
    }

    app.component(x.name, x)
  })

  app.component(BComponentNotExists.name, BComponentNotExists)
}
