import { DefineComponent } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    /**
     * 组件展示的名称
     */
    showName?: string,
    /**
     * 组件占用的最小宽度单元
     */
    minWidthUnit?: number
    /**
     * 组件占用的最小高度单元
     */
    minHeightUnit?: number
    /**
     * 是否是容器类组件，比如表单，弹框
     */
    isContainer?: boolean
    /**
     * 组件展示的图标
     */
    icon?: string
  }
}

/**
 * 导入组件的类型，为什么会是这样？瞎试的呗，既能满足 IDE 的识别，也能通过 vue-tsc
 */
export type TComponent = DefineComponent<any, any, any, any, any, any, any, any>
