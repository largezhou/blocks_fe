import { KeyValue } from '@/types/common'
import { AssignValueFlow, AssignValueType } from '@/libs/consts'

export interface SettingAction {
  showName: string
  // 修改的 prop 名
  prop?: string
  // 没有配置表示可赋值
  value?: unknown
  method?: string
}

export interface SettingTrigger {
  showName: string
  event: string
}

export interface SettingAssign {
  showName: string
  flow: AssignValueFlow
  type: AssignValueType
}

export interface EventSetting {
  action?: KeyValue<SettingAction>
  trigger?: KeyValue<SettingTrigger>
  assign?: KeyValue<SettingAssign>
}

interface DataTrigger {
  id: string
  event: string
}

interface DataAction {
  id: string
  action: string
}

export interface EventData {
  trigger: DataTrigger
  action: DataAction
}
