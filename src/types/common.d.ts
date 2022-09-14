export type Dictionary<T> = {
  [key: string]: T
}

interface Option {
  value: string,
  text: string,
}

interface ASelectSetting {
  options: Option[]
}

/**
 * 组件的配置项
 */
export interface ComponentSetting {
  /**
   * 表单组件显示名称
   */
  label: string
  /**
   * 组件名，比如：AInput，ASelect
   */
  componentName: string,
  /**
   * 对应组件的 props 属性，比如 BButton 的 text，type
   */
  propsName: string,
  /**
   * 组件默认值
   */
  value: any,
  /**
   * 组件的其他配置项，比如 ASelect 的 Option 之类的
   */
  setting?: ASelectSetting,
}
