import { KeyValue } from '@/types/common'
import { SettingAction } from '@/components/event-editor/types'
import { ComponentData } from '@/components/page-editor/types'
import { ComponentPropsSettings } from '@/components/b-components/types'

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

/**
 * 获取通用的控制显隐的动作
 */
export const hiddenActions = (): KeyValue<SettingAction> => {
  return {
    setToHidden: {
      showName: '设置为隐藏',
      prop: 'hidden',
      value: true,
    },
    setToShow: {
      showName: '设置为显示',
      prop: 'hidden',
      value: false,
    },
  }
}

/**
 * 获取通用的控制显隐的 prop 配置
 */
export const hiddenSettings = (): ComponentPropsSettings => {
  return {
    hidden: {
      label: '隐藏',
      componentName: 'ACheckbox',
      valueName: 'checked',
      value: false,
    },
  }
}

/**
 * 有长宽的，属于 UI 组件，会在页面上显示出来
 *
 * @param data 组件配置数据
 */
export const componentHasUi = (data: ComponentData): boolean => {
  return data.width > 0 && data.height > 0
}
