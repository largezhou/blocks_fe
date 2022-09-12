import { DefineComponent } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    /**
     * 组件展示的名称
     * 编辑器上的组件必填
     */
    showName?: string,
    /**
     * 组件占用的最小宽度单元
     * 编辑器上的组件必填，非 UI 组件填 0
     */
    minWidthUnit?: number
    /**
     * 组件占用的最小高度单元
     * 编辑器上的组件必填，非 UI 组件填 0
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
    /**
     * 组件分类
     */
    category?: string
  }

  interface ComponentCustomProperties {
    $log: typeof console.log
  }
}

/**
 * 导入组件的类型，为什么会是这样？瞎试的呗，既能满足 IDE 的识别，也能通过 vue-tsc
 */
export type ComponentDefinition = DefineComponent<any, any, any, any, any, any, any, any>
