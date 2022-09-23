import { ComponentPropsSettings } from '@/components/b-components/types'
import { EventSetting } from '@/components/event-editor/types'

export const settings: ComponentPropsSettings = {
  time: {
    label: '延迟（毫秒）',
    componentName: 'AInputNumber',
    value: 1000,
    setting: {
      min: 0,
    },
  },
}

export const eventSetting: EventSetting = {
  action: {
    startTimeout: {
      showName: '开始倒计时',
      method: 'startTimeout',
    },
  },
  trigger: {
    timeout: {
      showName: '倒计时结束',
      event: 'timeout',
    },
  },
}
