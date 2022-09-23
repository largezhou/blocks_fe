import { KeyValue } from '@/types/common'

export interface SettingAction {
  showName: string,
  // 修改的 prop 名
  prop?: string,
  // 没有配置表示可赋值
  value?: unknown,
  method?: string,
}

interface SettingTrigger {
  showName: string,
  event: string,
}

export interface EventSetting {
  action?: KeyValue<SettingAction>
  trigger?: KeyValue<SettingTrigger>
}

interface DataTrigger {
  id: string,
  event: string,
}

interface DataAction {
  id: string,
  action: string,
}

export interface EventData {
  trigger: DataTrigger,
  action: DataAction,
}
