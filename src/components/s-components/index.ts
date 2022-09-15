/**
 * 这里是编辑器里组件的配置项所用到的组件
 */

import { App } from 'vue'
import { ComponentDefinition } from '@/types/vue'

const components: ComponentDefinition[] = []

export default (app: App) => {
  components.forEach((x) => {
    app.component(x.name, x)
  })
}
