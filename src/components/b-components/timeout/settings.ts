import { ComponentPropsSettings } from '@/components/b-components/types'

const settings: ComponentPropsSettings = {
  time: {
    label: '延迟（毫秒）',
    componentName: 'AInputNumber',
    value: 1000,
    setting: {
      min: 0,
    },
  },
}

export default settings
