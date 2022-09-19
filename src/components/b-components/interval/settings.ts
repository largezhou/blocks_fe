import { ComponentPropsSettings } from '@/components/b-components/types'

const settings: ComponentPropsSettings = {
  time: {
    label: '时间间隔（毫秒）',
    componentName: 'AInputNumber',
    value: 1000,
    setting: {
      min: 1,
    },
  },
}

export default settings
