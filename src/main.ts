import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'virtual:svg-icons-register'

const app = createApp(App)

console.log(import.meta.env)

app.use(Antd)

app.mount('#app')

if (import.meta.env.VITE_ENV !== 'production') {
  window.vueApp = app
}
