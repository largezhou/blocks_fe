// 位置
export interface Position {
  left: number
  top: number
}

// 大小
export interface Size {
  width: number
  height: number
}

// 位置和大小
export type Space = Position & Size

// 页面上组件的配置信息
export type ComponentData = {
  // 组件名
  name: string
  // 唯一 ID
  id: string
  // 组件的配置
  setting: Record<string, unknown>
  // 图标，没有 UI 的组件，在编辑器里展示为图标
  icon?: string
} & Space
