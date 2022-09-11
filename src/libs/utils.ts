import { ComponentDefinition } from '@/types/vue'
import { ComponentData } from '@/components/page-editor/types'

export const componentId = (name: string) => {
  return `${name}-${Math.random().toString(36).slice(-8)}`
}

/**
 * 把组件的定义转成一个初始化的组件配置
 *
 * @param d 组件定义
 */
export const definitionToData = (d: ComponentDefinition): ComponentData => {
  return {
    name: d.name,
    id: componentId(d.name),
    setting: {},
    icon: d.icon,
    width: d.minWidthUnit || 0,
    height: d.minHeightUnit || 0,
    left: 0,
    top: 0,
  }
}
