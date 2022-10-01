import { ComponentPropsSettings } from '@/components/b-components/types'
import { EventSetting } from '@/components/event-editor/types'
import { hiddenActions } from '@/libs/utils'

export const settings: ComponentPropsSettings = {
  title: {
    label: '标题',
    componentName: 'AInput',
    value: '提示',
  },
  keyboard: {
    label: '点击 ESC 关闭',
    componentName: 'ACheckbox',
    valueName: 'checked',
    value: true,
  },
  maskClosable: {
    label: '点击空白区域关闭',
    componentName: 'ACheckbox',
    valueName: 'checked',
    value: true,
  },
}

export const eventSetting: EventSetting = {
  action: {
    ...hiddenActions(),
  },
}
