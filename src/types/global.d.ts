import { App } from 'vue'

declare global {
  interface Window {
    vueApp: App<Element>
  }
}
