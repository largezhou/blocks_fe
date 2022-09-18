import { ComponentDefinition } from '@/types/vue'
import { ComponentData } from '@/components/page-editor/types'
import { GRID_HEIGHT, GRID_WIDTH } from '@/libs/consts'

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
    showName: d.name,
    componentName: d.name,
    id: componentId(d.name),
    setting: {},
    width: d.minWidthUnit as number * GRID_WIDTH,
    height: d.minHeightUnit as number * GRID_HEIGHT,
    left: 0,
    top: 0,
  }
}
