/**
 * 这里是编辑器里所有可用的组件
 */

import BButton from '@/components/b-components/button/BButton.vue'
import BInput from '@/components/b-components/input/BInput.vue'
import BInterval from '@/components/b-components/interval/BInterval.vue'
import BTimeout from '@/components/b-components/timeout/BTimeout.vue'
import BContent from '@/components/b-components/content/BContent.vue'
import BAssign from '@/components/b-components/assign/BAssign.vue'
import BRequest from '@/components/b-components/request/BRequest.vue'
import BModal from '@/components/b-components/modal/BModal.vue'
import { ComponentDefinition } from '@/types/vue'
import { App } from 'vue'
import _groupBy from 'lodash/groupBy'
import BComponentNotExists from '@/components/b-components/component-not-exists/BComponentNotExists.vue'
import { KeyValue } from '@/types/common'

export const componentMap: KeyValue<ComponentDefinition | undefined> = {
  BButton,
  BInput,
  BInterval,
  BTimeout,
  BContent,
  BAssign,
  BRequest,
  BModal,
}

export const components: ComponentDefinition[] = Object.values(componentMap as KeyValue<ComponentDefinition>)

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
