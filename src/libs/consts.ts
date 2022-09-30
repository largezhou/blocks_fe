/**
 * 惰性移动距离，只有拖动移动超过这个值，才会开始拖动
 * 避免只是想点击选中组件时，就发生移动，产生“抖动”现象
 */
export const LAZY_DELTA = 8

/**
 * 单元格宽度
 */
export const GRID_WIDTH = 38

export const MIN_WIDTH_UNIT = 2

/**
 * 单元格高度
 */
export const GRID_HEIGHT = 23

export const MIN_HEIGHT_UNIT = 2

// 编辑器位置
export const EDITOR_LEFT = 240

// 编辑器位置
export const EDITOR_TOP = 112

// 拖动时，鼠标指针相对于组件左上角的偏移
export const DRAGGING_MOUSE_OFFSET = 10

// 拖动时的动作类型
export enum MovingType {
  MOVE = 'move',
  RESIZE = 'resize',
  NEW = 'new',
}

// 编辑器模式
export enum EditorMode {
  PAGE = 'page',
  EVENT = 'event',
  TESTER = 'tester',
}

// 组件提供的值的流向
export enum AssignValueFlow {
  /**
   * 只能被其他组件赋值
   */
  IN = 'in',
  /**
   * 只能赋值给其他组件
   */
  OUT = 'out',
  /**
   * 可以赋值也可以被赋值
   */
  BOTH = 'both',
}

// 组件提供的值的类型
export enum AssignValueType {
  /**
   * prop 值，通过 update:prop 更新
   */
  PROP = 'prop',
  /**
   * 组件实例数据，需要通过 defineExpose 暴露
   */
  DATA = 'data',
}
