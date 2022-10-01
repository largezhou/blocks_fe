import { ComponentPropsSettings } from '@/components/b-components/types'
import { EventSetting } from '@/components/event-editor/types'
import { hiddenActions, hiddenSettings } from '@/libs/utils'

export const settings: ComponentPropsSettings = {
  text: {
    label: '文本',
    componentName: 'AInput',
    value: '按钮',
  },
  type: {
    label: '颜色',
    componentName: 'ASelect',
    value: 'primary',
    setting: {
      options: [
        {
          value: 'primary',
          label: '主要',
        },
        {
          value: 'default',
          label: '默认',
        },
        {
          value: 'text',
          label: '文本',
        },
      ],
    },
  },
  ...hiddenSettings(),
  danger: {
    label: '设置为危险按钮',
    componentName: 'ACheckbox',
    valueName: 'checked',
    value: false,
  },
  disabled: {
    label: '禁用',
    componentName: 'ACheckbox',
    valueName: 'checked',
    value: false,
  },
}

export const eventSetting: EventSetting = {
  action: {
    ...hiddenActions(),
    changeDisabledToTrue: {
      showName: '设置为禁用',
      prop: 'disabled',
      value: true,
    },
    changeDisabledToFalse: {
      showName: '设置为可用',
      prop: 'disabled',
      value: false,
    },
  },
  trigger: {
    click: {
      showName: '点击',
      event: 'click',
    },
  },
}

