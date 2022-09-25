/**
 * 这里是编辑器里组件的配置项所用到的组件
 */

import { App } from 'vue'
import { ComponentDefinition } from '@/types/vue'

import SDataSource from '@/components/s-components/data-source/SDataSource.vue'

const components: ComponentDefinition[] = [
  SDataSource,
]

export default (app: App) => {
  components.forEach((x) => {
    app.component(x.name, x)
  })
}
