const KEY = 'isEditMode'

// 如果是编辑模式，则返回默认值，否则返回原始值
export const editModeValue = <T>(editModeVal: T, realVal?: T): T | undefined => {
  return inject<boolean>(KEY) ? editModeVal : realVal
}

export const provideIsEditMode = () => {
  provide(KEY, true)
}
