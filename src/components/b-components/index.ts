import BButton from '@/components/b-components/button/BButton.vue'
import BInput from '@/components/b-components/input/BInput.vue'
import { TComponent } from '@/types/vue'
import { App } from 'vue'

export const uiComponents: TComponent[] = [
  BButton,
  BInput,
]

export default (app: App) => {
  uiComponents.forEach((x) => {
    if (typeof x.name === 'string') {
      app.component(x.name, x)
    }
  })
}
