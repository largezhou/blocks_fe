import { pageData } from '@/components/editor/usePageData'
import { ComponentData } from '@/components/page-editor/types'
import { ComponentDefinition } from '@/types/vue'
import { componentMap } from '@/components/b-components'
import { GRID_HEIGHT, GRID_WIDTH } from '@/libs/consts'

export const componentDataList = pageData.components
export const addComponent = (data: ComponentData) => {
  componentDataList.push(data)
}
export const removeComponent = (index: number) => {
  componentDataList.splice(index, 1)
}

export const getComponentIndexById = (id: string): number => {
  return componentDataList.findIndex((component: ComponentData) => component.id === id)
}

export const getComponentById = (id: string): ComponentData | undefined => {
  return componentDataList[getComponentIndexById(id)]
}

// 通过页面上组件的 ID，查找组件的定义
export const getComponentDefById = (id?: string): ComponentDefinition | undefined => {
  if (!id) {
    return undefined
  }
  return componentMap[getComponentById(id)?.componentName as string]
}

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
    showName: d.showName as string,
    componentName: d.name,
    id: componentId(d.name),
    setting: {},
    width: d.minWidthUnit as number * GRID_WIDTH,
    height: d.minHeightUnit as number * GRID_HEIGHT,
    left: 0,
    top: 0,
  }
}
