import { ComponentPropsSetting } from '@/components/b-components/types'

const settings: ComponentPropsSetting[] = [
  {
    label: '标签文本',
    componentName: 'AInput',
    propsName: 'label',
    value: '输入框',
  },
  {
    label: '数据字段名',
    componentName: 'AInput',
    propsName: 'name',
    value: 'input',
  },
  {
    label: '默认值',
    componentName: 'AInput',
    propsName: 'value',
    value: null,
  },
  {
    label: '下方提示信息',
    componentName: 'AInput',
    propsName: 'extra',
    value: '',
  },
  {
    label: '提示信息',
    componentName: 'AInput',
    propsName: 'placeholder',
    value: '请输入...',
  },
  {
    label: '是否可清除',
    componentName: 'ACheckbox',
    propsName: 'allowClear',
    valueName: 'checked',
    value: true,
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
