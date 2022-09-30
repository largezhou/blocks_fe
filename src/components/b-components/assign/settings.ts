import { ComponentPropsSettings } from '@/components/b-components/types'
import { EventSetting } from '@/components/event-editor/types'
import { AssignValueFlow } from '@/libs/consts'

export const settings: ComponentPropsSettings = {
  out: {
    label: '数据源',
    componentName: 'SDataSource',
    value: undefined,
    setting: {
      flow: AssignValueFlow.OUT,
    },
  },
  in: {
    label: '赋值到',
    componentName: 'SDataSource',
    value: undefined,
    setting: {
      flow: AssignValueFlow.IN,
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
