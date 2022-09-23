import { ComponentPropsSettings } from '@/components/b-components/types'
import { EventSetting } from '@/components/event-editor/types'

export const settings: ComponentPropsSettings = {
  time: {
    label: '时间间隔（毫秒）',
    componentName: 'AInputNumber',
    value: 1000,
    setting: {
      min: 1,
    },
  },
}

export const eventSetting: EventSetting = {
  trigger: {
    interval: {
      showName: '定时执行',
      event: 'interval',
    },
  },
}
