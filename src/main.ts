import { createApp } from 'vue'
import App from '@/App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'virtual:svg-icons-register'
import '@/styles/index.less'

const app = createApp(App)

app.use(Antd)
  .mount('#app')

if (import.meta.env.VITE_ENV !== 'production') {
  window.vueApp = app
}
