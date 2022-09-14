import { ComponentSetting } from '@/types/common'

export default <ComponentSetting[]>[
  {
    label: '文本',
    componentName: 'BInput',
    propsName: 'text',
    value: '按钮',
  },
  {
    label: '颜色',
    componentName: 'BSelect',
    propsName: 'type',
    value: 'primary',
    setting: {
      options: [
        {
          value: 'default',
          text: '默认',
        },
        {
          value: 'primary',
          text: '主要',
        },
        {
          value: 'text',
          text: '文本',
        },
      ],
    },
  },
  {
    label: '设置为危险按钮',
    componentName: 'BCheckbox',
    propsName: 'danger',
    value: false,
  },
  {
    label: '禁用',
    componentName: 'BCheckbox',
    propsName: 'disabled',
    value: false,
  },
]
