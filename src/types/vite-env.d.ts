/// <reference types="vite/client" />

declare module '*.vue' {
  import { ComponentDefinition } from '@/types/vue'
  const component: ComponentDefinition
  export default component
}

interface ImportMetaEnv {
  readonly VITE_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
