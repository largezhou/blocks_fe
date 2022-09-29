import { ComponentPropsSettings } from '@/components/b-components/types'
import { EventSetting } from '@/components/event-editor/types'
import { AssignValueType } from '@/libs/consts'

export const settings: ComponentPropsSettings = {
  in: {
    label: '数据源',
    componentName: 'SDataSource',
    value: undefined,
    setting: {
      type: AssignValueType.OUT,
    },
  },
  out: {
    label: '赋值到',
    componentName: 'SDataSource',
    value: undefined,
    setting: {
      type: AssignValueType.IN,
    },
  },
}

export const eventSetting: EventSetting = {
  action: {
    assign: {
      showName: '赋值',
      method: 'assign',
    },
  },
}
