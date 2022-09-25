import { EventData } from '@/components/event-editor/types'

const mockEventList: EventData[] = [
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
  {
    trigger: {
      id: 'BButton-nz6dteey',
      event: 'click',
    },
    action: {
      id: 'BInput-4ilyo7eq',
      action: 'clear',
    },
  },
  {
    trigger: {
      id: 'BInput-4ilyo7eq',
      event: 'change',
    },
    action: {
      id: 'BButton-9yjy7o5m',
      action: 'changeHiddenToTrue',
    },
  },
  {
    trigger: {
      id: 'BInterval-knaw34ub',
      event: 'interval',
    },
    action: {
      id: 'BButton-9yjy7o5m',
      action: 'changeHiddenToFalse',
    },
  },
  {
    trigger: {
      id: "BButton-ieb6r3n2",
      event: "click",
    },
    action: {
      id: "BAssign-aeaiyozp",
      action: "assign",
    },
  },
]

export default mockEventList
