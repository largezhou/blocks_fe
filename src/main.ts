import { createApp } from 'vue'
import App from '@/App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'virtual:svg-icons-register'
import '@/styles/index.less'
import UIComponents from '@/components/b-components'
import SettingComponent from '@/components/s-components'

const app = createApp(App)

app.use(Antd)
  .use(UIComponents)
  .use(SettingComponent)
  .mount('#app')

if (import.meta.env.VITE_ENV !== 'production') {
  window.vueApp = app
  app.config.globalProperties.$log = console.log.bind(console)
}
