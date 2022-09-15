/**
 * 一些简单的组件，可以直接设定一些默认的 props 即可，否则得重新封装
 */

interface Defaults {
  // 使用重新封装的组件代替
  replace?: string

  // 其他 props 的值
  [key: string]: any
}

const defaults: Record<string, Defaults> = {
  ASelect: {},
  ACheckbox: {},
  AInput: {
    allowClear: true,
  },
}

export const getDefaults = (name: string) => {
  return { ...defaults[name] } || {}
}
