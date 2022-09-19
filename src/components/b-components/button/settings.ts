import { ComponentPropsSettings } from '@/components/b-components/types'

const settings: ComponentPropsSettings = {
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

export default settings
