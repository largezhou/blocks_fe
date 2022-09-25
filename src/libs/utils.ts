import { ComponentDefinition } from '@/types/vue'
import { ComponentData } from '@/components/page-editor/types'
import { GRID_HEIGHT, GRID_WIDTH } from '@/libs/consts'
import { SelectOptions } from '@/types/common'
import { componentMap } from '@/components/b-components'

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

export const getComponentIndexById = (list: ComponentData[], id: string): number => {
  return list.findIndex((component: ComponentData) => component.id === id)
}

export const getComponentById = (list: ComponentData[], id: string): ComponentData | undefined => {
  return list[getComponentIndexById(list, id)]
}

// 通过页面上组件的 ID，查找组件的定义
export const getComponentDefById = (list: ComponentData[], id?: string): ComponentDefinition | undefined => {
  if (!id) {
    return undefined
  }
  return componentMap[getComponentById(list, id)?.componentName as string]
}

// 获取组件的下拉选择选项
export const getComponentSelectOptions = (list: ComponentData[]): SelectOptions<string> => {
  return list.map((data) => ({ label: data.showName, value: data.id }))
}

export const safeJsonParse = (text?: string | null, defaultVal?: any) => {
  try {
    return JSON.parse(text as string)
  } catch (e) {
    console.warn(e)
    return defaultVal
  }
}

export const selectFilterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
