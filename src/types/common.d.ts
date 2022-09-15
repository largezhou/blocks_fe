export type Dictionary<T> = {
  [key: string]: T
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
   * 组件中传递值的 props 名，默认为 value，比如单个 checkbox 的该值应该为 checked
   */
  valueName?: string,
  /**
   * 组件默认值
   */
  value: any,
  /**
   * 组件的其他配置项，比如 ASelect 的 Option 之类的
   * @see https://www.antdv.com/components/overview-cn
   */
  setting?: Record<string, unknown>,
}
