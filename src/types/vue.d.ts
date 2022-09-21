import { DefineComponent } from 'vue'
import { ComponentPropsSettings } from '@/components/b-components/types'
import { EventSetting } from '@/components/event-editor/types'

declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    /**
     * 组件展示的名称
     * 编辑器上的组件必填
     */
    showName?: string,
    /**
     * 组件配置中的 showName 如果不填，则取该 prop 的值
     * 如果组件配置中的 showName 没填，并且 showNameAs 不存在
     * 则显示为组件定义中的 showName
     *
     * 编辑器上的组件必填
     */
    showNameAs?: string,
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
    /**
     * 组件的配置项描述
     */
    settings?: ComponentPropsSettings
    /**
     * 事件的进出描述
     */
    eventSetting?: EventSetting
  }

  interface ComponentCustomProperties {
    $log: typeof console.log
  }
}

/**
 * 导入组件的类型，为什么会是这样？瞎试的呗，既能满足 IDE 的识别，也能通过 vue-tsc
 */
export type ComponentDefinition = DefineComponent<any, any, any, any, any, any, any, any>
