import { ComponentData } from '@/components/page-editor/types'

const mockComponentDataList: ComponentData[] = [
  {
    showName: '输入框',
    componentName: 'BInput',
    id: 'BInput-41m0pope',
    setting: {
      label: '输入框',
      name: 'input',
      extra: '',
      placeholder: '请输入...',
      allowClear: true,
      disabled: false,
    },
    width: 228,
    height: 92,
    left: 0,
    top: 0,
  },
  {
    showName: '按钮',
    componentName: 'BButton',
    id: 'BButton-wng3cnqk',
    setting: {
      text: '按钮',
      type: 'primary',
      danger: false,
      disabled: false,
    },
    width: 76,
    height: 46,
    left: 0,
    top: 92,
  },
  {
    showName: '赋值',
    componentName: 'BAssign',
    id: 'BAssign-e4n7hspg',
    setting: {
      out: {
        id: 'BContent-puzozl7y',
        content: 'inputValue',
      },
      in: {
        id: 'BInput-41m0pope',
        content: 'value',
      },
    },
    width: 0,
    height: 0,
    left: 0,
    top: 253,
  },
  {
    showName: '自定义内容',
    componentName: 'BContent',
    id: 'BContent-puzozl7y',
    setting: {
      value: 'test',
      isJson: false,
    },
    width: 0,
    height: 0,
    left: 76,
    top: 253,
  },
]

export default mockComponentDataList
