import { ComponentPropsSettings } from '@/components/b-components/types'
import { EventSetting } from '@/components/event-editor/types'
import { AssignValueFlow, AssignValueType } from '@/libs/consts'

export const settings: ComponentPropsSettings = {
  value: {
    label: '内容',
    componentName: 'ATextarea',
    value: undefined,
    setting: {
      rows: 6,
      allowClear: true,
    },
  },
  isJson: {
    label: '是否是 JSON',
    componentName: 'ACheckbox',
    valueName: 'checked',
    value: true,
    extra: '如果是 JSON，赋值前会执行 JSON.parse',
  },
}

export const eventSetting: EventSetting = {
  assign: {
    inputValue: {
      showName: '值',
      flow: AssignValueFlow.OUT,
      type: AssignValueType.DATA,
    },
  },
}
