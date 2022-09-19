import { EventData } from '@/components/event-editor/types'

const mockEventList: EventData[] = [
  // 点击 按钮1 将 按钮2 设置为 禁用
  {
    trigger: {
      id: 'BButton-fv83mzvt',
      event: 'click',
    },
    action: {
      id: 'BButton-ieb6r3n2',
      action: 'changeDisabledToTrue',
    },
  },
  // 点击 按钮1 将 开始 timeout 倒计时
  {
    trigger: {
      id: 'BButton-fv83mzvt',
      event: 'click',
    },
    action: {
      id: 'BTimeout-p50w64tc',
      action: 'startTimeout',
    },
  },
  // timeout 倒计时结束，将 按钮2 设置为 可用
  {
    trigger: {
      id: 'BTimeout-p50w64tc',
      event: 'timeout',
    },
    action: {
      id: 'BButton-ieb6r3n2',
      action: 'changeDisabledToFalse',
    },
  },
]

export default mockEventList
