import { ComponentPropsSettings } from '@/components/b-components/types'
import { EventSetting } from '@/components/event-editor/types'
import { AssignValueFlow, AssignValueType } from '@/libs/consts'

export const settings: ComponentPropsSettings = {
  method: {
    label: '请求方法',
    componentName: 'ASelect',
    value: 'POST',
    setting: {
      options: [
        {
          value: 'POST',
          label: 'POST',
        },
        {
          value: 'GET',
          label: 'GET',
        },
        {
          value: 'DELETE',
          label: 'DELETE',
        },
        {
          value: 'PATCH',
          label: 'PATCH',
        },
        {
          value: 'PUT',
          label: 'PUT',
        },
      ],
    },
  },
  url: {
    label: '请求 URL',
    componentName: 'AInput',
    value: '',
  },
  messageKey: {
    label: '响应消息字段',
    componentName: 'AInput',
    value: 'message',
  },
  codeKey: {
    label: '响应码字段',
    componentName: 'AInput',
    value: 'code',
  },
  successCode: {
    label: '响应码成功值',
    componentName: 'AInput',
    value: 0,
  },
  confirm: {
    label: '请求前确认',
    componentName: 'ACheckbox',
    valueName: 'checked',
    value: false,
  },
  showMessage: {
    label: '自动显示消息',
    componentName: 'ACheckbox',
    valueName: 'checked',
    value: true,
  },
}

export const eventSetting: EventSetting = {
  action: {
    startRequest: {
      showName: '发起请求',
      method: 'startRequest',
    },
  },
  trigger: {
    start: {
      showName: '开始请求',
      event: 'start',
    },
    success: {
      showName: '请求成功',
      event: 'success',
    },
    fail: {
      showName: '请求失败',
      event: 'fail',
    },
    done: {
      showName: '请求完成',
      event: 'done',
    },
  },
  assign: {
    response: {
      showName: '响应数据',
      flow: AssignValueFlow.OUT,
      type: AssignValueType.DATA,
    },
  },
}
