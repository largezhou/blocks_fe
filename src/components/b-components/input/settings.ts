import { ComponentPropsSettings } from '@/components/b-components/types'
import { EventSetting } from '@/components/event-editor/types'
import { AssignValueFlow, AssignValueType } from '@/libs/consts'

export const settings: ComponentPropsSettings = {
  label: {
    label: '标签文本',
    componentName: 'AInput',
    value: '输入框',
  },
  name: {
    label: '数据字段名',
    componentName: 'AInput',
    value: 'input',
  },
  value: {
    label: '默认值',
    componentName: 'AInput',
    value: undefined,
  },
  extra: {
    label: '下方提示信息',
    componentName: 'AInput',
    value: '',
  },
  placeholder: {
    label: '提示信息',
    componentName: 'AInput',
    value: '请输入...',
  },
  allowClear: {
    label: '是否可清除',
    componentName: 'ACheckbox',
    valueName: 'checked',
    value: true,
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
    clear: {
      showName: '清空值',
      method: 'clear',
    },
  },
  trigger: {
    change: {
      showName: '值变化',
      event: 'change',
    },
  },
  assign: {
    value: {
      showName: '值',
      flow: AssignValueFlow.BOTH,
      type: AssignValueType.PROP,
    },
  },
}
