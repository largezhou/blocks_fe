const KEY = 'isEditMode'

/**
 * 编辑模式下，组件的有些状态可能不想跟着设置走，比如显示隐藏。
 * 所以可以使用该方法提供一个编辑模式下的固定值
 *
 * @param editModeVal 在编辑模式下，固定为该值
 * @param realVal 不在编辑模式下，提供该值，一般是 prop
 */
export const valueForEditMode = <T>(editModeVal: T, realVal?: T): T | undefined => {
  return inject<boolean>(KEY, false) ? editModeVal : realVal
}

export const provideIsEditMode = () => {
  provide(KEY, true)
}
