import { SettingAction } from '@/components/event-editor/types'
import { KeyValue } from '@/types/common'

export const commonActions: KeyValue<KeyValue<SettingAction>> = {
  // 控制显示隐藏
  controlHidden: {
    changeHiddenToTrue: {
      showName: '隐藏',
      prop: 'controlHidden',
      value: true,
    },
    changeHiddenToFalse: {
      showName: '显示',
      prop: 'controlHidden',
      value: false,
    },
  },
}
