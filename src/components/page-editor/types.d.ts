import  { MOVE_TYPE_MOVE, MOVE_TYPE_RESIZE, MOVE_TYPE_NEW } from '@/libs/consts'

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

// 页面上组件的配置信息，持久化用
export type ComponentData = {
  // 组件名
  name: string
  // 唯一 ID
  id: string
  // 组件的配置
  setting: Record<string, unknown>
} & Space

export type MovingType = MOVE_TYPE_MOVE | MOVE_TYPE_RESIZE | MOVE_TYPE_NEW | null
