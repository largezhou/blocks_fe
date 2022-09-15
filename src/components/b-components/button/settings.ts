import { ComponentSetting } from '@/types/common'

const settings: ComponentSetting[] = [
  {
    label: '文本',
    componentName: 'AInput',
    propsName: 'text',
    value: '按钮',
  },
  {
    label: '颜色',
    componentName: 'ASelect',
    propsName: 'type',
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
  {
    label: '设置为危险按钮',
    componentName: 'ACheckbox',
    propsName: 'danger',
    valueName: 'checked',
    value: false,
  },
  {
    label: '禁用',
    componentName: 'ACheckbox',
    propsName: 'disabled',
    valueName: 'checked',
    value: false,
  },
]

export default settings
