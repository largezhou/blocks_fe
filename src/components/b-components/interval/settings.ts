import { ComponentPropsSetting } from '@/components/b-components/types'

const settings: ComponentPropsSetting[] = [
  {
    label: '时间间隔（毫秒）',
    componentName: 'AInputNumber',
    propsName: 'time',
    value: 1000,
    setting: {
      min: 1,
    },
  },
]

export default settings
